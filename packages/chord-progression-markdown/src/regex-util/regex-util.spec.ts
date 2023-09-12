import { describe, expect, test } from "bun:test";
import {
  matchWholeString,
  maybeSpaceAround,
  optional,
  orMore,
  withAround,
  zeroOrMore,
  withParentheses,
  withBarAround,
  csv,
  sand,
} from "./regex-util";
import { escapeStringRegexp } from "./escapeStringRegexp";

describe("matchWholeString", () => {
  test("全体にマッチする", () => {
    expect(
      new RegExp(matchWholeString(escapeStringRegexp("abc"))).test("abc")
    ).toBe(true);
  });

  test("一部だとマッチしない", () => {
    expect(
      new RegExp(matchWholeString(escapeStringRegexp("a"))).test("abc")
    ).toBe(false);
    expect(
      new RegExp(matchWholeString(escapeStringRegexp("b"))).test("abc")
    ).toBe(false);
    expect(
      new RegExp(matchWholeString(escapeStringRegexp("c"))).test("abc")
    ).toBe(false);
    expect(
      new RegExp(matchWholeString(escapeStringRegexp("bc"))).test("abc")
    ).toBe(false);
    expect(
      new RegExp(matchWholeString(escapeStringRegexp("ab"))).test("abc")
    ).toBe(false);
  });
});

describe("optional", () => {
  test("あってもOK", () => {
    expect(new RegExp("a" + optional(escapeStringRegexp("b"))).test("ab")).toBe(
      true
    );
  });

  test("無くてもOK", () => {
    expect(new RegExp("a" + optional(escapeStringRegexp("b"))).test("a")).toBe(
      true
    );
  });
});

describe("orMore", () => {
  test("0指定なら0個でもOK", () => {
    expect(new RegExp(orMore(escapeStringRegexp("a"), 0)).test("")).toBe(true);
  });

  test("1指定なら1個以上必要", () => {
    expect(new RegExp(orMore(escapeStringRegexp("a"), 1)).test("")).toBe(false);
    expect(new RegExp(orMore(escapeStringRegexp("a"), 1)).test("a")).toBe(true);
  });

  test("（delimiterの指定）2つ以上ある場合はdelimiterで区切られた文字列の繰り返しになる", () => {
    expect(
      new RegExp(
        orMore(escapeStringRegexp("a"), 1, {
          delimiter: escapeStringRegexp(","),
        })
      ).test("a,")
    ).toBe(false);

    expect(
      new RegExp(
        orMore(escapeStringRegexp("a"), 0, {
          delimiter: escapeStringRegexp(","),
        })
      ).test("a,a")
    ).toBe(true);
    expect(
      new RegExp(
        orMore(escapeStringRegexp("a"), 1, {
          delimiter: escapeStringRegexp(","),
        })
      ).test("a,a")
    ).toBe(true);
  });

  test("（parenthesesの指定）parenthesesで囲まれた文字列の繰り返しになる", () => {
    expect(
      new RegExp(
        orMore(escapeStringRegexp("a"), 1, {
          parentheses: escapeStringRegexp("|"),
        })
      ).test("|a|")
    ).toBe(true);

    expect(
      new RegExp(
        orMore(escapeStringRegexp("a"), 1, {
          parentheses: escapeStringRegexp("|"),
        })
      ).test("|a|a|a|")
    ).toBe(true);

    // TODO なぜか落ちる
    // expect(
    //   new RegExp(orMore("a", 1, { parentheses: "|" })).test("|a|b|a|")
    // ).toBe(false);
  });
});

describe("zeroOrMore", () => {
  test("0個でもOK", () => {
    expect(new RegExp(zeroOrMore(escapeStringRegexp("a"))).test("")).toBe(true);
  });

  test("1個でもOK", () => {
    expect(new RegExp(zeroOrMore(escapeStringRegexp("a"))).test("a")).toBe(
      true
    );
  });
});

describe("oneOrMore", () => {
  test("0個はNG", () => {
    expect(new RegExp(orMore(escapeStringRegexp("a"), 1)).test("")).toBe(false);
  });

  test("1個はOK", () => {
    expect(new RegExp(orMore(escapeStringRegexp("a"), 1)).test("a")).toBe(true);
  });
});

