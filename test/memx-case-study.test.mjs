import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const page = readFileSync("src/app/work/memx/page.tsx", "utf8");
const content = readFileSync("src/content/case-studies/memx.ts", "utf8");
const diagrams = readFileSync(
  "src/components/case-study/memx-diagrams.tsx",
  "utf8",
);
const projects = readFileSync("src/content/projects.ts", "utf8");
const css = readFileSync("src/app/globals.css", "utf8");

test("MEMX case study preserves the approved market scale", () => {
  assert.match(content, /One equities market and two options markets/);
  assert.match(content, /One crypto market and four equities markets/);
  assert.match(content, /total: "8"/);
  assert.match(page, /className="case-configuration-scale"/);
});

test("MEMX framing leads with the breadth of the work", () => {
  assert.match(content, /Member and operations tools/);
  assert.match(content, /Reusable frontend systems/);
  assert.match(content, /APIs, data, and production delivery/);
  assert.match(page, /className="case-contributions"/);
  assert.match(projects, /Portal tooling/);
  assert.match(projects, /Full-stack systems/);
  assert.match(projects, /Production platform/);
});

test("MEMX case study explains the portal tools before the architecture", () => {
  assert.match(content, /What I built in the portal/);
  assert.match(content, /Ports/);
  assert.match(content, /Risk settings/);
  assert.match(content, /Institution switching/);
  assert.match(content, /Exchange members/);
  assert.match(content, /Market operations/);
  assert.match(page, /className="case-portal"/);
});

test("MEMX case study attributes the shared architecture accurately", () => {
  assert.match(
    content,
    /my manager scaffolded a database-driven market architecture/,
  );
  assert.match(content, /I built the corresponding frontend configuration system/);
});

test("MEMX diagrams explain real relationships without private market data", () => {
  assert.match(diagrams, /Database configuration/);
  assert.match(diagrams, /Market-specific classes/);
  assert.match(diagrams, /sanitized request/i);
  assert.doesNotMatch(diagrams, /order book|matching engine|price|quantity/i);
  assert.match(
    css,
    /\.configuration-output\s*\{[\s\S]*?display: grid;[\s\S]*?grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/,
  );
  assert.doesNotMatch(css, /\.configuration-output\s*\{\s*display: contents/);
});

test("MEMX case study does not showcase the live IPO feature", () => {
  assert.doesNotMatch(content, /IPO|WebSocket/i);
  assert.doesNotMatch(page, /realtime|MemxRealtimeDiagram/i);
  assert.doesNotMatch(diagrams, /IPO|WebSocket|MemxRealtimeDiagram/i);
});

test("MEMX case study ends without a generic production-work section", () => {
  assert.doesNotMatch(content, /practice:\s*\{/);
  assert.doesNotMatch(page, /case-practice|study\.practice/);
});

test("MEMX route is discoverable and diagrams have text alternatives", () => {
  assert.match(projects, /route: "\/work\/memx"/);
  assert.match(page, /MemxConfigurationDiagram/);
  assert.match(diagrams, /<figcaption>/);
  assert.match(diagrams, /className="sr-only"/);
});
