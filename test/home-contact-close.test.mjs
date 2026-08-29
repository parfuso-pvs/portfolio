import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const homePagePath = "src/app/page.tsx";
const contactPath = "src/components/home/home-contact.tsx";

test("the homepage ends with a concise role-focused contact close", async () => {
  const [homePage, contact] = await Promise.all([
    readFile(homePagePath, "utf8"),
    readFile(contactPath, "utf8"),
  ]);

  assert.match(homePage, /<HomeContact \/>/);
  assert.match(contact, /frontend, full-stack web, or mobile development roles/);
  assert.doesNotMatch(contact, /hard problem|complexity with consequences|refuses to stay simple/i);
});

test("the contact close is semantic, direct, and server rendered", async () => {
  const contact = await readFile(contactPath, "utf8");

  assert.doesNotMatch(contact, /"use client"/);
  assert.match(contact, /<section/);
  assert.match(contact, /aria-labelledby="home-contact-title"/);
  assert.match(contact, /<h2/);
  assert.match(contact, /contactContent\.channels\[0\]/);
  assert.match(contact, /contactContent\.channels\[1\]/);
  assert.match(contact, /target="_blank"/);
  assert.equal((contact.match(/min-h-11/g) ?? []).length, 2);
});

test("the unpublished resume is not exposed as a broken or private asset", async () => {
  const contact = await readFile(contactPath, "utf8");

  assert.doesNotMatch(contact, /href="\/resume\.pdf"/);
  assert.match(contact, /private contact details are removed/);
});
