import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const packagePath = "package.json";
const motionPath = "src/components/motion/home-assembly-motion.tsx";
const featuresPath = "src/components/motion/dom-animation-features.ts";

test("Motion is the single versioned animation dependency", async () => {
  const packageSource = await readFile(packagePath, "utf8");
  const packageJson = JSON.parse(packageSource);

  assert.equal(packageJson.dependencies.motion, "13.1.1");
  assert.equal(packageJson.dependencies.gsap, undefined);
  assert.equal(packageJson.dependencies["framer-motion"], undefined);
});

test("the prototype loads a route-local feature bundle", async () => {
  const [motion, features] = await Promise.all([
    readFile(motionPath, "utf8"),
    readFile(featuresPath, "utf8"),
  ]);

  assert.match(motion, /^"use client";/);
  assert.match(motion, /<LazyMotion features=\{loadDomAnimation\} strict>/);
  assert.match(motion, /import\("@\/components\/motion\/dom-animation-features"\)/);
  assert.match(motion, /<MotionConfig reducedMotion="user">/);
  assert.match(features, /domAnimation/);
});

test("pointer and scroll values bypass React render state", async () => {
  const motion = await readFile(motionPath, "utf8");

  assert.match(motion, /useMotionValue/);
  assert.match(motion, /useScroll/);
  assert.match(motion, /useTransform/);
  assert.match(motion, /event\.pointerType !== "mouse"/);
  assert.match(motion, /shouldReduceMotion/);
  assert.doesNotMatch(motion, /useState/);
  assert.doesNotMatch(motion, /addEventListener/);
});
