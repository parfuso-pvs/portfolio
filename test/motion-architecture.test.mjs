import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const packagePath = "package.json";
const motionPath = "src/components/home/career-thread-motion.tsx";
const motionStylesPath = "src/components/home/career-thread.module.css";
const featuresPath = "src/components/motion/dom-animation-features.ts";
const performancePath = "scripts/measure-motion-performance.mjs";

test("Motion remains the single versioned animation dependency", async () => {
  const packageJson = JSON.parse(await readFile(packagePath, "utf8"));

  assert.equal(packageJson.dependencies.motion, "13.1.1");
  assert.equal(packageJson.dependencies.gsap, undefined);
  assert.equal(packageJson.dependencies["framer-motion"], undefined);
});

test("the career thread isolates scroll enhancement in a small client leaf", async () => {
  const [motion, features] = await Promise.all([
    readFile(motionPath, "utf8"),
    readFile(featuresPath, "utf8"),
  ]);

  assert.match(motion, /^"use client";/);
  assert.match(motion, /<LazyMotion features=\{loadDomAnimation\} strict>/);
  assert.match(motion, /import\("@\/components\/motion\/dom-animation-features"\)/);
  assert.match(motion, /<MotionConfig reducedMotion="user">/);
  assert.match(features, /domAnimation/);
  assert.doesNotMatch(motion, /<h[1-6]|<Link/);
  assert.match(motion, /\{children\}/);
});

test("the thread maps scroll progress directly to the decorative path", async () => {
  const [motion, styles] = await Promise.all([
    readFile(motionPath, "utf8"),
    readFile(motionStylesPath, "utf8"),
  ]);

  assert.match(motion, /useScroll\(\{/);
  assert.match(motion, /target: containerRef/);
  assert.match(motion, /style=\{\{ pathLength: scrollYProgress \}\}/);
  assert.doesNotMatch(motion, /useReducedMotion|shouldReduceMotion/);
  assert.match(motion, /preserveAspectRatio="none"/);
  assert.doesNotMatch(motion, /useState|addEventListener|requestAnimationFrame/);
  assert.match(styles, /vector-effect: non-scaling-stroke/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(styles, /stroke-dasharray: none !important/);
  assert.match(styles, /stroke-dashoffset: 0 !important/);
  assert.doesNotMatch(styles, /animation-iteration-count:\s*infinite/);
});

test("the production motion probe records the career thread", async () => {
  const [packageJson, performanceSource] = await Promise.all([
    readFile(packagePath, "utf8").then(JSON.parse),
    readFile(performancePath, "utf8"),
  ]);

  assert.equal(packageJson.scripts["measure:motion"], `node ${performancePath}`);
  assert.match(performanceSource, /requestAnimationFrame/);
  assert.match(performanceSource, /PerformanceObserver/);
  assert.match(performanceSource, /data-career-thread/);
});
