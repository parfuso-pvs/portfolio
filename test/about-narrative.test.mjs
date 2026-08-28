import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pagePath = "src/app/about/page.tsx";
const componentPath = "src/components/about/about-narrative.tsx";
const contentPath = "src/content/about.ts";

test("the About route composes grounded content and project records", async () => {
  const [page, component] = await Promise.all([
    readFile(pagePath, "utf8"),
    readFile(componentPath, "utf8"),
  ]);

  assert.match(page, /<AboutNarrative projects=\{workingContexts\} \/>/);
  ["memx", "domani", "pixelverse-studios", "earthcam"].forEach((projectId) =>
    assert.match(page, new RegExp(`getProject\\("${projectId}"\\)`)),
  );
  assert.match(component, /projects\.map/);
  assert.match(component, /project\.name/);
  assert.match(component, /project\.role/);
  assert.match(component, /project\.summary/);
});

test("the profile narrative reflects the approved working philosophy", async () => {
  const content = await readFile(contentPath, "utf8");

  assert.match(content, /8\+ years/);
  assert.match(content, /complicated systems/);
  assert.match(content, /Systems thinker/);
  assert.match(content, /Full-stack builder/);
  assert.match(content, /Product partner/);
  assert.match(content, /Continuous learner/);
  assert.match(content, /after-hours client work/);
});

test("the About page protects personal and unsupported resume details", async () => {
  const sources = await Promise.all(
    [pagePath, componentPath, contentPath].map((filePath) => readFile(filePath, "utf8")),
  );
  const source = sources.join("\n");

  assert.doesNotMatch(source, /201[ -]?638|Cliffside Park|07010/);
  assert.doesNotMatch(source, /35%|40%|50%|50\+/);
  assert.doesNotMatch(source, /phone|street address/i);
});

test("the About narrative is semantic, responsive, and server rendered", async () => {
  const component = await readFile(componentPath, "utf8");

  assert.doesNotMatch(component, /"use client"/);
  assert.match(component, /<main id="main-content"/);
  assert.equal((component.match(/<section/g) ?? []).length, 4);
  assert.match(component, /<h1/);
  assert.match(component, /<ol/);
  assert.match(component, /lg:grid-cols-12/);
  assert.match(component, /max-w-\[90rem\]/);
});
