import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("CI installs from the lockfile and runs the local verification command", async () => {
  const workflow = await readFile(".github/workflows/verify.yml", "utf8");

  assert.match(workflow, /node-version: 24/);
  assert.match(workflow, /run: npm ci/);
  assert.match(workflow, /run: npm run verify/);
});

test("the supported local runtime matches the CI runtime", async () => {
  const [nvmVersion, packageJson] = await Promise.all([
    readFile(".nvmrc", "utf8"),
    readFile("package.json", "utf8").then(JSON.parse),
  ]);

  assert.equal(nvmVersion.trim(), "24");
  assert.equal(packageJson.engines.node, ">=24.0.0");
  assert.equal(packageJson.packageManager, "npm@11.11.0");
});
