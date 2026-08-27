import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const layoutPath = "src/app/layout.tsx";
const headerPath = "src/components/layout/site-header.tsx";
const navigationPath = "src/components/navigation/primary-navigation.tsx";
const navigationDataPath = "src/content/navigation.ts";

const routeFiles = [
  "src/app/work/page.tsx",
  "src/app/work/memx/page.tsx",
  "src/app/work/domani/page.tsx",
  "src/app/work/iffers-pictures/page.tsx",
  "src/app/about/page.tsx",
  "src/app/contact/page.tsx",
];

test("the root layout mounts a shared server-rendered site header", async () => {
  const [layout, header] = await Promise.all([
    readFile(layoutPath, "utf8"),
    readFile(headerPath, "utf8"),
  ]);

  assert.match(layout, /<SiteHeader \/>/);
  assert.match(header, /<header/);
  assert.match(header, /href="\/"/);
  assert.doesNotMatch(layout, /"use client"/);
  assert.doesNotMatch(header, /"use client"/);
});

test("navigation destinations are centralized and every approved route exists", async () => {
  const navigationData = await readFile(navigationDataPath, "utf8");
  const expectedPaths = [
    "/work",
    "/work/memx",
    "/work/domani",
    "/work/iffers-pictures",
    "/about",
    "/contact",
  ];

  expectedPaths.forEach((href) => assert.match(navigationData, new RegExp(`href: "${href}"`)));
  await Promise.all(routeFiles.map((file) => access(file)));
});

test("the mobile navigation exposes disclosure and keyboard behavior", async () => {
  const navigation = await readFile(navigationPath, "utf8");

  assert.match(navigation, /^"use client";/);
  assert.match(navigation, /aria-controls="mobile-navigation"/);
  assert.match(navigation, /aria-expanded=\{isOpen\}/);
  assert.match(navigation, /event\.key !== "Escape"/);
  assert.match(navigation, /toggleRef\.current\?\.focus\(\)/);
  assert.match(navigation, /firstLinkRef\.current\?\.focus\(\)/);
  assert.match(navigation, /min-h-11/);
});

test("current destinations are conveyed semantically and visually", async () => {
  const navigation = await readFile(navigationPath, "utf8");

  assert.match(navigation, /aria-current=\{current \? "page" : undefined\}/);
  assert.match(navigation, /bg-accent-strong/);
  assert.match(navigation, /aria-hidden="true"/);
});
