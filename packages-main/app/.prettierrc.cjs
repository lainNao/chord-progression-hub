/** @type {import("prettier").Config} */
module.exports = {
  quoteProps: "consistent",
  overrides: [
    // 辞書ファイルはダブルコーテーション強制
    {
      files: ["src/locales/**/*.ts"],
      options: {
        singleQuote: false,
      },
    },
  ],
};
