const lib = require("./index");

describe("spec-checklist", () => {
  test("正常系", () => {
    const params = {
      lines: [
        // 通常の文はスルーなのでOK
        "",
        "aaa",
        // チェックリスト項目であるが、末尾に (spec-${id}) がちゃんとあるものはOK
        "- [x] aa (spec-111)",
        "- [ ] aa (spec-111)",
        "  - [x] aa (spec-111)",
        "  - [x] bb(spec-111)",
      ],
    };
    const mockOnError = jest.fn();
    lib.function(params, mockOnError);
    expect(mockOnError).toHaveBeenCalledTimes(0);
  });

  test("異常系", () => {
    const params = {
      lines: [
        "- [x] aa",
        "- [ ] aa",
        "  - [x] aa",
        "  - [x] bb",
        "- [ ] aa(spec-)",
        "- [ ] aa(spe-)",
      ],
    };
    const mockOnError = jest.fn();
    lib.function(params, mockOnError);
    expect(mockOnError).toHaveBeenCalledTimes(params.lines.length);
  });
});
