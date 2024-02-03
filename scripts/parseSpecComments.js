/* 概要

・指定されたディレクトリ以下のファイルを再帰的に検索し、
  文末に`//spec-<数>` というコメントが含まれる行を抽出するスクリプト
・抽出結果をJSON形式で標準出力に出力する
・実行方法:
  node scripts/parseSpecComments.js path/to/directory
・抽出結果の例:
  [
    {
      "file": "path/to/file1.txt",
      "line": 10,
      "text": "console.log('spec test')",
      "spec": "123"
    },
    {
      "file": "path/to/file2.txt",
      "line": 20,
      "text": "console.log('spec test2')",
      "spec": "456"
    }
  ]
*/
const { exec } = require("child_process");

// コマンドライン引数からディレクトリパスを受け取る
const dir = process.argv[2];

if (!dir) {
  console.error("ディレクトリパスを引数として指定してください。");
  process.exit(1);
}

exec(`grep -rHn '//spec-[0-9]\\+$' "${dir}"`, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }

  const lines = stdout.split("\n").filter((line) => line.length > 0);
  const results = lines.map((line) => {
    const [file, lineNum, ...textArray] = line.split(":");
    let text = textArray.join(":").trim(); // 再結合して両端のスペースを削除
    const specMatch = text.match(/\/\/spec-([0-9]+)$/);
    let spec = "";
    if (specMatch) {
      spec = specMatch[1]; // `//`を除外したspec部分を抽出
      text = text.replace(/\/\/spec-[0-9]+$/, "").trim(); // 末尾のspecを除去して再度trim
    }
    return { file, line: Number(lineNum), text, spec };
  });

  // 結果を標準出力に出力
  console.log(JSON.stringify(results, null, 2));
});
