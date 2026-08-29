import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const framePath = "src/components/case-study/case-study-frame.tsx";
const routePaths = [
  "src/app/work/memx/page.tsx",
  "src/app/work/domani/page.tsx",
  "src/app/work/iffers-pictures/page.tsx",
];

test("featured routes share one registry-driven case-study frame", async () => {
  const [frame, ...routes] = await Promise.all([
    readFile(framePath, "utf8"),
    ...routePaths.map((path) => readFile(path, "utf8")),
  ]);

  routes.forEach((route) => {
    assert.match(route, /<CaseStudyFrame project=\{project\}(?: \/>|>)/);
    assert.doesNotMatch(route, /<RouteIntro/);
  });
  assert.match(frame, /project\.name/);
  assert.match(frame, /project\.summary/);
  assert.match(frame, /project\.role/);
  assert.match(frame, /project\.ownership/);
  assert.match(frame, /project\.attribution/);
  assert.match(frame, /project\.artifactCopy/);
});

test("the shared frame remains semantic and server rendered", async () => {
  const frame = await readFile(framePath, "utf8");

  assert.doesNotMatch(frame, /"use client"/);
  assert.match(frame, /<main/);
  assert.match(frame, /<h1/);
  assert.match(frame, /<h2/);
  assert.match(frame, /<aside/);
  assert.match(frame, /aria-labelledby="case-study-title"/);
});

test("the frame has responsive composition and an accessible journey return", async () => {
  const frame = await readFile(framePath, "utf8");

  assert.match(frame, /lg:grid-cols-12/);
  assert.match(frame, /<BackToJourney projectId=\{project\.id\} \/>/);
  assert.doesNotMatch(frame, /Back to work index/);
});
