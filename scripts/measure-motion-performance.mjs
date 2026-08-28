import { spawn } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const targetUrl = process.env.MOTION_TEST_URL ?? "http://localhost:3000/";
const chromePath =
  process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const profileDirectory = await mkdtemp(join(tmpdir(), "portfolio-motion-probe-"));
const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

let chrome;
let socket;

async function waitForDebuggerPort() {
  const portFile = join(profileDirectory, "DevToolsActivePort");

  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      const [port] = (await readFile(portFile, "utf8")).split("\n");
      return Number(port);
    } catch {
      await delay(50);
    }
  }

  throw new Error("Chrome did not expose a DevTools port.");
}

async function waitForPageTarget(port) {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    const response = await fetch(`http://127.0.0.1:${port}/json/list`);
    const targets = await response.json();
    const page = targets.find((target) => target.type === "page");
    if (page) return page.webSocketDebuggerUrl;
    await delay(50);
  }

  throw new Error("Chrome did not expose a page target.");
}

function createCdpClient(webSocketUrl) {
  const cdpSocket = new WebSocket(webSocketUrl);
  const pending = new Map();
  let requestId = 0;

  cdpSocket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (!message.id) return;

    const request = pending.get(message.id);
    if (!request) return;
    pending.delete(message.id);

    if (message.error) request.reject(new Error(message.error.message));
    else request.resolve(message.result);
  });

  const opened = new Promise((resolve, reject) => {
    cdpSocket.addEventListener("open", resolve, { once: true });
    cdpSocket.addEventListener("error", reject, { once: true });
  });

  return {
    opened,
    socket: cdpSocket,
    send(method, params = {}) {
      requestId += 1;
      return new Promise((resolve, reject) => {
        pending.set(requestId, { reject, resolve });
        cdpSocket.send(JSON.stringify({ id: requestId, method, params }));
      });
    },
  };
}

async function evaluate(client, expression) {
  const result = await client.send("Runtime.evaluate", {
    awaitPromise: true,
    expression,
    returnByValue: true,
  });

  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}

async function measurePointer(client) {
  const bounds = await evaluate(
    client,
    `(() => {
      const rect = document.querySelector('[data-motion-probe="home-assembly"]').getBoundingClientRect();
      return { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
    })()`,
  );

  await client.send("Input.dispatchMouseEvent", {
    type: "mouseMoved",
    x: bounds.left + bounds.width * 0.1,
    y: bounds.top + bounds.height * 0.5,
  });

  return runFrameSample(
    client,
    `const stage = document.querySelector('[data-motion-probe="home-assembly"]');
     const progress = frame / (frameCount - 1);
     stage.dispatchEvent(new PointerEvent("pointermove", {
       bubbles: true,
       clientX: ${bounds.left} + ${bounds.width} * (0.1 + progress * 0.8),
       clientY: ${bounds.top} + ${bounds.height} * (0.5 + Math.sin(progress * Math.PI * 4) * 0.3),
       pointerType: "mouse",
     }));`,
  );
}

async function measureScroll(client) {
  await evaluate(client, "window.scrollTo(0, 0)");
  const maximumScroll = await evaluate(
    client,
    "Math.max(0, document.documentElement.scrollHeight - window.innerHeight)",
  );

  return runFrameSample(
    client,
    `const progress = frame / (frameCount - 1);
     window.scrollTo(0, ${maximumScroll} * progress);`,
  );
}

async function runFrameSample(client, interaction) {
  return evaluate(
    client,
    `(async () => {
      const frameCount = 120;
      const frames = [];
      const longTasks = [];
      let previous = null;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) longTasks.push(entry.duration);
      });
      observer.observe({ entryTypes: ["longtask"] });

      await new Promise((resolve) => {
        let frame = 0;
        const sample = (time) => {
          if (previous !== null) frames.push(time - previous);
          previous = time;
          ${interaction}
          frame += 1;
          if (frame < frameCount) requestAnimationFrame(sample);
          else resolve();
        };
        requestAnimationFrame(sample);
      });
      await new Promise((resolve) => setTimeout(resolve, 100));
      observer.disconnect();

      const sorted = frames.filter((duration) => duration > 1).sort((a, b) => a - b);
      const percentile = (value) => sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * value))] ?? 0;
      return {
        frames: sorted.length,
        p50FrameMs: Number(percentile(0.5).toFixed(2)),
        p95FrameMs: Number(percentile(0.95).toFixed(2)),
        worstFrameMs: Number((sorted.at(-1) ?? 0).toFixed(2)),
        framesOver20Ms: sorted.filter((duration) => duration > 20).length,
        framesOver32Ms: sorted.filter((duration) => duration > 32).length,
        longTasks: longTasks.length,
        worstLongTaskMs: Number(Math.max(0, ...longTasks).toFixed(2)),
      };
    })()`,
  );
}

try {
  chrome = spawn(
    chromePath,
    [
      "--headless=new",
      "--disable-background-networking",
      "--disable-default-apps",
      "--disable-extensions",
      "--disable-sync",
      "--hide-scrollbars",
      "--no-first-run",
      "--remote-debugging-port=0",
      `--user-data-dir=${profileDirectory}`,
      "--window-size=1280,720",
      "about:blank",
    ],
    { stdio: "ignore" },
  );

  const port = await waitForDebuggerPort();
  const client = createCdpClient(await waitForPageTarget(port));
  socket = client.socket;
  await client.opened;
  await client.send("Page.enable");
  await client.send("Runtime.enable");
  await client.send("Page.navigate", { url: targetUrl });

  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (await evaluate(client, "document.readyState === 'complete'")) break;
    await delay(50);
  }
  await delay(1_000);

  const result = {
    chrome: await evaluate(client, "navigator.userAgent"),
    pointer: await measurePointer(client),
    scroll: await measureScroll(client),
    url: targetUrl,
    viewport: "1280x720",
  };

  console.log(JSON.stringify(result, null, 2));
} finally {
  socket?.close();
  chrome?.kill("SIGTERM");
  await rm(profileDirectory, { force: true, recursive: true });
}
