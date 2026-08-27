import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const homePagePath = "src/app/page.tsx";
const heroPath = "src/components/home/home-hero.tsx";
const globalStylesPath = "src/app/globals.css";

test("the homepage hero selects MEMX from the project registry", async () => {
  const homePage = await readFile(homePagePath, "utf8");

  assert.match(homePage, /getProject\("memx"\)/);
  assert.match(homePage, /featuredProject=\{getProject\("memx"\)\}/);
  assert.doesNotMatch(homePage, /MEMX|\/work\/memx/);
});

test("the homepage hero remains a server-rendered semantic composition", async () => {
  const hero = await readFile(heroPath, "utf8");

  assert.doesNotMatch(hero, /"use client"/);
  assert.match(hero, /<main/);
  assert.match(hero, /<h1/);
  assert.match(hero, /<figure/);
  assert.match(hero, /<figcaption/);
  assert.match(hero, /min-h-\[100dvh\]/);
});

test("the homepage exposes its three approved navigation paths", async () => {
  const hero = await readFile(heroPath, "utf8");

  assert.match(hero, /href=\{featuredProject\.href\}/);
  assert.match(hero, /href="\/work"/);
  assert.match(hero, /href="\/contact"/);
  assert.match(hero, /aria-label="Homepage actions"/);
});

test("the MEMX diagram uses registry content and preserves confidentiality", async () => {
  const hero = await readFile(heroPath, "utf8");

  assert.match(hero, /project\.approvedFeatures\.slice\(0, 4\)/);
  assert.match(hero, /Original diagram of four connected MEMX platform layers/);
  assert.doesNotMatch(hero, /private screenshot|order book|matching engine|fake exchange data/i);
});

test("primary homepage actions cover hover, focus, active, and touch sizing", async () => {
  const hero = await readFile(heroPath, "utf8");

  assert.match(hero, /hover:-translate-y-1/);
  assert.match(hero, /focus-visible:-translate-y-1/);
  assert.match(hero, /active:translate-y-0/);
  assert.equal(hero.match(/min-h-11/g)?.length, 2);
});

test("the entrance sequence never gates the primary content sheet", async () => {
  const styles = await readFile(globalStylesPath, "utf8");
  const motionRules = styles.match(
    /\.home-assembly-backdrop,[\s\S]*?animation: home-assembly-enter[^}]+}/,
  )?.[0];

  assert.ok(motionRules);
  assert.doesNotMatch(motionRules, /\.home-assembly-sheet/);
  assert.match(styles, /translate: 0 1rem/);
  assert.match(styles, /scale: 0\.992/);
});
