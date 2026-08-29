import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const layoutPath = "src/app/layout.tsx";
const routeFiles = [
  "src/app/work/earthcam/page.tsx",
  "src/app/work/memx/page.tsx",
  "src/app/work/domani/page.tsx",
  "src/app/work/iffers-pictures/page.tsx",
];
const standaloneRouteFiles = [
  "src/components/about/about-narrative.tsx",
  "src/components/contact/contact-narrative.tsx",
  "src/app/work/page.tsx",
];

test("the root layout is navigation-free and keeps its accessibility baseline", async () => {
  const layout = await readFile(layoutPath, "utf8");

  assert.doesNotMatch(layout, /SiteHeader|PrimaryNavigation|<nav/);
  assert.match(layout, /href="#main-content"/);
  assert.match(layout, /Skip to main content/);
  assert.doesNotMatch(layout, /"use client"/);
});

test("the career index links to durable detail routes", async () => {
  const projects = await readFile("src/content/projects.ts", "utf8");

  ["/work/earthcam", "/work/memx", "/work/domani", "/work/iffers-pictures"].forEach((href) =>
    assert.match(projects, new RegExp(`href: "${href}"`)),
  );
  await Promise.all(routeFiles.map((file) => access(file)));
});

test("detail pages provide a real return link to the career journey", async () => {
  const [backLink, frame] = await Promise.all([
    readFile("src/components/layout/back-to-journey.tsx", "utf8"),
    readFile("src/components/case-study/case-study-frame.tsx", "utf8"),
  ]);

  assert.match(backLink, /projectId \? `\/#experience-\$\{projectId\}` : "\/#experience"/);
  assert.match(backLink, /Back to the journey/);
  assert.match(backLink, /min-h-11/);
  assert.match(frame, /<BackToJourney projectId=\{project\.id\} \/>/);
});

test("standalone legacy routes retain a route back to the homepage journey", async () => {
  const routes = await Promise.all(standaloneRouteFiles.map((file) => readFile(file, "utf8")));

  routes.forEach((route) => assert.match(route, /<BackToJourney \/>/));
});
