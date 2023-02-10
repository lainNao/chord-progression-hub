
// 全体にマッチさせる
const matchWholeString = (str: string) => `^${str}$`;

//一つ以上必須にする
const oneOrMore = (str: string) => `(${str})+`;

// ()で囲う
const withParentheses = (str: string) => `\\(${str}\\)`;

// オプショナル化
const optional = (str: string) => `(${str})?`;

// CSV化
const csv = (str: string) => `${str}(,${str})*`;

const META_REGEXP = {
  BAR: "\\|",
} as const;

const CHORD_REGEXP = {
  CHORD: "([A-G])",
  SHARP_FLAT: "(#|b)",
  TYPE: "(m|M|aug|dim|add|sus2|sus4)",
  MODIFIER: "(2|3|b3|4|b5|5|#5|b6|6|7|b9|9|#9|b11|11|#11|b13|13|#13)",
  ADDITIONAL_MODIFIER: "(-5|b5)",
} as const;

//(9,13) など
const MODIFIER_WITH_PARENTHESES = withParentheses(csv(CHORD_REGEXP.MODIFIER));

// Bb7-5(9,13) など
const CHORD_EXPRESSION_REGEXP =
  CHORD_REGEXP.CHORD +
  optional(CHORD_REGEXP.SHARP_FLAT) +
  optional(CHORD_REGEXP.TYPE) +
  optional(CHORD_REGEXP.MODIFIER) +
  optional(CHORD_REGEXP.ADDITIONAL_MODIFIER) +
  optional(MODIFIER_WITH_PARENTHESES);

// |Cm7|F7|Bb7|Eb7| など
export const CHORD_PROGRESSION_REGEXP = matchWholeString(
  META_REGEXP.BAR + oneOrMore(CHORD_EXPRESSION_REGEXP + META_REGEXP.BAR)
);