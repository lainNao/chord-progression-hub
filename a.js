const { exec } = require("child_process");
const fs = require("fs");

const dir = "./docs-spec";

exec(`grep -rHn '//spec-[0-9]\\+$' ${dir}`, (error, stdout, stderr) => {
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

  // 結果をJSONファイルに書き出す
  fs.writeFile("results.json", JSON.stringify(results, null, 2), (err) => {
    if (err) {
      console.error(`Error writing file: ${err}`);
    } else {
      console.log("Results saved to results.json");
    }
  });
});