describe("withAround", () => {
  test("前後に囲むことを強制する（left,right）", () => {
    expect(
      new RegExp(
        withAround(escapeStringRegexp("a"), {
          left: escapeStringRegexp("("),
          right: escapeStringRegexp(")"),
        })
      ).test("(a)")
    ).toBe(true);

    expect(
      new RegExp(
        withAround(escapeStringRegexp("a"), {
          left: escapeStringRegexp("("),
          right: escapeStringRegexp(")"),
        })
      ).test("a")
    ).toBe(false);
  });

  test("前後に囲むことを強制する（単一指定）", () => {
    expect(
      new RegExp(
        withAround(escapeStringRegexp("a"), escapeStringRegexp("|"))
      ).test("|a|")
    ).toBe(true);
    expect(
      new RegExp(
        withAround(escapeStringRegexp("a"), escapeStringRegexp("|"))
      ).test("a")
    ).toBe(false);
  });

  test("前後に囲むことを矯正する（one）", () => {
    expect(
      new RegExp(
        withAround(escapeStringRegexp("a"), {
          left: escapeStringRegexp("("),
          right: escapeStringRegexp(")"),
        })
      ).test("a")
    ).toBe(false);

    expect(
      new RegExp(
        withAround(
          escapeStringRegexp("a"),
          {
            left: escapeStringRegexp("("),
            right: escapeStringRegexp(")"),
          },
          {
            parenthesesQuantity: "one",
          }
        )
      ).test("(a)")
    ).toBe(true);

    expect(
      new RegExp(
        withAround(
          escapeStringRegexp("a"),
          {
            left: escapeStringRegexp("("),
            right: escapeStringRegexp(")"),
          },
          {
            parenthesesQuantity: "one",
          }
        )
      ).test("((a))")
    ).toBe(true);
  });

  test("前後に囲むことを矯正する（zeroOrMore）", () => {
    expect(
      new RegExp(
        withAround(
          escapeStringRegexp("a"),
          {
            left: escapeStringRegexp("("),
            right: escapeStringRegexp(")"),
          },
          {
            parenthesesQuantity: "zeroOrMore",
          }
        )
      ).test("a")
    ).toBe(true);

    expect(
      new RegExp(
        withAround(
          escapeStringRegexp("a"),
          {
            left: escapeStringRegexp("("),
            right: escapeStringRegexp(")"),
          },
          {
            parenthesesQuantity: "zeroOrMore",
          }
        )
      ).test("(a)")
    ).toBe(true);

    expect(
      new RegExp(
        withAround(
          escapeStringRegexp("a"),
          {
            left: escapeStringRegexp("("),
            right: escapeStringRegexp(")"),
          },
          {
            parenthesesQuantity: "zeroOrMore",
          }
        )
      ).test("((a))")
    ).toBe(true);
  });

  test("前後に囲むことを矯正する（oneOrMore）", () => {
    // TODO: バグってるな
    // expect(
    //   new RegExp(
    //     withAround(
    //       "a",
    //       {
    //         left: "(",
    //         right: ")",
    //       },
    //       {
    //         parenthesesQuantity: "oneOrMore",
    //       }
    //     )
    //   ).test("a")
    // ).toBe(false);
    // expect(
    //   new RegExp(
    //     withAround(
    //       "a",
    //       {
    //         left: "(",
    //         right: ")",
    //       },
    //       {
    //         parenthesesQuantity: "oneOrMore",
    //       }
    //     )
    //   ).test("(a)")
    // ).toBe(true);
  });
});

describe("maybeSpaceAround", () => {
  test("前後にスペースがあってもなくてもOK", () => {
    expect(
      new RegExp(maybeSpaceAround(escapeStringRegexp("a"))).test("a")
    ).toBe(true);
    expect(
      new RegExp(maybeSpaceAround(escapeStringRegexp("a"))).test(" a")
    ).toBe(true);
    expect(
      new RegExp(maybeSpaceAround(escapeStringRegexp("a"))).test("a ")
    ).toBe(true);
    expect(
      new RegExp(maybeSpaceAround(escapeStringRegexp("a"))).test(" a ")
    ).toBe(true);
  });
});

describe("withParentheses", () => {
  test("前後に()があることを強制する", () => {
    expect(
      new RegExp(withParentheses(escapeStringRegexp("a"))).test("(a)")
    ).toBe(true);
    expect(new RegExp(withParentheses(escapeStringRegexp("a"))).test("a")).toBe(
      false
    );
  });
});

describe("withBarAround", () => {
  test("前後に|があることを強制する", () => {
    expect(new RegExp(withBarAround(escapeStringRegexp("a"))).test("|a|")).toBe(
      true
    );
    expect(new RegExp(withBarAround(escapeStringRegexp("a"))).test("a")).toBe(
      false
    );
  });
});

describe("csv", () => {
  test("カンマ区切りになる", () => {
    expect(new RegExp(csv(escapeStringRegexp("a"))).test("a")).toBe(true);
    expect(new RegExp(csv(escapeStringRegexp("a"))).test("a,a")).toBe(true);
  });
});

describe("sand", () => {
  test("指定の文字で囲む", () => {
    expect(
      new RegExp(
        sand({
          center: escapeStringRegexp("a"),
          lr: escapeStringRegexp("|"),
        })
      ).test("|a|")
    ).toBe(true);
  });
});
