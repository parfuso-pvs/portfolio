import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const careerPath = "src/components/home/career-thread.tsx";
const experiencePath = "src/content/experience.ts";

test("independent work is a subordinate branch of the later career chapter", async () => {
  const [career, experience] = await Promise.all([
    readFile(careerPath, "utf8"),
    readFile(experiencePath, "utf8"),
  ]);

  assert.match(career, /company\.projectId === "memx"/);
  assert.match(career, /styles\.branch/);
  assert.match(career, /Parallel practice/);
  assert.match(experience, /context: "Built alongside"/);
  assert.match(experience, /January 2024/);
  assert.match(experience, /December 2025/);
});

test("PixelVerse, Domani, and Iffer's attribution remains explicit", async () => {
  const [career, experience] = await Promise.all([
    readFile(careerPath, "utf8"),
    readFile(experiencePath, "utf8"),
  ]);

  assert.match(career, /getProject\("pixelverse-studios"\)/);
  assert.match(career, /getProject\("domani"\)/);
  assert.match(career, /getProject\("iffers-pictures"\)/);
  assert.match(experience, /I lead engineering; Sami leads design/);
  assert.match(career, /owned discovery, copy, visual design, implementation, and client/);
});

test("only routed independent work becomes a project link", async () => {
  const career = await readFile(careerPath, "utf8");

  assert.match(career, /sideProject\.href \?/);
  assert.match(career, /href=\{sideProject\.href\}/);
  assert.match(career, /href=\{iffers\.href\}/);
});
