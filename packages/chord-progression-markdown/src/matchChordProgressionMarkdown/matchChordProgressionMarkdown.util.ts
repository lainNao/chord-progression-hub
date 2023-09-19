import { CHORD_REGEXP, META_REGEXP } from "../regex-util/regex-util.consts";
import {
  csv,
  matchWholeString,
  maybeSpaceAround,
  oneOrMore,
  optional,
  sand,
  withParentheses,
} from "../regex-util/regex-util";
import { escapeStringRegexp } from "../regex-util/escapeStringRegexp";
import { RegexpString } from "../regex-util/regex-util.types";

// key=C など
const KEY_VALUE_REGEXP = sand({
  lr: oneOrMore(META_REGEXP.ENGLISH_OR_NUMBER),
  center: escapeStringRegexp("="),
});

// (key=C, someKey=someValue) など
const KEY_VALUE_CSV_PARENTHESES_REGEXP = withParentheses(csv(KEY_VALUE_REGEXP));

// (9,13) など
const MODIFIER_WITH_PARENTHESES = withParentheses(csv(CHORD_REGEXP.MODIFIER));

// Bb7-5(9,13) など
const CHORD_EXPRESSION_WITHOUT_SLASH_COMMA_REGEXP =
  CHORD_REGEXP.CHORD +
  optional(CHORD_REGEXP.SHARP_FLAT) +
  optional(CHORD_REGEXP.TYPE) +
  optional(CHORD_REGEXP.MODIFIER) +
  optional(CHORD_REGEXP.MODIFIER) +
  optional(MODIFIER_WITH_PARENTHESES);

// 分数コード対応。Bb7-5(9,13)/A など
const CHORD_EXPRESSION_WITHOUT_COMMA_REGEXP =
  CHORD_EXPRESSION_WITHOUT_SLASH_COMMA_REGEXP +
  optional(
    (META_REGEXP.SLASH +
      CHORD_EXPRESSION_WITHOUT_SLASH_COMMA_REGEXP) as RegexpString
  );

// CSV対応。Bb7-5(9,13)/A,Gm7 など
const CHORD_EXPRESSION_REGEXP = csv(
  CHORD_EXPRESSION_WITHOUT_COMMA_REGEXP as RegexpString
);

// 複数コード対応。|Bb7-5(9,13)/A,Gm7|F7|Bb7|Eb7,G7| など
const ONE_LINE_CODE_EXPRESSION_REGEXP = (maybeSpaceAround(
  optional(META_REGEXP.NEW_LINE)
) +
  oneOrMore(
    (META_REGEXP.BAR +
      optional(maybeSpaceAround(KEY_VALUE_CSV_PARENTHESES_REGEXP)) +
      maybeSpaceAround(CHORD_EXPRESSION_REGEXP)) as RegexpString
  ) +
  META_REGEXP.BAR) as RegexpString;

// 複数行対応
export const MULTI_LINE_CODE_EXPRESSION_REGEXP = matchWholeString(
  (oneOrMore(ONE_LINE_CODE_EXPRESSION_REGEXP) +
    maybeSpaceAround(optional(META_REGEXP.NEW_LINE))) as RegexpString
);
