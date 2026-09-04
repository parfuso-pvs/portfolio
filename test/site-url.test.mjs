import assert from "node:assert/strict";
import test from "node:test";

import { normalizeSiteUrl } from "../src/lib/site-url.ts";

test("site URL normalization accepts a hostname without a protocol", () => {
  assert.equal(
    normalizeSiteUrl("www.philarfuso.me").toString(),
    "https://www.philarfuso.me/",
  );
});

test("site URL normalization preserves explicit protocols", () => {
  assert.equal(
    normalizeSiteUrl("https://www.philarfuso.me").toString(),
    "https://www.philarfuso.me/",
  );
  assert.equal(
    normalizeSiteUrl("http://localhost:3000").toString(),
    "http://localhost:3000/",
  );
});

test("site URL normalization trims deployment-variable whitespace", () => {
  assert.equal(
    normalizeSiteUrl("  www.philarfuso.me  ").toString(),
    "https://www.philarfuso.me/",
  );
});
