// 全体にマッチさせる
const matchWholeString = (exp: string) => `^${exp}$`;

//一つ以上必須にする
const oneOrMore = (exp: string) => `(${exp})+`;

// ()で囲う
const withParentheses = (exp: string) => `\\(${exp}\\)`;

// オプショナル化
const optional = (exp: string) => `(${exp})?`;

// スペースを両端に挟んでOK
const maybeSpaceAround = (exp: string) => `(\\s)*${exp}(\\s)*`;

// 挟む
const sand = (arg: {
  center: string;
  lr: string;
}) => `(${arg.lr}${arg.center}${arg.lr})`;

// CSV化
const csv = (exp: string) => `${exp}(${maybeSpaceAround(",")}${exp})*`;

const META_REGEXP = {
  BAR: "\\|",
  COMMA: ",",
  SLASH: "/",
  NEW_LINE: "(\\r\\n|\\r|\\n)",
  ENGLISH_OR_NUMBER: "[a-zA-Z0-9]",
} as const;

const CHORD_REGEXP = {
  CHORD: "([A-G])",
  SHARP_FLAT: "(#|b)",
  TYPE: "(m|M|aug|dim|add|sus2|sus4)",
  MODIFIER: "(2|3|b3|4|b5|5|#5|b6|6|7|b9|9|#9|b11|11|#11|b13|13|#13)",
  ADDITIONAL_MODIFIER: "(-5|b5)",
} as const;

// key=C など
const KEY_VALUE_REGEXP = sand({
  lr: oneOrMore(
    META_REGEXP.ENGLISH_OR_NUMBER
  ),
  center: "=",
});

// (key=C, someKey=someValue) など
const KEY_VALUE_CSV_PARENTHESES_REGEXP = withParentheses(csv(KEY_VALUE_REGEXP))

// (9,13) など
const MODIFIER_WITH_PARENTHESES = withParentheses(csv(CHORD_REGEXP.MODIFIER));

// Bb7-5(9,13) など
const CHORD_EXPRESSION_WITHOUT_SLASH_COMMA_REGEXP =
  CHORD_REGEXP.CHORD +
  optional(CHORD_REGEXP.SHARP_FLAT) +
  optional(CHORD_REGEXP.TYPE) +
  optional(CHORD_REGEXP.MODIFIER) +
  optional(CHORD_REGEXP.ADDITIONAL_MODIFIER) +
  optional(MODIFIER_WITH_PARENTHESES);

// 分数コード対応。Bb7-5(9,13)/A など
const CHORD_EXPRESSION_WITHOUT_COMMA_REGEXP =
  CHORD_EXPRESSION_WITHOUT_SLASH_COMMA_REGEXP +
  optional(META_REGEXP.SLASH + CHORD_EXPRESSION_WITHOUT_SLASH_COMMA_REGEXP);

// CSV対応。Bb7-5(9,13)/A,Gm7 など
const CHORD_EXPRESSION_REGEXP = csv(CHORD_EXPRESSION_WITHOUT_COMMA_REGEXP);

// 複数コード対応。|Bb7-5(9,13)/A,Gm7|F7|Bb7|Eb7,G7| など
const ONE_LINE_CODE_EXPRESSION_REGEXP =
  maybeSpaceAround(optional(META_REGEXP.NEW_LINE)) +
  oneOrMore(
    META_REGEXP.BAR +
      optional(maybeSpaceAround(KEY_VALUE_CSV_PARENTHESES_REGEXP)) +
      maybeSpaceAround(CHORD_EXPRESSION_REGEXP)
  ) +
  META_REGEXP.BAR;

// 複数行対応
export const MULTI_LINE_CODE_EXPRESSION_REGEXP = matchWholeString(
  oneOrMore(ONE_LINE_CODE_EXPRESSION_REGEXP)
);
