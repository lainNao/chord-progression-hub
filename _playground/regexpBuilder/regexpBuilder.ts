export const META_REGEXP = {
  BAR: "\\|",
  COMMA: ",",
  SLASH: "/",
  SPACE: "\\s",
  NEW_LINE: "(\\r\\n|\\r|\\n)",
  ENGLISH_OR_NUMBER: "[a-zA-Z0-9]",
} as const;

// 全体にマッチさせる
export const matchWholeString = (str: string) => `^${str}$`;

// オプショナルにする
export const optional = (str: string) => `(${str})?`;

//0か1つ以上必須にする
export const orMore = (
  str: string,
  count: 0 | 1,
  option?:
    | {
        delimiter: string;
      }
    | {
        parentheses:
          | string
          | {
              left: string;
              right: string;
            };
      }
) => {
  const repeater = count === 0 ? "*" : "+";
  if (!option) {
    return `(${str})${repeater}`;
  }
  if ("delimiter" in option) {
    return `(${str})(${option.delimiter}(${str}))${repeater}`;
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

export const zeroOrMore = (str: string) => orMore(str, 0);
export const oneOrMore = (str: string) => orMore(str, 1);

// 両端を囲む
export const withAround = (
  str: string,
  parentheses:
    | {
        left: string;
        right: string;
      }
    | string,
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

// スペースを両端に挟んでOK
export const maybeSpaceAround = (str: string) =>
  withAround(str, META_REGEXP.SPACE, {
    parenthesesQuantity: "zeroOrMore",
  });

// ()で囲う
export const withParentheses = (str: string) =>
  withAround(
    str,
    {
      left: "\\(",
      right: "\\)",
    },
    {
      parenthesesQuantity: "one",
    }
  );

export const withBarAround = (str: string) =>
  withAround(str, META_REGEXP.BAR, {
    parenthesesQuantity: "one",
  });

// CSV化
export const csv = (exp: string) =>
  `${exp}${orMore(`${maybeSpaceAround(META_REGEXP.COMMA)}${exp}`, 0)}`;

// 挟む
export const sand = (arg: { center: string; lr: string }) =>
  `(${arg.lr}${arg.center}${arg.lr})`;
