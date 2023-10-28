import { expect, test, describe } from "bun:test";
import { extractPaths } from "./extractPaths";

describe("extractPaths", () => {
  test("通常のオブジェクト", () => {
    const input = {
      a: {
        b: ["あ", "い", "う"],
        c: {
          d: ["え", "お"],
        },
      },
      e: ["か", "き", "く"],
    };
    const expected = [
      "a:b:あ",
      "a:b:い",
      "a:b:う",
      "a:c:d:え",
      "a:c:d:お",
      "e:か",
      "e:き",
      "e:く",
    ];

    const result = extractPaths(input);
    expect(result).toEqual(expected);
  });

  test("空オブジェクト", () => {
    const input = {};
    const expected: string[] = [];

    const result = extractPaths(input);
    expect(result).toEqual(expected);
  });
});
