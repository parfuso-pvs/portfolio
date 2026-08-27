import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const layoutPath = "src/app/layout.tsx";
const globalCssPath = "src/app/globals.css";
const homePath = "src/app/page.tsx";
const documentationPath = "docs/design/typography.md";

const fontFamilies = ["Instrument_Sans", "Newsreader", "IBM_Plex_Mono"];
const fontVariables = [
  "--font-instrument-sans",
  "--font-newsreader",
  "--font-newsreader-italic",
  "--font-ibm-plex-mono",
];
const typeRoles = [
  "type-display",
  "type-heading",
  "type-body",
  "type-body-small",
  "type-label",
  "type-mono",
  "type-quote",
  "type-numeric",
];

test("licensed font families are configured through next/font", async () => {
  const layout = await readFile(layoutPath, "utf8");

  assert.match(layout, /from "next\/font\/google"/);
  fontFamilies.forEach((family) => assert.match(layout, new RegExp(`\\b${family}\\b`)));
  fontVariables.forEach((variable) => assert.match(layout, new RegExp(variable)));
  assert.equal((layout.match(/preload: true/g) ?? []).length, 2);
  assert.equal((layout.match(/preload: false/g) ?? []).length, 2);
  assert.equal((layout.match(/subsets: \["latin"\]/g) ?? []).length, 4);
});

test("the stylesheet exposes the complete semantic type-role contract", async () => {
  const globalCss = await readFile(globalCssPath, "utf8");

  fontVariables.forEach((variable) => assert.match(globalCss, new RegExp(variable)));
  typeRoles.forEach((role) => assert.match(globalCss, new RegExp(`@utility ${role}\\s*\\{`)));
  assert.match(globalCss, /font-variant-numeric: tabular-nums slashed-zero/);
});

test("the homepage proves the primary display, heading, label, and mono roles", async () => {
  const home = await readFile(homePath, "utf8");

  ["type-display", "type-heading", "type-label", "type-mono"].forEach((role) =>
    assert.match(home, new RegExp(`className="[^"]*${role}`)),
  );
  assert.doesNotMatch(home, /font-family\s*:/);
});

test("font licensing and responsive typography decisions are documented", async () => {
  const documentation = await readFile(documentationPath, "utf8");

  ["Instrument Sans", "Newsreader", "IBM Plex Mono", "SIL Open Font License 1.1"].forEach((term) =>
    assert.match(documentation, new RegExp(term)),
  );
  assert.match(documentation, /320px/);
  assert.match(documentation, /not preloaded/);
});
