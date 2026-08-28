import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const componentPath = "src/components/case-study/iffers-pictures-public-proof.tsx";
const contentPath = "src/content/case-studies/iffers-pictures-public-proof.ts";
const pagePath = "src/app/work/iffers-pictures/page.tsx";
const projectsPath = "src/content/projects.ts";

test("the Iffer's Pictures route includes registry-backed public-site proof", async () => {
  const [page, component, projects] = await Promise.all([
    readFile(pagePath, "utf8"),
    readFile(componentPath, "utf8"),
    readFile(projectsPath, "utf8"),
  ]);

  assert.match(page, /<IffersPicturesPublicProof project=\{project\} \/>/);
  assert.match(projects, /publicUrl: "https:\/\/ifferspictures\.com"/);
  assert.match(component, /href=\{project\.publicUrl\}/);
  assert.match(component, /project\.proofPoints\[0\]/);
  assert.match(component, /project\.ownership/);
});

test("the live-project link communicates external navigation and interaction states", async () => {
  const [component, content] = await Promise.all([
    readFile(componentPath, "utf8"),
    readFile(contentPath, "utf8"),
  ]);

  assert.match(component, /target="_blank"/);
  assert.match(component, /rel="noreferrer"/);
  assert.match(component, /opens in a new tab/);
  assert.match(content, /Opens the original project in a new tab/);
  assert.match(component, /hover:-translate-y-1/);
  assert.match(component, /focus-visible:-translate-y-1/);
  assert.match(component, /active:translate-y-0/);
  assert.match(component, /min-h-44/);
});

test("the public proof remains static, responsive, and separate from case completion", async () => {
  const [component, page, projects] = await Promise.all([
    readFile(componentPath, "utf8"),
    readFile(pagePath, "utf8"),
    readFile(projectsPath, "utf8"),
  ]);

  assert.doesNotMatch(component, /"use client"/);
  assert.match(component, /lg:grid-cols-12/);
  assert.match(component, /lg:col-start-9/);
  assert.match(component, /lg:-mt-12/);
  assert.doesNotMatch(page, /CaseStudyNavigation/);
  assert.match(projects, /id: "iffers-pictures"[\s\S]*?caseStudyStatus: "intro"/);
});
