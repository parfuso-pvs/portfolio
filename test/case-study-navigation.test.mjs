import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const componentPath = "src/components/case-study/case-study-navigation.tsx";
const memxRoutePath = "src/app/work/memx/page.tsx";
const domaniRoutePath = "src/app/work/domani/page.tsx";
const iffersRoutePath = "src/app/work/iffers-pictures/page.tsx";

test("the completed MEMX story closes with shared case-study navigation", async () => {
  const [component, route] = await Promise.all([
    readFile(componentPath, "utf8"),
    readFile(memxRoutePath, "utf8"),
  ]);

  assert.match(route, /const nextProject = getProject\("domani"\)/);
  assert.match(
    route,
    /<CaseStudyNavigation currentProject=\{project\} nextProject=\{nextProject\} \/>/,
  );
  assert.doesNotMatch(component, /"use client"/);
});

test("the completed Domani story continues to Iffer's Pictures", async () => {
  const route = await readFile(domaniRoutePath, "utf8");

  assert.match(route, /const nextProject = getProject\("iffers-pictures"\)/);
  assert.match(
    route,
    /<CaseStudyNavigation currentProject=\{project\} nextProject=\{nextProject\} \/>/,
  );
});

test("the completed Iffer's Pictures story cycles to flagship Case 01", async () => {
  const route = await readFile(iffersRoutePath, "utf8");

  assert.match(route, /const nextProject = getProject\("memx"\)/);
  assert.match(
    route,
    /<CaseStudyNavigation currentProject=\{project\} nextProject=\{nextProject\} \/>/,
  );
});

test("the closing navigation uses centralized project paths and semantic labels", async () => {
  const component = await readFile(componentPath, "utf8");

  assert.match(component, /href=\{nextProject\.href\}/);
  assert.match(component, /nextProject\.name/);
  assert.match(component, /nextProject\.summary/);
  assert.match(component, /currentProject\.indexLabel/);
  assert.match(component, /href="\/#experience"/);
  assert.match(component, /aria-labelledby=\{headingId\}/);
  assert.match(component, /<h2/);
  assert.match(component, /One case complete\. Another story ahead\./);
  assert.match(component, /Return to the journey/);
});

test("the closing navigation supports responsive and keyboard interaction states", async () => {
  const component = await readFile(componentPath, "utf8");

  assert.match(component, /lg:grid-cols-12/);
  assert.match(component, /sm:grid-cols-/);
  assert.equal((component.match(/min-h-11/g) ?? []).length, 2);
  assert.match(component, /hover:border-accent-on-dark/);
  assert.match(component, /focus-visible:border-accent-on-dark/);
  assert.match(component, /active:border-accent-on-dark/);
  assert.match(component, /group-active:text-accent-on-dark/);
  assert.match(component, /group-active:translate-x-1/);
  assert.match(component, /active:text-media-foreground\/70/);
});
