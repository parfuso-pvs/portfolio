import { spawn } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const targetUrl = process.env.MOTION_TEST_URL ?? "http://localhost:3000/";
const motionScenario = process.env.MOTION_SCENARIO ?? "home";
const forceReducedMotion = process.env.MOTION_REDUCED === "1";
const chromePath =
  process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

if (!new Set(["home", "memx-diagrams", "about-career", "career-navigation"]).has(motionScenario)) {
  throw new Error(`Unknown motion scenario: ${motionScenario}`);
}

const profileDirectory = await mkdtemp(join(tmpdir(), "portfolio-motion-probe-"));

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

async function measureHomeCareer(client) {
  const range = await evaluate(
    client,
    `(() => {
      const thread = document.querySelector('[data-career-thread]');
      if (!thread) throw new Error('Expected the homepage career thread.');
      const top = thread.getBoundingClientRect().top + window.scrollY;
      const bottom = thread.getBoundingClientRect().bottom + window.scrollY;
      const maximumScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      return {
        start: Math.max(0, top - window.innerHeight * 0.72),
        end: Math.min(maximumScroll, bottom - window.innerHeight * 0.62),
      };
    })()`,
  );

  await evaluate(client, `window.scrollTo(0, ${range.start})`);
  const frames = await runFrameSample(
    client,
    `const progress = frame / (frameCount - 1);
     window.scrollTo(0, ${range.start} + (${range.end} - ${range.start}) * progress);`,
  );

  const threadState = await evaluate(
    client,
    `(() => {
      const thread = document.querySelector('[data-career-thread]');
      const paths = thread ? [...thread.querySelectorAll('svg path')] : [];
      return {
        careerThreadPresent: Boolean(thread),
        pathCount: paths.length,
      };
    })()`,
  );

  if (!threadState.careerThreadPresent || threadState.pathCount !== 2) {
    throw new Error(`Homepage career thread did not render: ${JSON.stringify(threadState)}`);
  }

  return { ...frames, ...threadState };
}

async function measureMemxDiagrams(client) {
  const range = await evaluate(
    client,
    `(() => {
      const traces = [...document.querySelectorAll('[data-diagram-trace]')];
      if (traces.length !== 2) throw new Error('Expected two MEMX diagram traces.');

      const firstTop = traces[0].getBoundingClientRect().top + window.scrollY;
      const lastBottom = traces.at(-1).getBoundingClientRect().bottom + window.scrollY;
      const maximumScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      return {
        start: Math.max(0, firstTop - window.innerHeight * 0.9),
        end: Math.min(maximumScroll, lastBottom - window.innerHeight * 0.2),
      };
    })()`,
  );

  await evaluate(client, `window.scrollTo(0, ${range.start})`);
  const frames = await runFrameSample(
    client,
    `const progress = frame / (frameCount - 1);
     window.scrollTo(0, ${range.start} + (${range.end} - ${range.start}) * progress);`,
  );

  await delay(1_500);
  const traceState = await evaluate(
    client,
    `(() => {
      const paths = [...document.querySelectorAll('[data-diagram-trace] svg')]
        .filter((svg) => getComputedStyle(svg).display !== 'none')
        .flatMap((svg) => [...svg.querySelectorAll('path')]);
      const settledPaths = paths.filter((path) => {
        const offset = Number.parseFloat(getComputedStyle(path).strokeDashoffset);
        return Number.isFinite(offset) && Math.abs(offset) < 0.01;
      }).length;
      return { settledPaths, visiblePaths: paths.length };
    })()`,
  );

  if (traceState.visiblePaths === 0 || traceState.settledPaths !== traceState.visiblePaths) {
    throw new Error(
      `MEMX traces did not settle: ${traceState.settledPaths}/${traceState.visiblePaths} paths.`,
    );
  }

  return { ...frames, ...traceState };
}

