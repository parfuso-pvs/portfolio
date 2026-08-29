import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pagePath = "src/app/about/page.tsx";
const componentPath = "src/components/about/about-narrative.tsx";
const journeyPath = "src/components/about/career-journey.tsx";
const journeyStylesPath = "src/components/about/career-journey.module.css";
const contentPath = "src/content/about.ts";
const performancePath = "scripts/measure-motion-performance.mjs";

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

  ["March 2018", "December 2019", "January 2023", "January 2024", "December 2025"].forEach((date) =>
    assert.match(content, new RegExp(date)),
  );
  assert.match(content, /Front-End Developer → Lead Front-End Developer/);
  assert.match(content, /roles: "Front-End Engineer"/);
  assert.match(content, /roles: "Senior Full Stack Engineer"/);
  assert.match(content, /MEMX \/ position 1 of 2/);
  assert.match(content, /MEMX \/ position 2 of 2/);
  assert.match(content, /Creator & Full-Stack Engineer/);
  assert.doesNotMatch(content, /Co-Founder & Sole Developer/);
  assert.equal((content.match(/projectId: "memx"/g) ?? []).length, 2);
  assert.equal((content.match(/kind: "full-time"/g) ?? []).length, 3);
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
  const [journey, journeyStyles] = await Promise.all([
    readFile(journeyPath, "utf8"),
    readFile(journeyStylesPath, "utf8"),
  ]);

  assert.match(journey, /^"use client";/);
  assert.match(journey, /<LazyMotion features=\{loadDomAnimation\} strict>/);
  assert.match(journey, /<MotionConfig reducedMotion="user">/);
  assert.match(journey, /useScroll\(\)/);
  assert.match(journey, /useMotionValueEvent\(scrollY, "change", updateJourney\)/);
  assert.match(journey, /useMotionValue\(0\)/);
  assert.match(journey, /<m\.span/);
  assert.match(journey, /new ResizeObserver\(measureJourney\)/);
  assert.doesNotMatch(journey, /window\.requestAnimationFrame|window\.cancelAnimationFrame/);
  assert.doesNotMatch(journey, /addEventListener\("scroll"/);
  assert.doesNotMatch(journey, /\.style\.transform/);
  assert.match(journey, /const firstMilestone =/);
  assert.match(journey, /const lastMilestone =/);
  assert.match(journey, /const isAtPageEnd =/);
  assert.match(journey, /const effectiveAnchor = isAtPageEnd \? lastMilestone : anchor/);
  assert.match(journey, /setActiveIndex\(nextActiveIndex\)/);
  assert.match(journey, /motion-reduce:transition-none/);
  assert.match(journey, /data-state=\{state\}/);
  assert.doesNotMatch(journey, /<ol[^>]*>\s*<(?:m\.)?span/);
  assert.match(journeyStyles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(journeyStyles, /transform: translateX\(-1px\) scaleY\(1\) !important/);
  assert.match(journeyStyles, /display: none/);
});

test("the production motion probe exercises the About career journey", async () => {
  const [journey, performanceProbe] = await Promise.all([
    readFile(journeyPath, "utf8"),
    readFile(performancePath, "utf8"),
  ]);

  assert.match(journey, /data-career-journey/);
  assert.match(journey, /data-career-progress/);
  assert.match(journey, /data-career-index/);
  assert.match(performanceProbe, /motionScenario === "about-career"/);
  assert.match(performanceProbe, /MOTION_REDUCED/);
  assert.match(performanceProbe, /measureAboutCareer/);
  assert.match(performanceProbe, /directListChildrenValid/);
  assert.match(performanceProbe, /finalStepActive/);
  assert.match(performanceProbe, /progressHeadHidden/);
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
