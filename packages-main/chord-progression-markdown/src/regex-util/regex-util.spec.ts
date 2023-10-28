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
  const aAndOptionalB = new RegExp("a" + optional(escapeStringRegexp("b")));

  test("あってもOK", () => {
    expect(aAndOptionalB.test("ab")).toBe(true);
  });

  test("無くてもOK", () => {
    expect(aAndOptionalB.test("a")).toBe(true);
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
    const aDelimitedByOneOrMoreComma = new RegExp(
      matchWholeString(
        orMore(escapeStringRegexp("a"), 1, {
          delimiter: escapeStringRegexp(","),
        })
      )
    );

    const aDelimitedByZeroOrMoreComma = new RegExp(
      matchWholeString(
        orMore(escapeStringRegexp("a"), 0, {
          delimiter: escapeStringRegexp(","),
        })
      )
    );

    expect(aDelimitedByOneOrMoreComma.test("a,")).toBe(false);
    expect(aDelimitedByZeroOrMoreComma.test("a,a")).toBe(true);
    expect(aDelimitedByOneOrMoreComma.test("a,a")).toBe(true);
  });

  test("（parenthesesの指定）parenthesesで囲まれた文字列の繰り返しになる", () => {
    const aSurroundedByBars = new RegExp(
      matchWholeString(
        orMore(escapeStringRegexp("a"), 1, {
          parentheses: escapeStringRegexp("|"),
        })
      )
    );

    expect(aSurroundedByBars.test("|a|")).toBe(true);
    expect(aSurroundedByBars.test("|a|a|a|")).toBe(true);
    expect(aSurroundedByBars.test("|a|b|a|")).toBe(false);
  });
});

describe("zeroOrMore", () => {
  const zeroOrMoreA = new RegExp(zeroOrMore(escapeStringRegexp("a")));
  test("0個でもOK", () => {
    expect(zeroOrMoreA.test("")).toBe(true);
  });

  test("1個でもOK", () => {
    expect(zeroOrMoreA.test("a")).toBe(true);
  });
});

describe("oneOrMore", () => {
  const oneOrMoreA = new RegExp(orMore(escapeStringRegexp("a"), 1));
  test("0個はNG", () => {
    expect(oneOrMoreA.test("")).toBe(false);
  });

  test("1個はOK", () => {
    expect(oneOrMoreA.test("a")).toBe(true);
  });
});

describe("withAround", () => {
  test("前後に囲むことを強制する（left,right）", () => {
    const aSurroundedByParentheses = new RegExp(
      withAround(escapeStringRegexp("a"), {
        left: escapeStringRegexp("("),
        right: escapeStringRegexp(")"),
      })
    );

    expect(aSurroundedByParentheses.test("(a)")).toBe(true);
    expect(aSurroundedByParentheses.test("a")).toBe(false);
  });

  test("前後に囲むことを強制する（単一指定）", () => {
    const aSurroundedByBars = new RegExp(
      withAround(escapeStringRegexp("a"), escapeStringRegexp("|"))
    );

    expect(aSurroundedByBars.test("|a|")).toBe(true);
    expect(aSurroundedByBars.test("a")).toBe(false);
  });

  test("前後に囲むことを矯正する（one）", () => {
    const aSurroundedByOneParentheses = new RegExp(
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
    );

    expect(aSurroundedByOneParentheses.test("a)")).toBe(false);
    expect(aSurroundedByOneParentheses.test("(a")).toBe(false);
    expect(aSurroundedByOneParentheses.test("(a)")).toBe(true);
    // oneの場合以下本当は通ってほしくないけど、まあありなのかな…
    expect(aSurroundedByOneParentheses.test("((a))")).toBe(true);
  });

  test("前後に囲むことを矯正する（zeroOrMore）", () => {
    const aSurroundedByZeroOrMoreParentheses = new RegExp(
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
    );

    expect(aSurroundedByZeroOrMoreParentheses.test("a")).toBe(true);
    expect(aSurroundedByZeroOrMoreParentheses.test("(a)")).toBe(true);
    expect(aSurroundedByZeroOrMoreParentheses.test("((a))")).toBe(true);
  });

  test("前後に囲むことを矯正する（oneOrMore）", () => {
    const aSurroundedByOneOrMoreParentheses = new RegExp(
      withAround(
        escapeStringRegexp("a"),
        {
          left: escapeStringRegexp("("),
          right: escapeStringRegexp(")"),
        },
        {
          parenthesesQuantity: "oneOrMore",
        }
      )
    );

    expect(aSurroundedByOneOrMoreParentheses.test("a")).toBe(false);
    expect(aSurroundedByOneOrMoreParentheses.test("(a)")).toBe(true);
  });
});

describe("maybeSpaceAround", () => {
  test("前後にスペースがあってもなくてもOK", () => {
    const aMaybeSurroundedBySpace = new RegExp(
      maybeSpaceAround(escapeStringRegexp("a"))
    );

    expect(aMaybeSurroundedBySpace.test("a")).toBe(true);
    expect(aMaybeSurroundedBySpace.test(" a")).toBe(true);
    expect(aMaybeSurroundedBySpace.test("a ")).toBe(true);
    expect(aMaybeSurroundedBySpace.test(" a ")).toBe(true);
  });
});

describe("withParentheses", () => {
  test("前後に()があることを強制する", () => {
    const aSurroundedByOneParentheses = new RegExp(
      withParentheses(escapeStringRegexp("a"))
    );

    expect(aSurroundedByOneParentheses.test("(a)")).toBe(true);
    expect(aSurroundedByOneParentheses.test("a")).toBe(false);
  });
});

describe("withBarAround", () => {
  test("前後に|があることを強制する", () => {
    const aSurroundedByOneBar = new RegExp(
      withBarAround(escapeStringRegexp("a"))
    );

    expect(aSurroundedByOneBar.test("|a|")).toBe(true);
    expect(aSurroundedByOneBar.test("a")).toBe(false);
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
    const aSurroundedByBars = new RegExp(
      sand({
        center: escapeStringRegexp("a"),
        lr: escapeStringRegexp("|"),
      })
    );

    expect(aSurroundedByBars.test("|a|")).toBe(true);
  });
});
