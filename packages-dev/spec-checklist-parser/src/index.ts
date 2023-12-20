const fs = require("fs");
const path = require("path");

export interface Spec {
  id: string;
  description: string;
  done: boolean;
}

/**
 * 指定文字列から`- [${done}}] ${description} (spec-${id})`の形式の文字列パースし、Specの配列を返す
 */
export function extractSpecs(content: string): Spec[] {
  const specs: Spec[] = [];
  const lines = content.split("\n");
  lines.forEach((line: string) => {
    const match = line.match(/- \[(.+)\]\s*(.+?)\s*\(spec-(.+)\)/);
    if (match) {
      const done = match[1] === "x";
      const description = match[2];
      const id = match[3];
      specs.push({ id, description, done });
    }
  });
  return specs;
}

/**
 * 指定ディレクトリ内のすべてのファイルの絶対パスを再帰的に取得する
 */
export function getAllFileAbsolutePathsUnder({
  absolutePath,
  extname,
}: {
  absolutePath: string;
  extname?: string;
}): string[] {
  const files: string[] = [];
  const targets = fs.readdirSync(absolutePath, { withFileTypes: true });
  targets.forEach((target: any) => {
    if (target.isDirectory()) {
      const subFiles = getAllFileAbsolutePathsUnder({
        absolutePath: path.join(absolutePath, target.name),
        extname,
      });
      files.push(...subFiles);
    } else {
      if (extname && path.extname(target.name) !== extname) {
        return;
      }
      files.push(path.join(absolutePath, target.name));
    }
  });
  return files;
}

/**
 * 指定ディレクトリ内の.mdファイルを読み込み、`- [${done}}] ${description} (spec-${id})`の形式の文字列パースし、Specの配列を返す
 * ファイルは再帰的にフォルダを探索する
 */
export function parseSpecsFromMarkdownUnderDir({
  absoluteDir,
}: {
  absoluteDir: string;
}): Spec[] {
  const files = getAllFileAbsolutePathsUnder({
    absolutePath: absoluteDir,
    extname: ".md",
  });

  const result = files.flatMap((file: string) => {
    if (path.extname(file) !== ".md") {
      return [];
    }
    const fileContent = fs.readFileSync(file, "utf8");
    return extractSpecs(fileContent);
  });

  return result;
}

const result = parseSpecsFromMarkdownUnderDir({
  absoluteDir: path.join(__dirname, "../fixtures"),
});
