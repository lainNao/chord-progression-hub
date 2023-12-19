import path from "path";
import { extractSpecs, parseSpecsFromMarkdownUnderDir } from ".";

describe("extractSpecs", () => {
  it("spec情報が取得できる", () => {
    const fileContent = `
# aaa
aaa
bbb
- [ ] aaa
- [x] bbb
- [ ] ccc (spec-1)
- [x] ddd (spec-2)
  - [ ] eee (spec-3)
  - [x] fff (spec-4)
`;
    const specs = extractSpecs(fileContent);
    expect(specs).toEqual([
      { id: "1", description: "ccc", done: false },
      { id: "2", description: "ddd", done: true },
      { id: "3", description: "eee", done: false },
      { id: "4", description: "fff", done: true },
    ]);
  });
});

describe("getAllFileAbsolutePathsUnder", () => {
  test.skip("ファイルパス一覧を取得できる", () => {});
});

describe("parseSpecsFromMarkdownUnderDir", () => {
  test("指定ディレクトリ内の.mdファイルを読み込み、`- [${done}}] ${description} (spec-${id})`の形式の文字列パースし、Specの配列を返す", () => {
    const specs = parseSpecsFromMarkdownUnderDir({
      absoluteDir: path.join(__dirname, "../fixtures"),
    });

    expect(specs).toEqual([
      { id: "1", description: "ccc", done: false },
      { id: "2", description: "ddd", done: true },
      { id: "3", description: "eee", done: false },
      { id: "4", description: "f f f", done: true },
      { id: "5", description: "ggg", done: true },
    ]);
  });
});
