import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const contentPath = "src/content/case-studies/memx-diagrams.ts";
const diagramPath = "src/components/case-study/memx-system-diagrams.tsx";
const diagramMotionPath = "src/components/motion/memx-diagram-trace.tsx";
const diagramMotionStylesPath = "src/components/motion/memx-diagram-trace.module.css";
const motionPerformancePath = "scripts/measure-motion-performance.mjs";
const pagePath = "src/app/work/memx/page.tsx";

test("the MEMX route includes two original system diagrams", async () => {
  const [page, diagrams] = await Promise.all([
    readFile(pagePath, "utf8"),
    readFile(diagramPath, "utf8"),
  ]);

  assert.match(page, /<MemxSystemDiagrams \/>/);
  assert.doesNotMatch(diagrams, /"use client"/);
  assert.equal((diagrams.match(/<figure/g) ?? []).length, 2);
  assert.equal((diagrams.match(/<figcaption/g) ?? []).length, 2);
  assert.match(diagrams, /memxSystemDiagrams/);
  assert.equal((diagrams.match(/<MemxDiagramTrace/g) ?? []).length, 2);
});

test("both figures provide visible context and registry-backed text equivalents", async () => {
  const [content, diagrams] = await Promise.all([
    readFile(contentPath, "utf8"),
    readFile(diagramPath, "utf8"),
  ]);

  assert.equal((content.match(/accessibleDescription:/g) ?? []).length, 2);
  assert.match(diagrams, /aria-labelledby="memx-configuration-title"/);
  assert.match(
    diagrams,
    /aria-describedby="memx-configuration-summary memx-configuration-description"/,
  );
  assert.match(diagrams, /aria-labelledby="memx-realtime-title"/);
  assert.match(diagrams, /aria-describedby="memx-realtime-summary memx-realtime-description"/);
  assert.match(diagrams, /className="sr-only"/);
  assert.equal((diagrams.match(/aria-hidden="true"/g) ?? []).length, 2);
});

test("diagram content preserves ownership and confidentiality boundaries", async () => {
  const content = await readFile(contentPath, "utf8");

  assert.match(content, /database supplied configuration/);
  assert.match(
    content,
    /market-specific classes handled rules and methods that could not be shared/,
  );
  assert.match(content, /Phil's frontend system translated that context/);
  assert.match(content, /missing or malformed values/);
  assert.doesNotMatch(
    content,
    /order book|matching engine|bid price|ask price|shares|payload schema/i,
  );
});

test("diagram layouts collapse from horizontal flows to vertical mobile paths", async () => {
  const diagrams = await readFile(diagramPath, "utf8");

  assert.match(diagrams, /lg:grid-cols-12/);
  assert.match(diagrams, /lg:grid-cols-5/);
  assert.match(diagrams, /lg:grid-cols-3/);
  assert.match(diagrams, /border-l border-accent/);
  assert.match(diagrams, /bg-paper-raised/);
  assert.doesNotMatch(diagrams, /material-blueprint|bg-media-backdrop|background-image:/);
});

test("diagram drawing stays decorative and route-local", async () => {
  const [diagrams, motion] = await Promise.all([
    readFile(diagramPath, "utf8"),
    readFile(diagramMotionPath, "utf8"),
  ]);

  assert.doesNotMatch(diagrams, /"use client"/);
  assert.match(motion, /^"use client";/);
  assert.match(motion, /<LazyMotion features=\{loadDomAnimation\} strict>/);
  assert.match(motion, /<MotionConfig reducedMotion="user">/);
  assert.match(motion, /<m\.path/);
  assert.match(motion, /whileInView="visible"/);
  assert.match(motion, /viewport=\{\{ amount: 0\.35, once: true \}\}/);
  assert.match(motion, /aria-hidden="true"/);
  assert.doesNotMatch(motion, /memxSystemDiagrams|accessibleDescription|Exchange event/);
  assert.doesNotMatch(diagrams, /<ol[^>]*>\s*<MemxDiagramTrace/);
});

test("diagram traces recompose and resolve immediately for reduced motion", async () => {
  const [motion, motionStyles] = await Promise.all([
    readFile(diagramMotionPath, "utf8"),
    readFile(diagramMotionStylesPath, "utf8"),
  ]);

  assert.match(motion, /className="hidden lg:block"/);
  assert.match(motion, /className="block lg:hidden"/);
  assert.match(motion, /initial=\{shouldReduceMotion \? false : "hidden"\}/);
  assert.match(motionStyles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(motionStyles, /stroke-dasharray: none !important/);
  assert.match(motionStyles, /stroke-dashoffset: 0 !important/);
});

test("the runtime probe exercises the MEMX traces", async () => {
  const performanceProbe = await readFile(motionPerformancePath, "utf8");

  assert.match(performanceProbe, /MOTION_SCENARIO/);
  assert.match(performanceProbe, /motionScenario === "memx-diagrams"/);
  assert.match(performanceProbe, /\[data-diagram-trace\]/);
  assert.match(performanceProbe, /diagramScroll/);
  assert.match(performanceProbe, /settledPaths/);
  assert.match(performanceProbe, /traceState\.settledPaths !== traceState\.visiblePaths/);
});
