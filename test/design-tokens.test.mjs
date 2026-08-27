import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const globalCssPath = "src/app/globals.css";
const requiredTokens = [
  "--paper-canvas",
  "--paper-base",
  "--paper-raised",
  "--paper-deep",
  "--graphite",
  "--ink-muted",
  "--blueprint",
  "--blueprint-on-dark",
  "--rule",
  "--focus-ring",
  "--media-backdrop",
  "--layout-gutter",
  "--layout-section",
  "--display-size",
  "--corner-paper",
  "--elevation-sheet",
  "--elevation-pinned",
];

const colorPairs = [
  ["graphite", "paper-canvas"],
  ["graphite", "paper-base"],
  ["ink-muted", "paper-canvas"],
  ["ink-muted", "paper-base"],
  ["blueprint", "paper-canvas"],
  ["blueprint", "paper-base"],
  ["blueprint-on-dark", "media-backdrop"],
  ["media-foreground", "media-backdrop"],
];

function luminance(hex) {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)
    .map((channel) => Number.parseInt(channel, 16) / 255)
    .map((channel) => (channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4));

  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function contrastRatio(foreground, background) {
  const lighter = Math.max(luminance(foreground), luminance(background));
  const darker = Math.min(luminance(foreground), luminance(background));

  return (lighter + 0.05) / (darker + 0.05);
}

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(directory, entry.name);
      return entry.isDirectory() ? sourceFiles(entryPath) : entryPath;
    }),
  );

  return files.flat();
}

test("the Human Assembly token contract is present", async () => {
  const globalCss = await readFile(globalCssPath, "utf8");

  requiredTokens.forEach((token) => assert.match(globalCss, new RegExp(`${token}:`)));
  assert.match(globalCss, /--spacing-page-gutter: var\(--layout-gutter\)/);
  assert.match(globalCss, /--text-display: var\(--display-size\)/);
  assert.match(globalCss, /--shadow-pinned: var\(--elevation-pinned\)/);
});

test("text, accent, and media tokens meet normal-text contrast", async () => {
  const globalCss = await readFile(globalCssPath, "utf8");
  const colors = Object.fromEntries(
    [...globalCss.matchAll(/--([\w-]+):\s*(#[\da-f]{6});/gi)].map((match) => [match[1], match[2]]),
  );

  colorPairs.forEach(([foreground, background]) => {
    assert.ok(
      contrastRatio(colors[foreground], colors[background]) >= 4.5,
      `${foreground} must maintain 4.5:1 contrast on ${background}`,
    );
  });
});

test("component source files do not contain arbitrary color literals", async () => {
  const files = (await sourceFiles("src")).filter(
    (file) => file !== globalCssPath && /\.(?:css|ts|tsx)$/.test(file),
  );
  const colorLiteral = /#[\da-f]{3,8}\b|(?:rgb|hsl)a?\(/i;

  await Promise.all(
    files.map(async (file) => {
      const source = await readFile(file, "utf8");
      assert.doesNotMatch(source, colorLiteral, `${file} must use semantic color tokens`);
    }),
  );
});
