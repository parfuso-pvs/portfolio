import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const globalCssPath = "src/app/globals.css";
const componentPath = "src/components/ui/material-surface.tsx";
const homePath = "src/components/home/career-thread.tsx";
const homeStylesPath = "src/components/home/career-thread.module.css";
const documentationPath = "docs/design/material-system.md";
const materialPrimitives = [
  "material-sheet",
  "material-sheet-raised",
  "material-sheet-pinned",
  "material-vellum",
  "material-blueprint",
  "material-tab",
  "registration-mark",
];

test("material primitives reuse the established semantic token system", async () => {
  const globalCss = await readFile(globalCssPath, "utf8");

  materialPrimitives.forEach((primitive) =>
    assert.match(globalCss, new RegExp(`\\.${primitive}\\b`)),
  );

  assert.match(globalCss, /var\(--elevation-sheet\)/);
  assert.match(globalCss, /var\(--elevation-pinned\)/);
  assert.match(globalCss, /var\(--material-grid-minor\)/);
  assert.match(globalCss, /pointer-events: none/);

  ["body::before", ...materialPrimitives.map((primitive) => `.${primitive}`)].forEach(
    (selector) => {
      const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const rule = globalCss.match(new RegExp(`${escapedSelector}\\s*\\{[^}]*\\}`, "s"));

      assert.ok(rule, `${selector} must have a CSS rule`);
      assert.doesNotMatch(rule[0], /animation(?:-name)?\s*:/, `${selector} must remain static`);
    },
  );
});

test("MaterialSurface provides semantic elements and bounded elevation variants", async () => {
  const component = await readFile(componentPath, "utf8");

  assert.match(component, /"article" \| "div" \| "section"/);
  assert.match(component, /"flat" \| "pinned" \| "raised"/);
  assert.match(component, /aria-hidden="true"/);
  assert.doesNotMatch(component, /"use client"/);
});

test("the homepage narrows materiality to quiet paper roles", async () => {
  const [home, styles] = await Promise.all([
    readFile(homePath, "utf8"),
    readFile(homeStylesPath, "utf8"),
  ]);

  assert.match(home, /styles\.role/);
  assert.match(styles, /var\(--paper-raised\)/);
  assert.match(styles, /var\(--blueprint\)/);
  assert.doesNotMatch(home, /material-blueprint|registration-mark|material-tab/);
});

test("material performance and responsive constraints are documented", async () => {
  const documentation = await readFile(documentationPath, "utf8");

  ["Server Component", "pointer-events-none", "320px", "no raster request"].forEach((term) =>
    assert.match(documentation, new RegExp(term)),
  );
});
