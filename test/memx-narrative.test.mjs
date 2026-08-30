import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const contentPath = "src/content/case-studies/memx.ts";
const introPath = "src/components/case-study/memx-chapter-intro.tsx";
const narrativePath = "src/components/case-study/memx-narrative.tsx";
const pagePath = "src/app/work/memx/page.tsx";

test("the MEMX route composes a dedicated career-led chapter", async () => {
  const [page, intro, narrative] = await Promise.all([
    readFile(pagePath, "utf8"),
    readFile(introPath, "utf8"),
    readFile(narrativePath, "utf8"),
  ]);

  assert.match(page, /<main id="main-content"/);
  assert.match(page, /<MemxChapterIntro project=\{project\} \/>/);
  assert.match(page, /<MemxNarrative \/>/);
  assert.doesNotMatch(page, /CaseStudyFrame/);
  assert.doesNotMatch(intro, /"use client"/);
  assert.doesNotMatch(narrative, /"use client"/);
  assert.match(intro, /employmentHistory/);
  assert.match(intro, /<CareerChapterTitle projectId=\{project\.id\}>/);
  assert.match(intro, /<BackToJourney projectId=\{project\.id\} \/>/);
  assert.match(intro, /experience\.roles\.map/);
  assert.match(narrative, /memxCaseStudy/);
  assert.match(narrative, /<h2/);
  assert.match(narrative, /<h3/);
  assert.match(narrative, /<ol/);
  assert.match(narrative, /<dl/);
});

test("the MEMX narrative preserves market scale and ownership attribution", async () => {
  const content = await readFile(contentPath, "utf8");

  assert.match(content, /value: "03"/);
  assert.match(content, /One equities exchange and two options exchanges/);
  assert.match(content, /value: "05"/);
  assert.match(content, /One crypto exchange and four equities exchanges/);
  assert.match(content, /Phil's manager scaffolded the database-driven market architecture/);
  assert.match(content, /Phil created the corresponding frontend system/);
  assert.match(content, /backend and WebSocket flow/);
});

test("the narrative avoids confidential and unsupported exchange claims", async () => {
  const [content, narrative] = await Promise.all([
    readFile(contentPath, "utf8"),
    readFile(narrativePath, "utf8"),
  ]);
  const source = `${content}\n${narrative}`;

  assert.doesNotMatch(source, /35%|order book|matching engine|private screenshot|fake exchange/i);
  assert.doesNotMatch(source, /<Image|<img|backgroundImage:\s*url/);
});

test("the narrative recomposes its asymmetric sections for small screens", async () => {
  const [intro, narrative] = await Promise.all([
    readFile(introPath, "utf8"),
    readFile(narrativePath, "utf8"),
  ]);

  assert.match(narrative, /lg:grid-cols-12/);
  assert.match(narrative, /sm:grid-cols-\[4rem_minmax\(0,1fr\)\]/);
  assert.match(intro, /sm:grid-cols-\[minmax\(0,1fr\)_auto\]/);
  assert.match(narrative, /bg-paper-raised/);
  assert.match(narrative, /bg-accent/);
  assert.doesNotMatch(narrative, /material-blueprint|bg-media-backdrop|background-image:/);
});
