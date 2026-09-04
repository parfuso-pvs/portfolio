import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const workPage = await readFile(
  new URL("../src/app/work/page.tsx", import.meta.url),
  "utf8",
);
const projects = await readFile(
  new URL("../src/content/projects.ts", import.meta.url),
  "utf8",
);

test("work page reuses the homepage project layout with an expandable registry", () => {
  assert.match(workPage, /<SelectedWork/);
  assert.match(workPage, /projects=\{portfolioProjects\}/);
  assert.match(workPage, /showHeading=\{false\}/);
  assert.doesNotMatch(workPage, /Explore the work/);
  assert.match(projects, /export const portfolioProjects/);
  assert.match(projects, /portfolioProjects\.filter/);
  assert.match(projects, /featured: false/);
});
