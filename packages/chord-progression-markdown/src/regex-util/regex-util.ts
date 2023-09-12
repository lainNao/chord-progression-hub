import { META_REGEXP } from "./consts";
import { RegexpString } from "./types";

// TODO orMoreとそれに依存してるものにバグがあるっぽい。そもそも引数が変な気がする

/**
 * 全体にマッチさせる
 */
export const matchWholeString = (str: RegexpString) => `^${str}$`;

/**
 * オプショナルにする
 */
export const optional = (str: RegexpString) => `(${str})?`;

/**
 * 0か1つ以上必須にする
 */
export const orMore = (
  str: RegexpString,
  count: 0 | 1,
  // TODO: delimiter入れたら実質countが2以上になるはず。整合性取る
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
) => {
  const repeater = count === 0 ? "*" : "+";
  if (!option) {
    return `(${str})${repeater}`;
  }
  if ("delimiter" in option) {
    const escapedDelimiter = option.delimiter;
    return `(${str})(${escapedDelimiter}(${str}))${repeater}`;
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
    return `${left}(${str}(${right}))${repeater}`;
  }

  throw new Error("Invalid option: " + option);
};

/**
 * 0か1つ以上必須にする
 */
export const zeroOrMore = (str: RegexpString) => orMore(str, 0);

/**
 * 1つ以上必須にする
 */
export const oneOrMore = (str: RegexpString) => orMore(str, 1);

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
) => {
  const left = typeof parentheses === "string" ? parentheses : parentheses.left;
  const right =
    typeof parentheses === "string" ? parentheses : parentheses.right;
  const parenthesesQuantity = option?.parenthesesQuantity ?? "one";

  switch (parenthesesQuantity) {
    case "one":
      return `${left}${str}${right}`;
    case "zeroOrMore":
      return `${zeroOrMore(left)}${str}${zeroOrMore(left)}`;
    case "oneOrMore":
      return `${oneOrMore(left)}${str}${oneOrMore(right)}`;
  }
};

/**
 * スペースを両端に挟んでOK
 */
export const maybeSpaceAround = (str: RegexpString) =>
  withAround(str, META_REGEXP.SPACE, {
    parenthesesQuantity: "zeroOrMore",
  });

/**
 * ()で囲う
 */
export const withParentheses = (str: RegexpString) =>
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
export const withBarAround = (str: RegexpString) =>
  withAround(str, META_REGEXP.BAR, {
    parenthesesQuantity: "one",
  });

/**
 * CSV形式にする
 */
export const csv = (exp: RegexpString) =>
  `${exp}${orMore(
    `${maybeSpaceAround(META_REGEXP.COMMA)}${exp}` as RegexpString,
    0
  )}`;

/**
 * 指定の文字で囲む
 */
export const sand = (arg: { center: RegexpString; lr: RegexpString }) =>
  `(${arg.lr}${arg.center}${arg.lr})`;
