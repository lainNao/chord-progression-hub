import * as path from "path";
import fs from "fs";
import { parseSpecsFromMarkdownUnderDir } from "spec-checklist-parser";

/**
 * specs.generated.jsonを生成する
 */
function generateSpecsJson() {
  const specs = parseSpecsFromMarkdownUnderDir({
    absoluteDir: path.join(__dirname, "../../../specifications"),
  });

  // specs.jsonを生成
  const specsJson = JSON.stringify(specs, null, 2);
  fs.writeFileSync(
    path.join(__dirname, "../../../specs.generated.json"),
    specsJson,
    "utf8"
  );
}

generateSpecsJson();
console.log("OK");
