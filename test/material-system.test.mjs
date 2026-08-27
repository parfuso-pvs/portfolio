import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const globalCssPath = "src/app/globals.css";
const componentPath = "src/components/ui/material-surface.tsx";
const homePath = "src/app/page.tsx";
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

test("the homepage demonstrates the system without exposing decorative artifacts", async () => {
  const home = await readFile(homePath, "utf8");

  assert.match(home, /<MaterialSurface/);
  assert.match(home, /<RegistrationMark/);
  assert.match(home, /material-blueprint/);
  assert.match(home, /material-vellum/);
  assert.match(home, /className="material-blueprint[^"]*"\s+aria-hidden="true"/);
  assert.match(home, /className="material-sheet material-sheet-raised[^"]*"\s+aria-hidden="true"/);
  assert.match(home, /className="material-tab[\s\S]*?aria-hidden="true"/);
});

test("material performance and responsive constraints are documented", async () => {
  const documentation = await readFile(documentationPath, "utf8");

  ["Server Component", "pointer-events-none", "320px", "no raster request"].forEach((term) =>
    assert.match(documentation, new RegExp(term)),
  );
});
