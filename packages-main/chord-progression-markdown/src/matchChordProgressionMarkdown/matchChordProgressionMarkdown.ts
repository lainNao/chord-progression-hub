import { MULTI_LINE_CODE_EXPRESSION_REGEXP } from "./matchChordProgressionMarkdown.util";

export const matchChordExpressionMarkdown = (markdown: string) => {
  return new RegExp(MULTI_LINE_CODE_EXPRESSION_REGEXP, "g").test(markdown);
};
