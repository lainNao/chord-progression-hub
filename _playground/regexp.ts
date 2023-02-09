import assert from "assert";
import { abort } from "process";

const matchWholeString = (str: string) => `^${str}$`;
const oneOrMore = (str: string) => `(${str})+`;
const START_BAR_REGEXP = "\\|";
const CHORD_REGEXP = "([A-G])";
const OPTIONAL_SHARP_FLAT_REGEXP = "(#|b)?";
const OPTIONAL_CHORD_TYPE_REGEXP = "(m|M|aug|dim|add|sus2|sus4)?";
const OPTIONAL_CHORD_MODIFIER_REGEXP = "(2|3|4|b5|5|6|7|b9|9|b11|11|b13|13)?";
const OPTIONAL_CHORD_ADDITIONAL_MODIFIER_REGEXP = "(-5|b5)?";
const CODE_EXPRESSION = CHORD_REGEXP +
  OPTIONAL_SHARP_FLAT_REGEXP +
  OPTIONAL_CHORD_TYPE_REGEXP +
  OPTIONAL_CHORD_MODIFIER_REGEXP +
  OPTIONAL_CHORD_ADDITIONAL_MODIFIER_REGEXP
const END_BAR_REGEXP = "\\|";

const CHORD_PROGRESSION_REGEXP = matchWholeString(
  START_BAR_REGEXP +
    oneOrMore(
      CODE_EXPRESSION +
        END_BAR_REGEXP
    )
);

// TODO
// key=などのメタ情報を許容
// あと開業した時は「|」が2回続くことになるのを許すとか？
// 分数コード
// カンマ区切りでの1小節に複数コード
// 改行文字やスペースはよくわからないので許容しない。前処理で消す。と思ったけど最後に対応したいな。

const chordReg = new RegExp(CHORD_PROGRESSION_REGEXP, "g");
const ok = [
  "|C#m|",
  "|C#m|",
  "|C#m7|",
  "|C#m7-5|",
  "|C#m13-5|",
  "|C#aug13|",
]
const ng = [
  "",
  "|",
  "|C",
  "|C|C",
]

assert(true)
ok.forEach((target) => {
  assert(chordReg.test(target));
});

console.log("ng---------------------")
ng.forEach((target) => {
  console.log(target.match(chordReg), chordReg.test(target));
});

