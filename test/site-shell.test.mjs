import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const layoutPath = "src/app/layout.tsx";
const headerPath = "src/components/layout/site-header.tsx";
const navigationPath = "src/components/navigation/primary-navigation.tsx";
const navigationStylesPath = "src/components/navigation/primary-navigation.module.css";
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
  const [navigationData, projectData] = await Promise.all([
    readFile(navigationDataPath, "utf8"),
    readFile("src/content/projects.ts", "utf8"),
  ]);

  ["/work", "/about", "/contact"].forEach((href) =>
    assert.match(navigationData, new RegExp(`href: "${href}"`)),
  );
  ["/work/memx", "/work/domani", "/work/iffers-pictures"].forEach((href) =>
    assert.match(projectData, new RegExp(`href: "${href}"`)),
  );
  assert.match(navigationData, /featuredProjects\.map/);
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
  assert.match(navigation, /<PathAwareNavigation key=\{pathname\} pathname=\{pathname\} \/>/);
  assert.doesNotMatch(navigation, /openAtPath/);
  assert.match(navigation, /addEventListener\("pageshow", closeRestoredMenu\)/);
  assert.match(navigation, /addEventListener\("popstate", closeRestoredMenu\)/);
});

test("current destinations are conveyed semantically and visually", async () => {
  const navigation = await readFile(navigationPath, "utf8");

  assert.match(navigation, /aria-current=\{current \? "page" : undefined\}/);
  assert.match(navigation, /bg-accent-strong/);
  assert.match(navigation, /aria-hidden="true"/);
});

test("navigation motion is bounded, input-aware, and reduced-motion safe", async () => {
  const [navigation, navigationStyles] = await Promise.all([
    readFile(navigationPath, "utf8"),
    readFile(navigationStylesPath, "utf8"),
  ]);

  assert.match(navigation, /styles\.tabRegistration/);
  assert.match(navigation, /styles\.mobileSheet/);
  assert.match(navigation, /hover:bg-accent-strong.*: "hover:bg-paper-deep"/);
  assert.match(navigation, /hidden=\{!isOpen\}/);
  assert.doesNotMatch(navigation, /motion\/react|AnimatePresence|setTimeout/);
  assert.match(navigationStyles, /@media \(hover: hover\) and \(pointer: fine\)/);
  assert.match(navigationStyles, /@media \(prefers-reduced-motion: no-preference\)/);
  assert.match(navigationStyles, /animation: assemble-mobile-sheet/);
  assert.match(navigationStyles, /animation: register-current-tab/);
  assert.doesNotMatch(navigationStyles, /transition-property:.*(?:top|left|width|height)/);
});
