import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pagePath = "src/app/contact/page.tsx";
const componentPath = "src/components/contact/contact-narrative.tsx";
const contentPath = "src/content/contact.ts";

test("the Contact route composes a dedicated registry-backed narrative", async () => {
  const [page, component] = await Promise.all([
    readFile(pagePath, "utf8"),
    readFile(componentPath, "utf8"),
  ]);

  assert.match(page, /<ContactNarrative \/>/);
  assert.match(component, /contactContent\.channels\.map/);
  assert.match(component, /contactContent\.fit\.items\.map/);
});

test("professional contact channels are direct and verified", async () => {
  const content = await readFile(contentPath, "utf8");

  assert.match(content, /mailto:arfusop@gmail\.com/);
  assert.match(content, /https:\/\/www\.linkedin\.com\/in\/phil-arfuso/);
  assert.match(content, /https:\/\/github\.com\/parfuso-pvs/);
  assert.equal((content.match(/external: true/g) ?? []).length, 2);
});

test("the Contact page protects private details and makes no availability promise", async () => {
  const sources = await Promise.all(
    [pagePath, componentPath, contentPath].map((filePath) => readFile(filePath, "utf8")),
  );
  const source = sources.join("\n");

  assert.doesNotMatch(source, /201[ -]?638|Cliffside Park|07010/);
  assert.doesNotMatch(source, /currently available|available for work|open to work/i);
  assert.doesNotMatch(source, /resume\.pdf/);
});

test("the Contact experience is semantic, responsive, and server rendered", async () => {
  const component = await readFile(componentPath, "utf8");

  assert.doesNotMatch(component, /"use client"/);
  assert.match(component, /<main id="main-content"/);
  assert.equal((component.match(/<section/g) ?? []).length, 3);
  assert.match(component, /<h1/);
  assert.match(component, /<ol/);
  assert.match(component, /min-h-36/);
  assert.match(component, /focus-visible:bg-accent/);
  assert.match(component, /max-w-\[90rem\]/);
});
