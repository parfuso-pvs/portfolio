import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const routeTransitionPath = "src/components/motion/route-view-transition.tsx";
const routeTransitionStylesPath = "src/styles/route-transitions.css";
const performancePath = "scripts/measure-motion-performance.mjs";
const routeFiles = [
  "src/app/page.tsx",
  "src/app/work/page.tsx",
  "src/app/work/memx/page.tsx",
  "src/app/work/domani/page.tsx",
  "src/app/work/iffers-pictures/page.tsx",
  "src/app/about/page.tsx",
  "src/app/contact/page.tsx",
];

test("every published page participates without expanding the client boundary", async () => {
  const [transition, ...routes] = await Promise.all([
    readFile(routeTransitionPath, "utf8"),
    ...routeFiles.map((file) => readFile(file, "utf8")),
  ]);

  assert.match(transition, /import \{ ViewTransition, type ReactNode \} from "react"/);
  assert.match(transition, /default="none"/);
  assert.match(transition, /"route-forward": "route-forward"/);
  assert.match(transition, /"route-back": "route-back"/);
  assert.match(transition, /"route-switch": "route-switch"/);
  assert.doesNotMatch(transition, /^"use client";/);

  routes.forEach((route) => {
    assert.match(route, /<RouteViewTransition>/);
    assert.doesNotMatch(route, /^"use client";/);
  });
});

test("route links communicate hierarchy while preserving native Next links", async () => {
  const [header, primaryNavigation, projectCard, caseFrame, caseNavigation, homeHero] =
    await Promise.all([
      readFile("src/components/layout/site-header.tsx", "utf8"),
      readFile("src/components/navigation/primary-navigation.tsx", "utf8"),
      readFile("src/components/work/project-index-card.tsx", "utf8"),
      readFile("src/components/case-study/case-study-frame.tsx", "utf8"),
      readFile("src/components/case-study/case-study-navigation.tsx", "utf8"),
      readFile("src/components/home/home-hero.tsx", "utf8"),
    ]);

  assert.match(header, /data-site-header/);
  assert.match(header, /viewTransitionName: "site-header"/);
  assert.match(header, /transitionTypes=\{\["route-back"\]\}/);
  assert.match(primaryNavigation, /pathname\.startsWith\(`\$\{item\.href\}\/`\)/);
  assert.match(primaryNavigation, /\["route-back"\].*\["route-switch"\]/s);
  assert.match(projectCard, /transitionTypes=\{\["route-forward"\]\}/);
  assert.match(caseFrame, /transitionTypes=\{\["route-back"\]\}/);
  assert.match(caseNavigation, /transitionTypes=\{\["route-switch"\]\}/);
  assert.match(caseNavigation, /transitionTypes=\{\["route-back"\]\}/);
  assert.match(homeHero, /transitionTypes=\{\["route-forward"\]\}/);
  assert.match(homeHero, /transitionTypes=\{\["route-switch"\]\}/);
});

test("route transition CSS is bounded, interactive, and reduced-motion safe", async () => {
  const styles = await readFile(routeTransitionStylesPath, "utf8");

  assert.match(styles, /::view-transition \{\s*pointer-events: none/);
  assert.match(styles, /::view-transition-group\(site-header\)/);
  assert.match(styles, /::view-transition-old\(\.route-forward\)/);
  assert.match(styles, /::view-transition-new\(\.route-back\)/);
  assert.match(styles, /::view-transition-new\(\.route-switch\)/);
  assert.match(styles, /translate3d/);
  assert.match(styles, /opacity/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(styles, /animation-duration: 0s !important/);
  assert.match(styles, /animation-delay: 0s !important/);
  assert.doesNotMatch(styles, /(?:top|left|width|height):[^;]+;/);
});

test("the production probe validates a real route transition", async () => {
  const performanceProbe = await readFile(performancePath, "utf8");

  assert.match(performanceProbe, /"route-navigation"/);
  assert.match(performanceProbe, /measureRouteNavigation/);
  assert.match(performanceProbe, /nav\[aria-label=\"Homepage actions\"\]/);
  assert.match(performanceProbe, /routeState\.pathname !== "\/work"/);
  assert.match(performanceProbe, /mainLandmarks !== 1/);
  assert.match(performanceProbe, /siteHeaders !== 1/);
});
