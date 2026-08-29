import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const homePagePath = "src/app/page.tsx";
const contactClosePath = "src/components/home/simple-contact.tsx";

test("the homepage ends with a simple role-focused contact close", async () => {
  const [homePage, contactClose] = await Promise.all([
    readFile(homePagePath, "utf8"),
    readFile(contactClosePath, "utf8"),
  ]);

  assert.match(homePage, /<SimpleContact \/>/);
  assert.match(contactClose, /What I&apos;m looking for/);
  assert.match(contactClose, /Frontend, full-stack web, or mobile development roles/);
  assert.doesNotMatch(contactClose, /hard problem|make the complex feel clear/i);
});

test("the contact close is semantic and server rendered", async () => {
  const contactClose = await readFile(contactClosePath, "utf8");

  assert.doesNotMatch(contactClose, /"use client"/);
  assert.match(contactClose, /<section/);
  assert.match(contactClose, /aria-labelledby="home-contact-title"/);
  assert.match(contactClose, /<h2/);
  assert.doesNotMatch(contactClose, /material-blueprint|bg-media-backdrop/);
});

test("the contact close provides real internal paths and interaction states", async () => {
  const contactClose = await readFile(contactClosePath, "utf8");

  assert.match(contactClose, /href="\/contact"/);
  assert.match(contactClose, /href="\/about"/);
  assert.match(contactClose, /min-h-11/);
  assert.match(contactClose, /hover:text-accent/);
  assert.match(contactClose, /focus-visible:text-accent/);
  assert.match(contactClose, /active:text-accent-strong/);
  assert.doesNotMatch(contactClose, /mailto:|tel:|linkedin\.com|github\.com/);
});
