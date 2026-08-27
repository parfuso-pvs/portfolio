import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const homePagePath = "src/app/page.tsx";
const contactClosePath = "src/components/home/home-contact-close.tsx";

test("the homepage ends with a dedicated contact close", async () => {
  const [homePage, contactClose] = await Promise.all([
    readFile(homePagePath, "utf8"),
    readFile(contactClosePath, "utf8"),
  ]);

  assert.match(homePage, /<HomeContactClose \/>/);
  assert.match(contactClose, /Open to the next hard problem/);
  assert.match(contactClose, /Let&apos;s make the complex feel clear/);
});

test("the contact close is semantic and server rendered", async () => {
  const contactClose = await readFile(contactClosePath, "utf8");

  assert.doesNotMatch(contactClose, /"use client"/);
  assert.match(contactClose, /<section/);
  assert.match(contactClose, /aria-labelledby="home-contact-title"/);
  assert.match(contactClose, /<h2/);
  assert.match(contactClose, /<footer/);
});

test("the contact close provides real internal paths and interaction states", async () => {
  const contactClose = await readFile(contactClosePath, "utf8");

  assert.match(contactClose, /href="\/contact"/);
  assert.match(contactClose, /href="\/about"/);
  assert.match(contactClose, /min-h-11/);
  assert.match(contactClose, /hover:bg-media-foreground/);
  assert.match(contactClose, /focus-visible:bg-media-foreground/);
  assert.match(contactClose, /active:bg-paper-deep/);
  assert.match(contactClose, /text-accent-on-dark/);
  assert.match(contactClose, /hover:text-accent-on-dark/);
  assert.match(contactClose, /focus-visible:text-accent-on-dark/);
  assert.doesNotMatch(contactClose, /mailto:|tel:|linkedin\.com|github\.com/);
});
