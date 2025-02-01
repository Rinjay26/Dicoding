// index.test.js
import test from "node:test";
import assert from "node:assert";
import { sum } from "./index.js";

test("sum function should return the correct sum of two numbers", () => {
  assert.strictEqual(sum(1, 2), 3, "1 + 2 should equal 3");
  assert.strictEqual(sum(-1, 1), 0, "-1 + 1 should equal 0");
  assert.strictEqual(sum(0, 0), 0, "0 + 0 should equal 0");
  assert.strictEqual(sum(2.5, 2.5), 5, "2.5 + 2.5 should equal 5");
});

test("sum function should handle negative numbers correctly", () => {
  assert.strictEqual(sum(-1, -1), -2, "-1 + -1 should equal -2");
  assert.strictEqual(sum(-5, 3), -2, "-5 + 3 should equal -2");
});

test("sum function should handle large numbers correctly", () => {
  assert.strictEqual(
    sum(1000000, 2000000),
    3000000,
    "1000000 + 2000000 should equal 3000000"
  );
});
