import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const homePagePath = "src/app/page.tsx";
const featuredWorkPath = "src/components/home/home-featured-work.tsx";

test("the homepage selects its two supporting features from the registry", async () => {
  const homePage = await readFile(homePagePath, "utf8");

  assert.match(homePage, /getProject\("domani"\)/);
  assert.match(homePage, /getProject\("iffers-pictures"\)/);
  assert.doesNotMatch(homePage, /Domani|Iffer's Pictures/);
});

test("the featured-work sequence remains semantic and server rendered", async () => {
  const featuredWork = await readFile(featuredWorkPath, "utf8");

  assert.doesNotMatch(featuredWork, /"use client"/);
  assert.match(featuredWork, /<section/);
  assert.match(featuredWork, /<h2/);
  assert.match(featuredWork, /<ProjectIndexCard/);
  assert.match(featuredWork, /projects\.map/);
});

test("the section provides responsive composition and a work-index path", async () => {
  const featuredWork = await readFile(featuredWorkPath, "utf8");

  assert.match(featuredWork, /grid-cols-1/);
  assert.match(featuredWork, /lg:grid-cols-12/);
  assert.match(featuredWork, /href="\/work"/);
  assert.match(featuredWork, /min-h-11/);
  assert.match(featuredWork, /hover:text-accent/);
  assert.match(featuredWork, /focus-visible:text-accent/);
  assert.match(featuredWork, /active:text-accent-strong/);
});
