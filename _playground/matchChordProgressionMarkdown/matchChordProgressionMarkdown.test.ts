import assert from "assert";
import { matchChordExpressionMarkdown } from "./matchChordProgressionMarkdown";
import { difficultButOk, ng, ok } from "./matchChordProgressionMarkdown.fixtures";

ok.forEach((target) => {
  assert(matchChordExpressionMarkdown(target), `\n\n${target}\nはマッチする\n`);
});

ng.forEach((target) => {
  assert(!matchChordExpressionMarkdown(target), `\n\n${target}\nはマッチしない\n`);
});

// difficultButOk.forEach((target) => {
//   assert(matchChordExpressionMarkdown(target), `${target}はマッチする`);
// });

// success message
console.log("\x1b[32m%s\x1b[0m", "All tests passed.");