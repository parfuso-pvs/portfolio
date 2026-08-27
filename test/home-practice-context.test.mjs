import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const homePagePath = "src/app/page.tsx";
const practicePath = "src/components/home/home-practice-context.tsx";

test("the homepage selects its supporting context from the project registry", async () => {
  const [homePage, practice] = await Promise.all([
    readFile(homePagePath, "utf8"),
    readFile(practicePath, "utf8"),
  ]);

  assert.match(homePage, /getProject\("pixelverse-studios"\)/);
  assert.match(homePage, /getProject\("earthcam"\)/);
  assert.doesNotMatch(homePage, /PixelVerse Studios|EarthCam/);
  assert.match(practice, /project\.name/);
  assert.doesNotMatch(practice, />\s*PixelVerse Studios|>\s*EarthCam/);
});

test("supporting experience remains concise and correctly attributed", async () => {
  const practice = await readFile(practicePath, "utf8");

  assert.match(practice, /project\.summary/);
  assert.match(practice, /project\.ownership/);
  assert.match(practice, /project\.proofPoints\[0\]/);
  assert.match(practice, /project\.discipline/);
  assert.match(practice, /project\.role/);
  assert.doesNotMatch(practice, /project\.approvedFeatures|project\.metrics/);
});

test("the practice section is semantic, responsive, and links only to About", async () => {
  const practice = await readFile(practicePath, "utf8");

  assert.doesNotMatch(practice, /"use client"/);
  assert.match(practice, /<section/);
  assert.match(practice, /<h2/);
  assert.match(practice, /<article/);
  assert.match(practice, /lg:grid-cols-12/);
  assert.match(practice, /href="\/about"/);
  assert.doesNotMatch(practice, /href=\{project\.href\}/);
  assert.match(practice, /min-h-11/);
  assert.match(practice, /hover:text-accent/);
  assert.match(practice, /focus-visible:text-accent/);
  assert.match(practice, /active:text-accent-strong/);
});
