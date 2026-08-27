import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("the root layout provides a skip link to the main landmark", async () => {
  const [layout, page] = await Promise.all([
    readFile("src/app/layout.tsx", "utf8"),
    readFile("src/app/page.tsx", "utf8"),
  ]);

  assert.match(layout, /href="#main-content"/);
  assert.match(page, /id="main-content"/);
  assert.match(page, /tabIndex=\{-1\}/);
});

test("the global stylesheet includes focus and reduced-motion baselines", async () => {
  const globalCss = await readFile("src/app/globals.css", "utf8");

  assert.match(globalCss, /@theme inline/);
  assert.match(globalCss, /:focus-visible/);
  assert.match(globalCss, /@media \(prefers-reduced-motion: reduce\)/);
});
