// TODO:
// key=などのメタ情報を許容
// スペース許容をあれこれ
// 
// マークダウンってどうリントしてるんだ？ これのコード読みたい https://github.com/DavidAnson/markdownlint
// regression testもつけたい。出力されたcsvが同じかどうかのテスト

import { MULTI_LINE_CODE_EXPRESSION_REGEXP } from "./matchChordProgressionMarkdown.util";

export const matchChordExpressionMarkdown = (markdown: string) => {
  return new RegExp(MULTI_LINE_CODE_EXPRESSION_REGEXP, "g").test(markdown);
};
