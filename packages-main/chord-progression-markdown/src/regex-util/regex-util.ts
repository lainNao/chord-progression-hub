import { META_REGEXP } from "./regex-util.consts";
import { RegexpString } from "./regex-util.types";

/**
 * 全体にマッチさせる
 */
export const matchWholeString = (str: RegexpString): RegexpString =>
  `^${str}$` as RegexpString;

/**
 * オプショナルにする
 */
export const optional = (str: RegexpString): RegexpString =>
  `(${str})?` as RegexpString;

/**
 * 0か1つ以上必須にする
 */
export const orMore = (
  str: RegexpString,
  count: 0 | 1,
  option?:
    | {
        delimiter: RegexpString;
      }
    | {
        parentheses:
          | RegexpString
          | {
              left: RegexpString;
              right: RegexpString;
            };
      }
): RegexpString => {
  const repeater = count === 0 ? "*" : "+";
  if (!option) {
    return `(${str})${repeater}` as RegexpString;
  }
  if ("delimiter" in option) {
    const escapedDelimiter = option.delimiter;
    return `(${str})(${escapedDelimiter}(${str}))${repeater}` as RegexpString;
  }
  if ("parentheses" in option) {
    const left =
      typeof option.parentheses === "string"
        ? option.parentheses
        : option.parentheses.left;
    const right =
      typeof option.parentheses === "string"
        ? option.parentheses
        : option.parentheses.right;
    return `${left}(${str}(${right}))${repeater}` as RegexpString;
  }

  throw new Error("Invalid option: " + option);
};

/**
 * 0か1つ以上必須にする
 */
export const zeroOrMore = (str: RegexpString): RegexpString => orMore(str, 0);

/**
 * 1つ以上必須にする
 */
export const oneOrMore = (str: RegexpString): RegexpString => orMore(str, 1);

/**
 * 両端を囲む
 */
export const withAround = (
  str: RegexpString,
  parentheses:
    | {
        left: RegexpString;
        right: RegexpString;
      }
    | RegexpString,
  option?: {
    parenthesesQuantity: "one" | "zeroOrMore" | "oneOrMore";
  }
): RegexpString => {
  const left = typeof parentheses === "string" ? parentheses : parentheses.left;
  const right =
    typeof parentheses === "string" ? parentheses : parentheses.right;
  const parenthesesQuantity = option?.parenthesesQuantity ?? "one";

  switch (parenthesesQuantity) {
    case "one":
      return `${left}${str}${right}` as RegexpString;
    case "zeroOrMore":
      return `${zeroOrMore(left)}${str}${zeroOrMore(left)}` as RegexpString;
    case "oneOrMore":
      return `${oneOrMore(left)}${str}${oneOrMore(right)}` as RegexpString;
  }
};

/**
 * スペースを両端に挟んでOK
 */
export const maybeSpaceAround = (str: RegexpString): RegexpString =>
  withAround(str, META_REGEXP.SPACE, {
    parenthesesQuantity: "zeroOrMore",
  });

/**
 * ()で囲う
 */
export const withParentheses = (str: RegexpString): RegexpString =>
  withAround(
    str,
    {
      left: "\\(" as RegexpString,
      right: "\\)" as RegexpString,
    },
    {
      parenthesesQuantity: "one",
    }
  );
/**
 * |で囲う
 */
export const withBarAround = (str: RegexpString): RegexpString =>
  withAround(str, META_REGEXP.BAR, {
    parenthesesQuantity: "one",
  });

/**
 * CSV形式にする
 */
export const csv = (exp: RegexpString): RegexpString =>
  `${exp}${orMore(
    `${maybeSpaceAround(META_REGEXP.COMMA)}${exp}` as RegexpString,
    0
  )}` as RegexpString;

/**
 * 指定の文字で囲む
 */
export const sand = (arg: {
  center: RegexpString;
  lr: RegexpString;
}): RegexpString => `(${arg.lr}${arg.center}${arg.lr})` as RegexpString;
