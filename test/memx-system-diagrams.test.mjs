import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const contentPath = "src/content/case-studies/memx-diagrams.ts";
const diagramPath = "src/components/case-study/memx-system-diagrams.tsx";
const pagePath = "src/app/work/memx/page.tsx";

test("the MEMX route includes two original system diagrams", async () => {
  const [page, diagrams] = await Promise.all([
    readFile(pagePath, "utf8"),
    readFile(diagramPath, "utf8"),
  ]);

  assert.match(page, /<MemxSystemDiagrams \/>/);
  assert.doesNotMatch(diagrams, /"use client"/);
  assert.equal((diagrams.match(/<figure/g) ?? []).length, 2);
  assert.equal((diagrams.match(/<figcaption/g) ?? []).length, 2);
  assert.match(diagrams, /memxSystemDiagrams/);
});

test("both figures provide visible context and registry-backed text equivalents", async () => {
  const [content, diagrams] = await Promise.all([
    readFile(contentPath, "utf8"),
    readFile(diagramPath, "utf8"),
  ]);

  assert.equal((content.match(/accessibleDescription:/g) ?? []).length, 2);
  assert.match(diagrams, /aria-labelledby="memx-configuration-title"/);
  assert.match(
    diagrams,
    /aria-describedby="memx-configuration-summary memx-configuration-description"/,
  );
  assert.match(diagrams, /aria-labelledby="memx-realtime-title"/);
  assert.match(diagrams, /aria-describedby="memx-realtime-summary memx-realtime-description"/);
  assert.match(diagrams, /className="sr-only"/);
  assert.equal((diagrams.match(/aria-hidden="true"/g) ?? []).length, 3);
});

test("diagram content preserves ownership and confidentiality boundaries", async () => {
  const content = await readFile(contentPath, "utf8");

  assert.match(content, /database supplied configuration/);
  assert.match(content, /market-specific classes handled rules and methods that could not be shared/);
  assert.match(content, /Phil's frontend system translated that context/);
  assert.match(content, /missing or malformed values/);
  assert.doesNotMatch(
    content,
    /order book|matching engine|bid price|ask price|shares|payload schema/i,
  );
});

test("diagram layouts collapse from horizontal flows to vertical mobile paths", async () => {
  const diagrams = await readFile(diagramPath, "utf8");

  assert.match(diagrams, /lg:grid-cols-12/);
  assert.match(diagrams, /lg:grid-cols-5/);
  assert.match(diagrams, /lg:grid-cols-3/);
  assert.match(diagrams, /border-l border-accent/);
  assert.match(diagrams, /text-accent-on-dark/);
});
