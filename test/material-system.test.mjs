import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const globalCssPath = "src/app/globals.css";
const componentPath = "src/components/ui/material-surface.tsx";
const homePath = "src/app/page.tsx";
const documentationPath = "docs/design/material-system.md";

test("material primitives reuse the established semantic token system", async () => {
  const globalCss = await readFile(globalCssPath, "utf8");

  [
    "material-sheet",
    "material-sheet-raised",
    "material-sheet-pinned",
    "material-vellum",
    "material-blueprint",
    "material-tab",
    "registration-mark",
  ].forEach((primitive) => assert.match(globalCss, new RegExp(`\\.${primitive}\\b`)));

  assert.match(globalCss, /var\(--elevation-sheet\)/);
  assert.match(globalCss, /var\(--elevation-pinned\)/);
  assert.match(globalCss, /var\(--material-grid-minor\)/);
  assert.match(globalCss, /pointer-events: none/);
  assert.doesNotMatch(globalCss, /@keyframes/);
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
  assert.equal((home.match(/aria-hidden="true"/g) ?? []).length, 3);
});

test("material performance and responsive constraints are documented", async () => {
  const documentation = await readFile(documentationPath, "utf8");

  ["Server Component", "pointer-events-none", "320px", "no raster request"].forEach((term) =>
    assert.match(documentation, new RegExp(term)),
  );
});
