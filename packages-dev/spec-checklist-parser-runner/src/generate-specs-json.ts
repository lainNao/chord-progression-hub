import * as path from "path";
import fs from "fs";
import { parseSpecsFromMarkdownUnderDir } from "spec-checklist-parser";

const GENERATED_FILE = "docs-generated/specs.generated.json";

/**
 * docs-generated/specs.generated.json を生成する
 *
 * TODO: ここ、パス指定が追従漏れ起こしそうなのでどうにかできるならしたいね
 */
function generateSpecsJson() {
  const specs = parseSpecsFromMarkdownUnderDir({
    absoluteDir: path.join(__dirname, "../../../docs-spec"),
  });

  // specs.jsonを生成
  const specsJson = JSON.stringify(specs, null, 2);
  fs.writeFileSync(
    path.join(__dirname, `../../../${GENERATED_FILE}`),
    specsJson,
    "utf8"
  );
}

generateSpecsJson();
const green = "\u001b[32m";
console.log(`${green}[SUCCESS] Generated ${GENERATED_FILE}`);
