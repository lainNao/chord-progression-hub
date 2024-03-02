import fs from "node:fs";
import { ESLint } from "eslint";

async function triggerAndGetAllInstalledEslintPluginIssues(): Promise<
  string[]
> {
  const eslint = new ESLint();
  const temporaryFile = "tmp-file-for-eslint-test.stories.tsx";

  fs.writeFileSync(
    temporaryFile,
    `
    // import/no-anonymous-default-export に引っかかる
    // storybook/story-exports に引っかかる
    export default {};

    // 未使用変数が @typescript-eslint/no-unused-vars に引っかかる
    const a = 1;

    // no-constant-condition に引っかかる
    true ? 1 : 2;

    function aa() {

      // react-hooks/exhaustive-deps に引っかかる
      useEffect(() => {}, [1]);

      // bg-black-100が tailwindcss/no-custom-classname に引っかかる
      return (
        <div className="bg-black-100">
          {/* react/jsx-no-useless-fragment に引っかかる */}
          <></>
          {/* imgが @next/next/no-img-element に引っかかる */}
          <img alt="aa">aa</img>

          {/* jsx-a11y/aria-proptypes に引っかかる */}
          <input aria-current="1">aa</input>
        </div>
      )
    }

    // unicorn/no-process-exit に引っかかる
    process.exit(1);
  `
  );
  const [results] = await eslint.lintFiles([temporaryFile]),
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    ruleIds = results?.messages.map((message) => message.ruleId ?? "");

  return ruleIds ?? [];
}

describe("ESLint", () => {
  test("設定に不要な変更が無い", async () => {
    const eslint = new ESLint(),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      eslintConfig = await eslint.calculateConfigForFile(".eslintrc.js");
    expect(eslintConfig).toMatchSnapshot();
  });

  test.each([
    "no-constant-condition", // eslint
    "@typescript-eslint/no-unused-vars", // @typescript-eslint
    "import/no-anonymous-default-export", // eslint-plugin-import
    "jsx-a11y/aria-proptypes", // eslint-plugin-jsx-a11y
    "react/jsx-no-useless-fragment", // eslint-plugin-react
    "react-hooks/exhaustive-deps", // eslint-plugin-react-hooks
    "storybook/story-exports", // eslint-plugin-storybook
    "@next/next/no-img-element", // @next/next
    "unicorn/no-process-exit", // eslint-plugin-unicorn
    "tailwindcss/no-custom-classname", // eslint-plugin-tailwindcss
  ])(
    "インストールしているESLint関連のプラグインが動作しなくなったりしていない（それぞれ一つのルールは動作する） %s",
    async (rule) => {
      const violatedRules = await triggerAndGetAllInstalledEslintPluginIssues();
      expect(violatedRules).toContain(rule);
    }
  );
});
