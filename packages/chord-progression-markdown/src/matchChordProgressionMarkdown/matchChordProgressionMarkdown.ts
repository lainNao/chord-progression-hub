// TODO: Iなどの記法を許容（これはCとかと混在しないように関数自体分けたほうが良いのかも）
// TODO スペース許容をあれこれ
// TODO マークダウンってどうリントしてるんだ？ これのコード読みたい https://github.com/DavidAnson/markdownlint
// TODO regression testもつけたい。出力されたcsvが同じかどうかのテスト
// TODO 個別の正規表現のテスト。異常系とかたくさんしたい。

import { MULTI_LINE_CODE_EXPRESSION_REGEXP } from "./matchChordProgressionMarkdown.util";

export const matchChordExpressionMarkdown = (markdown: string) => {
  return new RegExp(MULTI_LINE_CODE_EXPRESSION_REGEXP, "g").test(markdown);
};
