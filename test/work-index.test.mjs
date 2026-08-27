import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const workPagePath = "src/app/work/page.tsx";
const projectCardPath = "src/components/work/project-index-card.tsx";
const { getProject } = await import("../src/content/projects.ts");

test("the Work Index is generated from the featured project registry", async () => {
  const workPage = await readFile(workPagePath, "utf8");

  assert.match(workPage, /import \{ featuredProjects \} from "@\/content\/projects"/);
  assert.match(workPage, /featuredProjects\.map/);
  assert.doesNotMatch(workPage, /MEMX|Domani|Iffer's Pictures/);
});

test("each project entry is a semantic, keyboard-accessible case-study link", async () => {
  const projectCard = await readFile(projectCardPath, "utf8");

  assert.match(projectCard, /<article/);
  assert.match(projectCard, /<Link/);
  assert.match(projectCard, /href=\{project\.href\}/);
  assert.match(projectCard, /<h2/);
  assert.match(projectCard, /focus-visible:outline/);
  assert.doesNotMatch(projectCard, /"use client"/);
});

test("project artifacts remain decorative and avoid prohibited media", async () => {
  const projectCard = await readFile(projectCardPath, "utf8");

  assert.equal(projectCard.match(/aria-hidden="true"/g)?.length, 4);
  assert.doesNotMatch(projectCard, /next\/image|<img|order book|matching engine/i);
  assert.doesNotMatch(
    projectCard,
    /08 \/ markets|Tomorrow \/ intentional|Top priority|Full ownership|Copy \/ design \/ code/,
  );
});

test("visible artifact copy is centralized with its project record", () => {
  assert.deepEqual(getProject("memx").artifactCopy, {
    accessibleDescription: "Eight market implementations supported from one evolving system.",
    primaryLabel: "08 / markets",
  });
  assert.equal(getProject("domani").artifactCopy.secondaryLabel, "Top priority");
  assert.equal(getProject("iffers-pictures").artifactCopy.secondaryLabel, "Full ownership");
});

test("every hidden visual artifact has a registry-backed text equivalent", async () => {
  const projectCard = await readFile(projectCardPath, "utf8");

  assert.match(projectCard, /aria-describedby=\{artifactDescriptionId\}/);
  assert.match(projectCard, /id=\{artifactDescriptionId\} className="sr-only"/);
  assert.match(projectCard, /project\.artifactCopy\.accessibleDescription/);
  ["memx", "domani", "iffers-pictures"].forEach((projectId) =>
    assert.ok(getProject(projectId).artifactCopy.accessibleDescription),
  );
});

test("keyboard focus receives the same artifact feedback as hover", async () => {
  const projectCard = await readFile(projectCardPath, "utf8");

  assert.match(projectCard, /group-focus-within:-translate-y-1/);
  assert.match(projectCard, /group-focus-within:-translate-y-2/);
  assert.match(projectCard, /group-focus-within:-rotate-1/);
  assert.match(projectCard, /group-focus-within:translate-x-1/);
});
