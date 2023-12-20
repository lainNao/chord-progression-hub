import * as path from "path";
import { parseSpecsFromMarkdownUnderDir } from "spec-checklist-parser";

function testIdsAreUnique(): boolean {
  const specs = parseSpecsFromMarkdownUnderDir({
    absoluteDir: path.join(__dirname, "../../../docs-spec"),
  });

  // バリデーション（idの重複がある場合はエラーにする）
  const idSet = new Set();
  const hasDuplicate = specs.some((spec) => {
    if (idSet.has(spec.id)) {
      console.error(`idが重複しています: ${spec.id}`);
      return true;
    }
    idSet.add(spec.id);
  });
  return !hasDuplicate;
}

if (testIdsAreUnique()) {
  console.log("OK");
  process.exit(0);
} else {
  process.exit(1);
}
