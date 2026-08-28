import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const { featuredProjects, getProject, projects, supportingProjects } =
  await import("../src/content/projects.ts");

test("the registry preserves unique project identity, hierarchy, and route ownership", () => {
  assert.equal(projects.length, 5);
  assert.equal(new Set(projects.map(({ id }) => id)).size, projects.length);
  assert.equal(new Set(featuredProjects.map(({ href }) => href)).size, featuredProjects.length);
  assert.deepEqual(
    featuredProjects.map(({ id }) => id),
    ["memx", "domani", "iffers-pictures"],
  );
  assert.deepEqual(
    supportingProjects.map(({ id, href }) => [id, href]),
    [
      ["pixelverse-studios", null],
      ["earthcam", null],
    ],
  );
});

test("MEMX content protects confidentiality and ownership attribution", () => {
  const memx = getProject("memx");

  assert.equal(memx.caseStudyStatus, "published");
  assert.equal(memx.mediaPolicy.strategy, "original-diagrams-only");
  ["Private screenshots", "Reconstructed interfaces", "Fake exchange data"].forEach((rule) =>
    assert.ok(memx.mediaPolicy.prohibited.includes(rule)),
  );
  assert.match(memx.attribution, /scaffolded by Phil's manager/);
  assert.match(memx.ownership, /frontend configuration architecture/);
});

test("Domani metrics retain evidence and roadmap boundaries", () => {
  const domani = getProject("domani");

  assert.ok(domani.metrics.length > 0);
  assert.equal(domani.snapshotDate, "2026-08-26");
  domani.metrics.forEach((metric) => {
    assert.equal("snapshotDate" in metric, false);
    assert.ok(metric.source);
    assert.ok(metric.detail);
  });
  assert.deepEqual(domani.roadmap, ["Nested checklists", "Bullet lists", "Planning templates"]);
  domani.roadmap.forEach((feature) => assert.ok(!domani.approvedFeatures.includes(feature)));
  assert.ok(domani.mediaPolicy.prohibited.includes("Unsupported conversion rates"));
});

test("Iffer's and PixelVerse attribution remain explicit", () => {
  const iffers = getProject("iffers-pictures");
  const pixelverse = getProject("pixelverse-studios");

  assert.match(iffers.ownership, /independently owned discovery, copy, visual design/);
  assert.match(pixelverse.summary, /after-hours studio/);
  assert.match(pixelverse.attribution, /Sami leads design and Phil leads development/);
  assert.match(pixelverse.attribution, /Iffer's Pictures is the exception/);
});

test("navigation and featured routes consume the project registry", async () => {
  const [navigation, memxPage, domaniPage, iffersPage] = await Promise.all([
    readFile("src/content/navigation.ts", "utf8"),
    readFile("src/app/work/memx/page.tsx", "utf8"),
    readFile("src/app/work/domani/page.tsx", "utf8"),
    readFile("src/app/work/iffers-pictures/page.tsx", "utf8"),
  ]);

  assert.match(navigation, /import \{ featuredProjects \} from "@\/content\/projects"/);
  assert.doesNotMatch(navigation, /href: "\/work\/(?:memx|domani|iffers-pictures)"/);
  [memxPage, domaniPage, iffersPage].forEach((page) => {
    assert.match(page, /getProject\(/);
    assert.match(page, /title: project\.name/);
    assert.match(page, /description: project\.metaDescription/);
  });
});
