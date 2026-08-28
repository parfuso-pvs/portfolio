import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const contentPath = "src/content/case-studies/domani.ts";
const narrativePath = "src/components/case-study/domani-narrative.tsx";
const pagePath = "src/app/work/domani/page.tsx";

test("the Domani route composes a dedicated registry-backed narrative", async () => {
  const [page, narrative] = await Promise.all([
    readFile(pagePath, "utf8"),
    readFile(narrativePath, "utf8"),
  ]);

  assert.match(page, /<CaseStudyFrame project=\{project\}>/);
  assert.match(page, /<DomaniNarrative project=\{project\} \/>/);
  assert.doesNotMatch(narrative, /"use client"/);
  assert.match(narrative, /domaniCaseStudy/);
  assert.match(narrative, /project\.approvedFeatures\.map/);
  assert.match(narrative, /project\.roadmap\.map/);
});

test("the narrative explains the product intent and full ownership accurately", async () => {
  const content = await readFile(contentPath, "utf8");

  assert.match(content, /Every productivity app Phil tried introduced a tradeoff/);
  assert.match(content, /deliberate expansion into mobile product development/);
  assert.match(content, /Phil conceived the product/);
  assert.match(content, /continues to operate it/);
  assert.match(content, /Rollover is a decision/);
  assert.match(content, /progress analytics/);
});

test("the narrative keeps shipped, roadmap, and production evidence distinct", async () => {
  const [content, narrative] = await Promise.all([
    readFile(contentPath, "utf8"),
    readFile(narrativePath, "utf8"),
  ]);
  const source = `${content}\n${narrative}`;

  assert.match(source, /Available now/);
  assert.match(source, /In exploration/);
  assert.match(content, /Roadmap ideas are active product exploration/);
  assert.doesNotMatch(source, /308|157|conversion rate|downloads/i);
  assert.doesNotMatch(narrative, /project\.metrics/);
  assert.doesNotMatch(narrative, /<Image|<img/);
});

test("the Domani narrative recomposes its editorial grids for small screens", async () => {
  const narrative = await readFile(narrativePath, "utf8");

  assert.match(narrative, /lg:grid-cols-12/);
  assert.match(narrative, /sm:grid-cols-\[5rem_minmax\(0,1fr\)\]/);
  assert.match(narrative, /md:grid-cols-2/);
  assert.match(narrative, /text-accent-on-dark/);
  assert.match(narrative, /bg-media-backdrop/);
});
