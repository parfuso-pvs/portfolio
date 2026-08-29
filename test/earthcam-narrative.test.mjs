import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pagePath = "src/app/work/earthcam/page.tsx";

test("the EarthCam route uses verified registry and chronology content", async () => {
  const page = await readFile(pagePath, "utf8");

  assert.match(page, /getProject\("earthcam"\)/);
  assert.match(page, /employmentHistory\.find/);
  assert.match(page, /experience\.roles\.map/);
  assert.match(page, /project\.approvedFeatures\.map/);
  assert.match(page, /project\.ownership/);
  assert.match(page, /project\.attribution/);
  assert.doesNotMatch(page, /private stream|performance improvement|percent/i);
});

test("the EarthCam route is a concise, semantic full-page chapter", async () => {
  const page = await readFile(pagePath, "utf8");

  assert.doesNotMatch(page, /"use client"/);
  assert.match(page, /<main id="main-content"/);
  assert.match(page, /<h1/);
  assert.equal((page.match(/<section/g) ?? []).length, 3);
  assert.match(page, /<ol/);
  assert.match(page, /<time dateTime=/);
  assert.match(page, /<BackToJourney/);
  assert.match(page, /lg:grid-cols-12/);
});

test("EarthCam role surfaces remain vertically separated", async () => {
  const page = await readFile(pagePath, "utf8");

  assert.match(page, /className="mt-10 grid gap-4/);
  assert.match(page, /rounded-\[1\.25rem\]/);
  assert.doesNotMatch(page, /absolute[^"]*role|overlap|negative-margin/);
});
