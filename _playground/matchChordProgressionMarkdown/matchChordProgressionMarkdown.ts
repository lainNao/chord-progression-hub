// TODO
// key=などのメタ情報を許容
// カンマ区切りでの1小節に複数コード
// 改行文字やスペースはよくわからないので許容しない。前処理で消す。と思ったけど最後に対応したいな。
//     改行についてはsplit("\r")とかの類でもいいのかも
// マークダウンってどうリントしてるんだ？ これのコード読みたい https://github.com/DavidAnson/markdownlint

import { MULTI_LINE_CODE_EXPRESSION_REGEXP } from "./matchChordProgressionMarkdown.util";

export const matchChordExpressionMarkdown = (markdown: string) => {
  return new RegExp(MULTI_LINE_CODE_EXPRESSION_REGEXP, "g").test(markdown);
};
