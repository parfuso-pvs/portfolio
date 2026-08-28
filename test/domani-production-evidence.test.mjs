import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const contentPath = "src/content/case-studies/domani-evidence.ts";
const componentPath = "src/components/case-study/domani-production-evidence.tsx";
const pagePath = "src/app/work/domani/page.tsx";
const projectsPath = "src/content/projects.ts";

test("the Domani route composes production evidence from the project registry", async () => {
  const [page, component] = await Promise.all([
    readFile(pagePath, "utf8"),
    readFile(componentPath, "utf8"),
  ]);

  assert.match(page, /<DomaniProductionEvidence project=\{project\} \/>/);
  assert.match(component, /project\.metrics\.map/);
  assert.match(component, /project\.proofPoints\.map/);
  assert.doesNotMatch(component, /"use client"/);
});

test("the evidence ledger exposes value, label, detail, source, and snapshot date", async () => {
  const component = await readFile(componentPath, "utf8");

  assert.match(component, /metric\.value/);
  assert.match(component, /metric\.label/);
  assert.match(component, /metric\.detail/);
  assert.match(component, /metric\.source/);
  assert.match(component, /project\.snapshotDate/);
  assert.match(component, /<dl/);
  assert.match(component, /<dt/);
  assert.match(component, /<dd/);
});

test("the evidence copy preserves analytics and commercial boundaries", async () => {
  const [content, component, projects] = await Promise.all([
    readFile(contentPath, "utf8"),
    readFile(componentPath, "utf8"),
    readFile(projectsPath, "utf8"),
  ]);
  const source = `${content}\n${component}\n${projects}`;

  assert.doesNotMatch(source, /August 26, 2026|2026\.08\.26/);
  assert.match(content, /identified production users rather than shared anonymous identifiers/);
  assert.match(content, /revenue was not retrieved/);
  assert.match(content, /No conversion rate is shown/);
  assert.doesNotMatch(source, /308|157|37% using|63% using/i);
});

test("the visible snapshot labels derive from the canonical project date", async () => {
  const [content, component] = await Promise.all([
    readFile(contentPath, "utf8"),
    readFile(componentPath, "utf8"),
  ]);

  assert.doesNotMatch(content, /snapshotLabel|index: "Snapshot/);
  assert.match(component, /project\.snapshotDate\.replaceAll\("-", "\."\)/);
  assert.match(component, /new Intl\.DateTimeFormat/);
  assert.match(component, /timeZone: "UTC"/);
  assert.match(component, /\{project\.snapshotDate\}/);
});

test("all approved source types receive visible labels", async () => {
  const content = await readFile(contentPath, "utf8");

  assert.match(content, /"production-database": "Production database"/);
  assert.match(content, /"product-analytics": "Product analytics"/);
  assert.match(content, /"store-verification": "Store verification"/);
  assert.match(content, /satisfies Record<MetricSource, string>/);
});

test("the production evidence recomposes its ledger for small screens", async () => {
  const component = await readFile(componentPath, "utf8");

  assert.match(component, /lg:grid-cols-12/);
  assert.match(component, /sm:grid-cols-\[12rem_minmax\(0,1fr\)\]/);
  assert.match(component, /sm:grid-cols-\[4rem_minmax\(0,1fr\)\]/);
  assert.match(component, /bg-media-backdrop/);
  assert.match(component, /text-accent-on-dark/);
});
