import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

const [
  orchestrator,
  layout,
  css,
  home,
  work,
  resume,
  contact,
  notFound,
  memx,
  domani,
  iffers,
  selectedWork,
  memxDiagrams,
  iffersGallery,
] = await Promise.all([
  read("src/components/motion/motion-orchestrator.tsx"),
  read("src/app/layout.tsx"),
  read("src/app/globals.css"),
  read("src/app/page.tsx"),
  read("src/app/work/page.tsx"),
  read("src/app/resume/page.tsx"),
  read("src/app/contact/page.tsx"),
  read("src/app/not-found.tsx"),
  read("src/app/work/memx/page.tsx"),
  read("src/app/work/domani/page.tsx"),
  read("src/app/work/iffers-pictures/page.tsx"),
  read("src/components/selected-work.tsx"),
  read("src/components/case-study/memx-diagrams.tsx"),
  read("src/components/case-study/iffers-gallery.tsx"),
]);

test("motion is orchestrated by one lightweight route-aware observer", () => {
  assert.match(orchestrator, /^"use client";/);
  assert.match(orchestrator, /usePathname/);
  assert.match(orchestrator, /IntersectionObserver/);
  assert.match(orchestrator, /prefers-reduced-motion: reduce/);
  assert.match(orchestrator, /observer\?\.unobserve/);
  assert.match(orchestrator, /groupChildren\.forEach/);
  assert.match(orchestrator, /element\.matches\(revealSelector\)/);
  assert.match(orchestrator, /revealImmediately\(children\)/);
  assert.match(
    orchestrator,
    /requestAnimationFrame\(\(\) => \{\s*secondFrame = window\.requestAnimationFrame\(startObserving\)/,
  );
  assert.match(orchestrator, /cancelAnimationFrame\(firstFrame\)/);
  assert.match(orchestrator, /cancelAnimationFrame\(secondFrame\)/);
  assert.doesNotMatch(orchestrator, /addEventListener\(["']scroll/);
  assert.match(layout, /<MotionOrchestrator \/>/);
});

test("fixed project navigation never depends on viewport intersection", async () => {
  const navigator = await read("src/components/case-study/case-study-navigator.tsx");

  assert.match(navigator, /className="case-navigator"/);
  assert.doesNotMatch(navigator, /data-reveal/);
});

test("every route opts into element-level choreography", () => {
  for (const route of [home, work, resume, contact, notFound, memx, domani, iffers]) {
    assert.match(route, /data-reveal/);
    assert.match(route, /data-reveal-group/);
  }
});

test("project rows, diagrams, and photography use staggered reveal primitives", () => {
  for (const component of [selectedWork, memxDiagrams, iffersGallery]) {
    assert.match(component, /data-reveal/);
    assert.match(component, /data-reveal-stagger/);
  }
});

test("MEMX role progression reveals each row without masking the list", () => {
  assert.match(
    memx,
    /className="case-phase-list" data-reveal-group data-reveal-stagger="80">[\s\S]*?className="case-phase" data-reveal="soft"/,
  );
  assert.doesNotMatch(memx, /className="case-phase-list" data-reveal=/);
});

test("work badges and case-study links retain reveal transitions alongside hover motion", () => {
  assert.doesNotMatch(selectedWork, /className="work-entry-copy"\s+data-reveal=/);
  assert.match(
    selectedWork,
    /className="work-scope"[\s\S]*?data-reveal-stagger="55"[\s\S]*?<li data-reveal="soft"/,
  );
  assert.match(selectedWork, /className="work-case-link" data-reveal="soft"/);
  assert.match(css, /\.work-scope li\s*\{[\s\S]*?opacity 620ms[\s\S]*?translate 720ms/);
  assert.match(css, /\.work-case-link\s*\{[\s\S]*?opacity 620ms[\s\S]*?translate 720ms/);
  assert.match(css, /\.work-scope li:hover::before[\s\S]*?scaleX\(1\)/);
  assert.match(css, /\.work-case-link:hover::before[\s\S]*?scaleY\(1\)/);
});

test("contact options combine reveal, hover, and keyboard-focus motion", () => {
  assert.match(contact, /className="contact-channel"[\s\S]*?data-reveal="soft"/);
  assert.match(css, /\.contact-channel\s*\{[\s\S]*?opacity 620ms[\s\S]*?translate 720ms/);
  assert.match(css, /\.contact-channel\s*\{[\s\S]*?padding-inline: clamp\(18px, 2vw, 26px\)/);
  assert.match(contact, /className="contact-channel-foreground" aria-hidden="true"/);
  assert.match(css, /\.contact-channel::before[\s\S]*?clip-path 800ms cubic-bezier/);
  assert.match(css, /\.contact-channel-foreground[\s\S]*?clip-path 800ms cubic-bezier/);
  assert.match(css, /\.contact-channel:hover::before,[\s\S]*?\.contact-channel:hover \.contact-channel-foreground[\s\S]*?clip-path: inset\(0\)/);
  assert.match(css, /\.contact-channel:focus-visible::before,[\s\S]*?\.contact-channel:focus-visible \.contact-channel-foreground[\s\S]*?clip-path: inset\(0\)/);
  assert.doesNotMatch(css, /\.contact-channel:hover\s*\{[^}]*padding-inline/);
  assert.doesNotMatch(css, /\.contact-channel:hover\s*\{[^}]*\n\s+color:/);
});

test("resume lists reveal their individual items instead of masking whole blocks", () => {
  assert.match(
    resume,
    /className="resume-role" data-reveal-group[\s\S]*?<ul data-reveal-group data-reveal-stagger="55">[\s\S]*?<li data-reveal="soft"/,
  );
  assert.match(
    resume,
    /resume\.technologies\.map[\s\S]*?<ul data-reveal-group data-reveal-stagger="42">[\s\S]*?<li data-reveal="soft"/,
  );
  assert.match(
    resume,
    /resume\.ventures\.map[\s\S]*?<ul data-reveal-group data-reveal-stagger="55">[\s\S]*?<li data-reveal="soft"/,
  );
  assert.doesNotMatch(resume, /className="resume-role" data-reveal=/);
  assert.doesNotMatch(resume, /className="resume-role-list" data-reveal=/);
});

test("reveal CSS preserves existing transforms and reduced-motion access", () => {
  assert.match(css, /\.motion-ready \[data-reveal\]/);
  assert.match(css, /translate: var\(--reveal-x\) var\(--reveal-y\)/);
  assert.match(css, /scale: var\(--reveal-scale\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /\.motion-ready \[data-reveal\][\s\S]*?translate: none/);
});
