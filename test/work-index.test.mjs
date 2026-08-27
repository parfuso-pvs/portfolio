import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const workPagePath = "src/app/work/page.tsx";
const projectCardPath = "src/components/work/project-index-card.tsx";

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
  assert.match(projectCard, /Light \/ composition \/ story/);
});
