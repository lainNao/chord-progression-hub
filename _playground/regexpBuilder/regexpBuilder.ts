export const META_REGEXP = {
  BAR: "\\|",
  COMMA: ",",
  SLASH: "/",
  SPACE: "\\s",
  NEW_LINE: "(\\r\\n|\\r|\\n)",
} as const;

// 全体にマッチさせる
export const matchWholeString = (str: string) => `^${str}$`;

// オプショナルにする
export const optional = (str: string) => `(${str})?`;

export const zeroOrMore = (str: string) => `(${str})*`;

//一つ以上必須にする
export const oneOrMore = (str: string, option?: {
  delimiter: string
} | {
  parentheses: string | {
    left: string;
    right: string;
  }
}) => {
  if (!option){ 
    return `(${str})+`
  }
  if ("delimiter" in option) {
    return `(${str})(${option.delimiter}(${str}))+`
  }
  if ("parentheses" in option) {
    const left = typeof option.parentheses === "string" ? option.parentheses : option.parentheses.left;
    const right = typeof option.parentheses === "string" ? option.parentheses : option.parentheses.right;
    return `${left}(${str}(${right}))+`
  }

  throw new Error("Invalid option: " + option);
};

// CSV化
export const csv = (str: string) => oneOrMore(str, {
  delimiter: META_REGEXP.COMMA
})

// 両端を囲む
export const withAround = (str: string, parentheses: {
  left: string;
  right: string;
} | string, option?: {
  parenthesesQuantity: "one" | "zeroOrMore" | "oneOrMore";
}) => {
  const left = typeof parentheses === "string" ? parentheses : parentheses.left;
  const right = typeof parentheses === "string" ? parentheses : parentheses.right;
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
export const maybeSpaceAround = (str: string) => withAround(str, META_REGEXP.SPACE, {
  parenthesesQuantity: "zeroOrMore"
});

// ()で囲う
export const withParentheses = (str: string) => withAround(str, {
  left: "\\(",
  right: "\\)"
}, {
  parenthesesQuantity: "one"
});

export const withBarAround = (str: string) => withAround(str, META_REGEXP.BAR, {
  parenthesesQuantity: "one"
});