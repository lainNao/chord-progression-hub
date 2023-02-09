// TODO
// key=などのメタ情報を許容
// あと改行した時は「|」が2回続くことになるのを許すとか？
// 分数コード
// カンマ区切りでの1小節に複数コード
// 改行文字やスペースはよくわからないので許容しない。前処理で消す。と思ったけど最後に対応したいな。
//     改行についてはsplit("\r")とかの類でもいいのかも

import { CHORD_PROGRESSION_REGEXP } from "./matchChordProgressionMarkdown.util";

export const matchChordExpressionMarkdown = (markdown: string) => {
  return new RegExp(CHORD_PROGRESSION_REGEXP, "g").test(markdown);
};
