import { describe, expect, test } from "bun:test";
import { matchChordExpressionMarkdown } from "./matchChordProgressionMarkdown";
import { ng, ok } from "./matchChordProgressionMarkdown.spec.fixtures";

describe("matchChordExpressionMarkdown", () => {
  test.each(ok)("問題ない: %o", (target) => {
    target.values.forEach((value) => {
      expect(matchChordExpressionMarkdown(value)).toBe(true);
    });
  });

  test.each(ng)("問題あり: %o", (target) => {
    target.values.forEach((value) => {
      expect(matchChordExpressionMarkdown(value)).toBe(false);
    });
  });
});
