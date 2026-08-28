import assert from "node:assert/strict";
import { stat, readFile } from "node:fs/promises";
import test from "node:test";

const assetPath = "public/images/domani/today-screen.png";
const contentPath = "src/content/case-studies/domani-media.ts";
const componentPath = "src/components/case-study/domani-product-media.tsx";
const pagePath = "src/app/work/domani/page.tsx";

test("the Domani route includes one verified production product view", async () => {
  const [page, component, asset] = await Promise.all([
    readFile(pagePath, "utf8"),
    readFile(componentPath, "utf8"),
    stat(assetPath),
  ]);

  assert.match(page, /<DomaniProductMedia \/>/);
  assert.match(component, /src="\/images\/domani\/today-screen\.png"/);
  assert.match(component, /width=\{1008\}/);
  assert.match(component, /height=\{2126\}/);
  assert.ok(asset.size > 100_000);
});

test("the product screenshot has an informative registry-backed text equivalent", async () => {
  const [content, component] = await Promise.all([
    readFile(contentPath, "utf8"),
    readFile(componentPath, "utf8"),
  ]);

  assert.match(component, /alt=\{domaniProductMedia\.alt\}/);
  assert.match(content, /daily progress summary/);
  assert.match(content, /top-priority task/);
  assert.match(content, /category and priority labels/);
  assert.match(component, /<figure/);
  assert.match(component, /<figcaption/);
});

test("the media copy preserves production and analytics boundaries", async () => {
  const [content, component] = await Promise.all([
    readFile(contentPath, "utf8"),
    readFile(componentPath, "utf8"),
  ]);
  const source = `${content}\n${component}`;

  assert.match(content, /Real public product media/);
  assert.match(content, /not portfolio analytics/);
  assert.doesNotMatch(source, /308|157|downloads|conversion rate/i);
  assert.doesNotMatch(component, /https:\/\/www\.domani-app\.com/);
});

test("the production view is responsive and does not load as a client component", async () => {
  const component = await readFile(componentPath, "utf8");

  assert.doesNotMatch(component, /"use client"/);
  assert.match(component, /lg:grid-cols-12/);
  assert.match(component, /max-w-full/);
  assert.match(component, /sizes="\(min-width: 1024px\)/);
  assert.match(component, /sm:grid-cols-\[3rem_minmax\(0,1fr\)\]/);
});
