import { describe, expect, test } from "bun:test";
import { matchChordExpressionMarkdown } from "./matchChordProgressionMarkdown";
import { ng, ok } from "./matchChordProgressionMarkdown.fixtures";

describe("matchChordExpressionMarkdown", () => {
  test.each(ok)("問題ない: %s", (target) => {
    expect(matchChordExpressionMarkdown(target)).toBe(true);
  });

  test.each(ng)("問題あり: %s", (target) => {
    expect(matchChordExpressionMarkdown(target)).toBe(false);
  });
});