async function measureAboutCareer(client) {
  const range = await evaluate(
    client,
    `(() => {
      const journey = document.querySelector('[data-career-journey]');
      if (!journey) throw new Error('Expected the About career journey.');

      const top = journey.getBoundingClientRect().top + window.scrollY;
      return {
        start: Math.max(0, top - window.innerHeight * 0.9),
        end: Math.max(0, document.documentElement.scrollHeight - window.innerHeight),
      };
    })()`,
  );

  await evaluate(client, `window.scrollTo(0, ${range.start})`);
  const frames = await runFrameSample(
    client,
    `const progress = frame / (frameCount - 1);
     window.scrollTo(0, ${range.start} + (${range.end} - ${range.start}) * progress);`,
  );

  await delay(600);
  const journeyState = await evaluate(
    client,
    `(() => {
      const journey = document.querySelector('[data-career-journey]');
      const list = journey?.querySelector('ol');
      const items = list ? [...list.children] : [];
      const activeItem = items.find((item) => item.getAttribute('aria-current') === 'step');
      const progressHead = journey?.querySelector('[data-career-progress-head]');
      return {
        activeStep: activeItem?.querySelector('[data-career-index]')?.textContent?.trim() ?? null,
        directListChildrenValid: items.length > 0 && items.every((item) => item.tagName === 'LI'),
        finalStepActive: activeItem === items.at(-1),
        listItems: items.length,
        progressHeadHidden: progressHead ? getComputedStyle(progressHead).display === 'none' : false,
      };
    })()`,
  );

  if (
    journeyState.listItems !== 5 ||
    !journeyState.directListChildrenValid ||
    !journeyState.finalStepActive ||
    (forceReducedMotion && !journeyState.progressHeadHidden)
  ) {
    throw new Error(`About career journey did not settle: ${JSON.stringify(journeyState)}`);
  }

  return { ...frames, ...journeyState };
}

async function measureCareerNavigation(client) {
  await evaluate(
    client,
    `document.querySelector('#experience-earthcam')?.scrollIntoView({ block: 'center' })`,
  );
  await delay(1_000);

  const support = await evaluate(
    client,
    `({
      viewTransitionApi: typeof document.startViewTransition === 'function',
      transitionClass: CSS.supports('view-transition-class: career-chapter'),
    })`,
  );
  const frames = await runFrameSample(
    client,
    `if (frame === 0) {
       const link = document.querySelector('a[href="/work/earthcam"]');
       if (!link) throw new Error('Expected the EarthCam career chapter link.');
       link.click();
     }`,
  );

  await delay(350);
  const routeState = await evaluate(
    client,
    `(() => ({
      heading: document.querySelector('h1')?.textContent?.trim() ?? null,
      mainLandmarks: document.querySelectorAll('main#main-content').length,
      pathname: window.location.pathname,
      returnHref: document.querySelector('a[href="/#experience-earthcam"]')?.getAttribute('href') ?? null,
    }))()`,
  );

  if (
    routeState.pathname !== "/work/earthcam" ||
    routeState.heading !== "EarthCam" ||
    routeState.mainLandmarks !== 1 ||
    routeState.returnHref !== "/#experience-earthcam"
  ) {
    throw new Error(`Career chapter transition did not settle: ${JSON.stringify(routeState)}`);
  }

  return { ...frames, ...routeState, ...support };
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
      ...(forceReducedMotion ? ["--force-prefers-reduced-motion=reduce"] : []),
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

  const measurements =
    motionScenario === "memx-diagrams"
      ? { diagramScroll: await measureMemxDiagrams(client) }
      : motionScenario === "about-career"
        ? { careerScroll: await measureAboutCareer(client) }
        : motionScenario === "career-navigation"
          ? { careerNavigation: await measureCareerNavigation(client) }
          : { careerThread: await measureHomeCareer(client) };
  const result = {
    chrome: await evaluate(client, "navigator.userAgent"),
    reducedMotion: await evaluate(
      client,
      "window.matchMedia('(prefers-reduced-motion: reduce)').matches",
    ),
    scenario: motionScenario,
    ...measurements,
    url: targetUrl,
    viewport: "1280x720",
  };

  console.log(JSON.stringify(result, null, 2));
} finally {
  socket?.close();
  chrome?.kill("SIGTERM");
  await rm(profileDirectory, { force: true, recursive: true });
}
