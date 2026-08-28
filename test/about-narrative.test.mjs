import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pagePath = "src/app/about/page.tsx";
const componentPath = "src/components/about/about-narrative.tsx";
const journeyPath = "src/components/about/career-journey.tsx";
const contentPath = "src/content/about.ts";

test("the About route composes grounded content and project records", async () => {
  const [page, component, journey] = await Promise.all([
    readFile(pagePath, "utf8"),
    readFile(componentPath, "utf8"),
    readFile(journeyPath, "utf8"),
  ]);

  assert.match(page, /<AboutNarrative projects=\{workingContexts\} \/>/);
  ["memx", "domani", "pixelverse-studios", "earthcam"].forEach((projectId) =>
    assert.match(page, new RegExp(`getProject\\("${projectId}"\\)`)),
  );
  assert.match(component, /projects\.find/);
  assert.match(component, /name: project\.name/);
  assert.match(component, /indexLabel: project\.indexLabel/);
  assert.match(journey, /entry\.name/);
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

test("the career chapter keeps verified full-time and after-hours work on one chronology", async () => {
  const [content, component, journey] = await Promise.all([
    readFile(contentPath, "utf8"),
    readFile(componentPath, "utf8"),
    readFile(journeyPath, "utf8"),
  ]);

  ["March 2018", "December 2019", "January 2024", "December 2025"].forEach((date) =>
    assert.match(content, new RegExp(date)),
  );
  assert.match(content, /Front-End Developer → Lead Front-End Developer/);
  assert.match(content, /Front-End Engineer → Senior Full Stack Engineer/);
  assert.match(content, /Creator & Full-Stack Engineer/);
  assert.doesNotMatch(content, /Co-Founder & Sole Developer/);
  assert.equal((content.match(/kind: "full-time"/g) ?? []).length, 2);
  assert.equal((content.match(/kind: "after-hours"/g) ?? []).length, 2);
  assert.match(content, /Everything belongs to one chronology/);
  assert.match(journey, /<time dateTime=/);
  assert.match(component, /aboutContent\.career\.entries\.map/);
  assert.doesNotMatch(journey, /parallelTrack/);
  assert.match(journey, /aria-label="Timeline key"/);
  assert.match(journey, /lg:grid-cols-12/);
  assert.match(journey, /material-blueprint pointer-events-none absolute/);
  assert.match(journey, /aria-current=\{isActive \? "step"/);
  assert.equal((journey.match(/<ol/g) ?? []).length, 1);
});

test("the career journey advances its active chapter and progress spine on scroll", async () => {
  const journey = await readFile(journeyPath, "utf8");

  assert.match(journey, /^"use client";/);
  assert.match(journey, /window\.requestAnimationFrame/);
  assert.match(journey, /addEventListener\("scroll", scheduleUpdate, \{ passive: true \}\)/);
  assert.match(journey, /progress\.style\.transform = `scaleY/);
  assert.match(journey, /setActiveIndex\(nextActiveIndex\)/);
  assert.match(journey, /motion-reduce:transition-none/);
  assert.match(journey, /data-state=\{state\}/);
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
  const [component, journey] = await Promise.all([
    readFile(componentPath, "utf8"),
    readFile(journeyPath, "utf8"),
  ]);

  assert.doesNotMatch(component, /"use client"/);
  assert.match(journey, /"use client"/);
  assert.match(component, /<main id="main-content"/);
  assert.equal((component.match(/<section/g) ?? []).length, 4);
  assert.match(component, /<h1/);
  assert.match(journey, /<ol/);
  assert.match(component, /lg:grid-cols-12/);
  assert.match(component, /max-w-\[90rem\]/);
  assert.match(journey, /lg:col-span-8 lg:col-start-5/);
});
