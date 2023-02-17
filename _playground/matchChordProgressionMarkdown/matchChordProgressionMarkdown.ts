// TODO:
// key=などのメタ情報を許容
// カンマ区切りでの1小節に複数コード
// スペース許容をあれこれ
// 
// マークダウンってどうリントしてるんだ？ これのコード読みたい https://github.com/DavidAnson/markdownlint
// regression testもつけたい。出力されたcsvが同じかどうかのテスト

import { MULTI_LINE_CODE_EXPRESSION_REGEXP } from "./matchChordProgressionMarkdown.util";

export const matchChordExpressionMarkdown = (markdown: string) => {
  return new RegExp(MULTI_LINE_CODE_EXPRESSION_REGEXP, "g").test(markdown);
};
