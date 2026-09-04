import assert from "node:assert/strict";
import test from "node:test";
import vm from "node:vm";

import {
  createSiteBehaviourBootstrap,
  shouldEnableSiteBehaviour,
} from "../src/lib/sitebehaviour.ts";

const secret = "test-site-secret";

function runBootstrap({ capture = false, existingScript = null, storageError = null } = {}) {
  const appendedScripts = [];
  const storageWrites = [];
  const warnings = [];
  const errors = [];

  const context = {
    console: {
      error: (...args) => errors.push(args),
      warn: (...args) => warnings.push(args),
    },
    document: {
      createElement: () => ({}),
      getElementById: () => existingScript,
      head: {
        appendChild: (script) => appendedScripts.push(script),
      },
    },
    sessionStorage: {
      setItem: (...args) => {
        if (storageError) throw storageError;
        storageWrites.push(args);
      },
    },
    window: {
      location: {
        search: capture ? "?capture-sitebehaviour-heatmap" : "",
      },
    },
  };

  vm.runInNewContext(createSiteBehaviourBootstrap(secret), context);

  return { appendedScripts, context, errors, storageWrites, warnings };
}

test("SiteBehaviour is enabled only for production builds", () => {
  assert.equal(shouldEnableSiteBehaviour({ nodeEnv: "production" }), true);
  assert.equal(shouldEnableSiteBehaviour({ nodeEnv: "development" }), false);
  assert.equal(shouldEnableSiteBehaviour({ nodeEnv: "test" }), false);
});

test("SiteBehaviour bootstrap injects the tracker once with the expected secret", () => {
  const result = runBootstrap();

  assert.equal(result.appendedScripts.length, 1);
  assert.equal(result.appendedScripts[0].id, "site-behaviour-script-v2");
  assert.equal(
    result.appendedScripts[0].src,
    `https://sitebehaviour-cdn.fra1.cdn.digitaloceanspaces.com/index.min.js?sitebehaviour-secret=${secret}`,
  );
  assert.equal(result.context.window.sitebehaviourTrackingSecret, secret);
  assert.deepEqual(result.errors, []);

  assert.equal(runBootstrap({ existingScript: {} }).appendedScripts.length, 0);
});

test("heatmap storage failure does not prevent tracker injection", () => {
  const result = runBootstrap({
    capture: true,
    storageError: new Error("Storage unavailable"),
  });

  assert.equal(result.appendedScripts.length, 1);
  assert.equal(result.warnings.length, 1);
  assert.deepEqual(result.errors, []);
});

test("heatmap capture persists its session flag when storage is available", () => {
  const result = runBootstrap({ capture: true });

  assert.deepEqual(result.storageWrites, [["capture-sitebehaviour-heatmap", "_"]]);
});
