import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const homePagePath = "src/app/page.tsx";
const introductionPath = "src/components/home/home-introduction.tsx";
const careerPath = "src/components/home/career-thread.tsx";

test("the homepage is a navigation-free career-led composition", async () => {
  const [homePage, introduction] = await Promise.all([
    readFile(homePagePath, "utf8"),
    readFile(introductionPath, "utf8"),
  ]);

  assert.match(homePage, /<HomeIntroduction \/>/);
  assert.match(homePage, /<CareerThread \/>/);
  assert.match(homePage, /<HomeContact \/>/);
  assert.doesNotMatch(homePage, /HomeHero|HomeFeaturedWork|HomePracticeContext|HomeContactClose/);
  assert.doesNotMatch(introduction, /<nav|href="\/(?:work|about|contact)"/);
});

test("the introduction is plain, semantic, and server rendered", async () => {
  const introduction = await readFile(introductionPath, "utf8");

  assert.doesNotMatch(introduction, /"use client"/);
  assert.match(introduction, /<section/);
  assert.match(introduction, /<header/);
  assert.match(introduction, /<h1/);
  assert.match(introduction, /I started in frontend and gradually took on more of the stack/);
  assert.match(introduction, /Senior[\s\S]*Full Stack Engineer at MEMX/);
  assert.match(introduction, /Frontend, full-stack web, or mobile roles/i);
  assert.doesNotMatch(introduction, /passion|innovative|seamless|cutting-edge/i);
});

test("the introduction leads directly to the career journey", async () => {
  const [introduction, career] = await Promise.all([
    readFile(introductionPath, "utf8"),
    readFile(careerPath, "utf8"),
  ]);

  assert.match(introduction, /href="#experience"/);
  assert.match(introduction, /min-h-11/);
  assert.match(career, /id="experience"/);
  assert.match(career, /aria-labelledby="experience-title"/);
});
