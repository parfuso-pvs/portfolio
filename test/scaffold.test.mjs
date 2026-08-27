import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const requiredApplicationFiles = [
  "src/app/globals.css",
  "src/app/layout.tsx",
  "src/app/page.tsx",
];

test("the App Router foundation includes its required application files", async () => {
  await Promise.all(requiredApplicationFiles.map((file) => access(file)));
});

test("the package contract exposes the required verification commands", async () => {
  const packageJson = JSON.parse(await readFile("package.json", "utf8"));

  assert.deepEqual(
    ["dev", "lint", "typecheck", "test", "build", "verify"].filter(
      (script) => !packageJson.scripts?.[script],
    ),
    [],
  );
  assert.match(packageJson.scripts.verify, /npm run test/);
});
