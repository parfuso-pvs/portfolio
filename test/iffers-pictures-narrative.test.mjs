import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const contentPath = "src/content/case-studies/iffers-pictures.ts";
const componentPath = "src/components/case-study/iffers-pictures-narrative.tsx";
const pagePath = "src/app/work/iffers-pictures/page.tsx";
const projectsPath = "src/content/projects.ts";

test("the Iffer's Pictures route composes a dedicated registry-backed narrative", async () => {
  const [page, component] = await Promise.all([
    readFile(pagePath, "utf8"),
    readFile(componentPath, "utf8"),
  ]);

  assert.match(page, /<IffersPicturesNarrative project=\{project\} \/>/);
  assert.match(component, /project\.approvedFeatures\.map/);
  assert.match(component, /project\.proofPoints\[0\]/);
  assert.match(component, /project\.attribution/);
  assert.doesNotMatch(component, /"use client"/);
});

test("the narrative preserves complete ownership and personal-project attribution", async () => {
  const [content, component, projects] = await Promise.all([
    readFile(contentPath, "utf8"),
    readFile(componentPath, "utf8"),
    readFile(projectsPath, "utf8"),
  ]);
  const source = `${content}\n${component}\n${projects}`;

  assert.match(content, /Christmas gift/);
  assert.match(content, /sister-in-law/);
  assert.match(content, /design as well as the code, copy, and client collaboration/);
  assert.match(projects, /Phil independently owned discovery, copy, visual design, implementation/);
  assert.match(source, /Phil, not Sami, owned its design/);
});

test("the narrative does not introduce unapproved photography or performance claims", async () => {
  const [content, component] = await Promise.all([
    readFile(contentPath, "utf8"),
    readFile(componentPath, "utf8"),
  ]);
  const source = `${content}\n${component}`;

  assert.doesNotMatch(component, /next\/image|<img|backgroundImage/);
  assert.doesNotMatch(source, /conversion|traffic|revenue|increase|improvement|percent/i);
});

test("the narrative is semantic and recomposes its asymmetric layouts", async () => {
  const component = await readFile(componentPath, "utf8");

  assert.match(component, /aria-label="Iffer's Pictures case-study chapters"/);
  assert.equal((component.match(/<section/g) ?? []).length >= 4, true);
  assert.match(component, /<ol/);
  assert.match(component, /<aside/);
  assert.match(component, /lg:grid-cols-12/);
  assert.match(component, /sm:grid-cols-\[5rem_minmax\(0,1fr\)\]/);
  assert.match(component, /max-w-\[90rem\]/);
});
