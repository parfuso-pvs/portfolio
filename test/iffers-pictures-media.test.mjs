import assert from "node:assert/strict";
import { stat, readFile } from "node:fs/promises";
import test from "node:test";

const assetPaths = [
  "public/images/iffers-pictures/maternity-session.jpg",
  "public/images/iffers-pictures/family-session.jpg",
  "public/images/iffers-pictures/engagement-detail.jpg",
  "public/images/iffers-pictures/baby-shower-details.jpg",
];
const contentPath = "src/content/case-studies/iffers-pictures-media.ts";
const componentPath = "src/components/case-study/iffers-pictures-media.tsx";
const pagePath = "src/app/work/iffers-pictures/page.tsx";

test("the Iffer's Pictures route includes approved production photography", async () => {
  const [page, component, ...assets] = await Promise.all([
    readFile(pagePath, "utf8"),
    readFile(componentPath, "utf8"),
    ...assetPaths.map((assetPath) => stat(assetPath)),
  ]);

  assert.match(page, /<IffersPicturesMedia \/>/);
  assert.match(component, /from "next\/image"/);
  assert.equal(
    assets.every((asset) => asset.size > 100_000),
    true,
  );
});

test("every production image has registry-backed dimensions, alt text, and a source note", async () => {
  const [content, component] = await Promise.all([
    readFile(contentPath, "utf8"),
    readFile(componentPath, "utf8"),
  ]);

  assert.equal((content.match(/src: "\/images\/iffers-pictures\//g) ?? []).length, 4);
  assert.equal((content.match(/width: \d+/g) ?? []).length, 4);
  assert.equal((content.match(/height: \d+/g) ?? []).length, 4);
  assert.equal((content.match(/alt: "/g) ?? []).length, 4);
  assert.match(content, /Approved production photography by Iffer's Pictures/);
  assert.match(content, /Photography remains the client's work/);
  assert.match(component, /alt=\{photo\.alt\}/);
  assert.match(component, /width=\{photo\.width\}/);
  assert.match(component, /height=\{photo\.height\}/);
  assert.match(component, /sizes=\{imageSizes\[photo\.id\]\}/);
});

test("the gallery is a responsive, static editorial composition", async () => {
  const component = await readFile(componentPath, "utf8");

  assert.doesNotMatch(component, /"use client"/);
  assert.match(component, /lg:grid-cols-12/);
  assert.match(component, /lg:row-span-2/);
  assert.match(component, /h-auto w-full/);
  assert.match(component, /<figure/);
  assert.match(component, /<figcaption/);
  assert.doesNotMatch(component, /priority/);
});

test("the production media contains no generated or externally loaded photography", async () => {
  const [content, component] = await Promise.all([
    readFile(contentPath, "utf8"),
    readFile(componentPath, "utf8"),
  ]);
  const source = `${content}\n${component}`;

  assert.doesNotMatch(source, /https?:\/\//);
  assert.doesNotMatch(source, /placeholder|generated|mockup/i);
});
