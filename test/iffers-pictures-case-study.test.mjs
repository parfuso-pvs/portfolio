import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const page = readFileSync("src/app/work/iffers-pictures/page.tsx", "utf8");
const content = readFileSync(
  "src/content/case-studies/iffers-pictures.ts",
  "utf8",
);
const gallery = readFileSync(
  "src/components/case-study/iffers-gallery.tsx",
  "utf8",
);
const projects = readFileSync("src/content/projects.ts", "utf8");
const themes = readFileSync("src/app/case-study-themes.css", "utf8");

const approvedPhotos = [
  "maternity-session.jpg",
  "family-session.jpg",
  "engagement-detail.jpg",
  "baby-shower-details.jpg",
];

test("Iffer’s Pictures states the approved ownership and attribution", () => {
  assert.match(content, /Christmas gift for my sister-in-law/);
  assert.match(content, /exception to the normal PixelVerse partnership/);
  assert.match(content, /visual design as well as the discovery, copy, code/);
  assert.match(content, /created the brand/);
  assert.match(content, /palette, typography, visual direction, and site design/);
});

test("Iffer’s Pictures uses only the approved production photography", () => {
  for (const photo of approvedPhotos) {
    assert.equal(
      existsSync(`public/images/iffers-pictures/${photo}`),
      true,
      `${photo} should exist`,
    );
    assert.match(content, new RegExp(photo.replace(".", "\\.")));
  }
  assert.match(gallery, /alt=\{image\.alt\}/);
  assert.match(gallery, /image\.id === "family" \? "eager" : "lazy"/);
  assert.match(gallery, /unoptimized=\{image\.id === "family"\}/);
  assert.match(content, /photography remains the client’s work/i);
});

test("Iffer’s Pictures avoids unsupported business-performance claims", () => {
  assert.doesNotMatch(content, /conversion|revenue|traffic|ranking|performance metric/i);
});

test("Iffer’s Pictures route and transparent public link are implemented", () => {
  assert.match(projects, /route: "\/work\/iffers-pictures"/);
  assert.match(content, /https:\/\/ifferspictures\.com/);
  assert.match(page, /target="_blank"/);
  assert.match(page, /opens in a new tab/);
  assert.match(page, /IffersGallery/);
});

test("Iffer’s Pictures uses its project-scoped photographic theme", () => {
  assert.match(page, /SiteHeader tone="dark"/);
  assert.match(page, /iffers-origin-intro/);
  assert.match(themes, /\.case-study-iffers\s*\{/);
  assert.match(themes, /--case-ink: #302925/);
  assert.match(themes, /--case-highlight: #98563d/);
  assert.match(themes, /CONTACT SHEET \/ PRODUCTION PHOTOGRAPHY/);
});
