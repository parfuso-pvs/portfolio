import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const homePagePath = "src/app/page.tsx";
const introPath = "src/components/home/career-led-intro.tsx";
const careerMapPath = "src/components/home/career-map.tsx";
const experiencePath = "src/content/experience.ts";

test("the homepage composes the career-led experiment from project records", async () => {
  const homePage = await readFile(homePagePath, "utf8");

  assert.match(homePage, /<CareerLedIntro \/>/);
  assert.match(homePage, /<CareerMap projects=\{careerProjects\} \/>/);
  assert.match(homePage, /<SimpleContact \/>/);
  ["memx", "domani", "iffers-pictures", "pixelverse-studios", "earthcam"].forEach((projectId) =>
    assert.match(homePage, new RegExp(`getProject\\("${projectId}"\\)`)),
  );
  assert.doesNotMatch(homePage, /<HomeHero|<HomeAssemblyMotion/);
});

test("the introduction is plain, semantic, and server rendered", async () => {
  const intro = await readFile(introPath, "utf8");

  assert.doesNotMatch(intro, /"use client"|motion\/react|HomeAssemblyMotion/);
  assert.match(intro, /<section/);
  assert.match(intro, /<h1/);
  assert.match(intro, /I started in frontend and gradually took on more of the stack/);
  assert.match(intro, /most recently as a Senior Full/);
  assert.doesNotMatch(intro, /min-h-\[100dvh\]|material-blueprint|RegistrationMark/);
});

test("the introduction leads directly to experience and contact", async () => {
  const intro = await readFile(introPath, "utf8");

  assert.match(intro, /href="#experience"/);
  assert.match(intro, /href="\/contact"/);
  assert.match(intro, /aria-label="Introduction actions"/);
  assert.equal(intro.match(/min-h-11/g)?.length, 2);
});

test("career companies contain visible nested role chapters", async () => {
  const [careerMap, experience] = await Promise.all([
    readFile(careerMapPath, "utf8"),
    readFile(experiencePath, "utf8"),
  ]);

  assert.match(careerMap, /<ol className=/);
  assert.match(careerMap, /company\.roles\.map/);
  assert.match(careerMap, /<h4/);
  assert.match(experience, /Junior Front-End Developer/);
  assert.match(experience, /Lead Front-End Developer/);
  assert.match(experience, /Front-End Engineer/);
  assert.match(experience, /Senior Full Stack Engineer/);
  assert.match(experience, /August 2026/);
});

test("the career map preserves the verified origin and parallel-work context", async () => {
  const [careerMap, experience] = await Promise.all([
    readFile(careerMapPath, "utf8"),
    readFile(experiencePath, "utf8"),
  ]);

  assert.match(experience, /Online Project Supervisor/);
  assert.match(experience, /CSS and JavaScript/);
  assert.match(experience, /Built outside full-time work/);
  assert.match(careerMap, /Parallel track/);
  assert.match(careerMap, /project\("iffers-pictures"\)/);
  assert.doesNotMatch(careerMap, /"use client"|motion\/react/);
});
