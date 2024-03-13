/* eslint-disable max-lines */

const environment = {
    browser: true,
    es2024: true,
    node: true,
  },
  parser = "@typescript-eslint/parser",
  parserOptions = {
    ecmaFeatures: {
      jsx: true,
    },
    project: "./tsconfig.eslint.json",
    // tsconfigRootDir: __dirname,
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings = {
    "import/resolver": {
      typescript: {},
    },
  };

const ignorePatterns = [
  "*.tsbuildinfo",
  "*.snap",
  "*.json",
  "*.css",
  "*.ico",
  "*.svg",
  "*.mdx",
  "*.md",
  "*.txt",
];

module.exports = {
  env: environment,
  parser,
  parserOptions,
  settings,
  ignorePatterns,
  plugins: [
    "@typescript-eslint",
    "import",
    "react",
    "react-hooks",
    "@next/next",
    "jsx-a11y",
    "tailwindcss",
  ],
  extends: [
    // ref: https://github.com/eslint/eslint/blob/main/packages/js/src/configs/eslint-all.js
    "eslint:all",
    // ref: https://github.com/typescript-eslint/typescript-eslint/blob/6954a4a463f9a2a1c20e41c91ee2c75c953dcc9f/packages/eslint-plugin/src/index.ts#L23
    "plugin:@typescript-eslint/all",
    // ref: https://github.com/import-js/eslint-plugin-import/blob/main/src/index.js
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:import/react",
    // ref: https://github.com/jsx-eslint/eslint-plugin-react/blob/master/configs/all.js
    "plugin:react/all",
    // ref: https://github.com/facebook/react/blob/main/packages/eslint-plugin-react-hooks/src/index.js
    "plugin:react-hooks/recommended",
    // ref: https://github.com/storybookjs/eslint-plugin-storybook/tree/main/lib/configs
    "plugin:storybook/csf-strict",
    "plugin:storybook/recommended",
    "plugin:storybook/addon-interactions",
    // ref: https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/configs/all.js
    "plugin:unicorn/all",
    // ref: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/src/index.js
    "plugin:jsx-a11y/strict",
    // ref: https://github.com/vercel/next.js/blob/canary/packages/eslint-plugin-next/src/index.ts
    "next/core-web-vitals",
    // ref: https://github.com/francoismassart/eslint-plugin-tailwindcss/blob/master/lib/index.js
    "plugin:tailwindcss/recommended",

    // Prettierとかぶるルールはオフる（最後のルールが最も優先度高いので最後に置く必要がある）
    "prettier",
  ],
  overrides: [
    {
      // 設定ファイル達
      files: ["jest.config.js", "tailwind.config.ts"],
      rules: {
        "unicorn/prefer-module": "off", // Commonjsを使ってもOK
      },
    },
    // src/appEnv.ts以外のファイルでprocess.envを使うのを禁止
    {
      files: ["!src/appEnv.ts"],
      rules: {
        "no-restricted-syntax": [
          "error",
          {
            selector:
              "MemberExpression[object.name='process'][property.name='env']",
            message: "process.envはsrc/appEnv.tsからimportして使ってください",
          },
        ],
      },
    },
    {
      files: ["!**/*.d.ts"],
      rules: {
        // interfaceをwarnにし、typeに統一する
        "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
      },
    },
    // wrappersを使わせる
    {
      files: ["!src/wrappers/chordProgressionParser.ts"],
      rules: {
        "@typescript-eslint/no-restricted-imports": [
          "error",
          {
            name: "@lainnao/chord-progression-parser-bundler",
            message:
              "ラッパーの @/wrappers/chordProgressionParser からimportしてください",
          },
        ],
      },
    },
    // 翻訳キーはスネークケース
    {
      files: ["src/locales/dictionaries/**/*.ts"],
      rules: {
        "@typescript-eslint/naming-convention": [
          "error",
          {
            selector: "objectLiteralProperty",
            format: ["snake_case"],
            leadingUnderscore: "allow",
            trailingUnderscore: "allow",
          },
        ],
      },
    },
    // 関数コンポーネントの場合は行数が長くてもOK
    {
      files: ["**/*.tsx"],
      rules: {
        "max-lines-per-function": ["off"],
      },
    },
  ],
  rules: {
    /* ---------------- offにしたいルール ---------------- */
    ...Object.fromEntries(
      [
        "no-ternary", // 三項演算子を使ってもOK
        "new-cap", // Interとかが引っかかるので、無効化
        "no-undefined", // undefined使ってOK
        "one-var", // 1行で複数の変数宣言矯正、は無効化
        "func-style", // 関数式矯正、は無効化
        "sort-imports", // importのアルファベット順ソートは無効化
        "sort-keys", // キーのソートは無効化
        "line-comment-position", // コメントの位置がおかしい、を無効化
        "capitalized-comments", // コメントの先頭を大文字にする、を無効化
        "arrow-body-style", // アロー関数の値を {} で囲む、を無効化
        "prefer-destructuring", // デストラクチャリングを必須、を無効化
        "spaced-comment", // コメントの後ろにスペースを入れる必要がない、を無効化
        "no-inline-comments", // インラインコメントNG、を無効化
        "no-nested-ternary", // 三項演算子がネストNG、を無効化
        "no-unused-vars", // 使わない引数指定NG、を無効化
        "no-irregular-whitespace", // 全角スペースを入れてもOK
        "no-lonely-if", // Elseの中にポツンとifを一つ置いてもOK
        "id-length", // 変数名の長さに制限をつける、を無効化
        "camelcase", // どうしても辞書ファイルのキーとかはスネークにしたいので…
        "no-warning-comments", // TODOとかFIXMEとかを使ってもOK
        "import/prefer-default-export", // Prefer default exportというエラーは無効化
        "require-await",
        "unicorn/filename-case", // ファイル名にケバブケース矯正はしない
        "unicorn/prevent-abbreviations", // 名前に短縮形等を使ってもOKにしたいのでOFF
        "unicorn/no-abusive-eslint-disable", // eslint-disableを使ってもOKにしたい
        "@typescript-eslint/require-await", // Asyncな関数の中でawaitを使っていなくてもOK
        "@typescript-eslint/no-misused-promises", // サーバーアクションをpromiseで書いたらform側で怒られるので無効化
        "@typescript-eslint/naming-convention", // Reactコンポーネントの名前がPascalCaseで怒らるので無効化
        "@typescript-eslint/no-floating-promises", // Awaitされない、catchも書かれない（＝thenだけの）Promiseの実行があってもOKとする
        "@typescript-eslint/ban-types", // Type A = {} でも許す。それも型なので
        "@typescript-eslint/explicit-function-return-type", // 最後にsがつくやつとかぶってるので無効化
        "@typescript-eslint/prefer-readonly-parameter-types", // React関数コンポーネントでうまく以下ないケースがあるのでオフってしまう
        "@typescript-eslint/sort-type-constituents", // ソート入らないと思うので無効化
        "react/jsx-sort-props", // propsのソートは無効化
        "react/jsx-no-bind", // onClickに直接関数式書いてOK
        "react/jsx-no-literals", // 文字列を直接書いてもOK
        "react/react-in-jsx-scope", // 「error 'React' must be in scope when using JSX」、を無効化
        "react/jsx-props-no-spreading", // スプレッド演算子をコンポーネントに使えるようにする
        "react/prop-types", // Tsを使うのでprop typesに関する設定は無効化
        "react/destructuring-assignment", // デストラクチャリングを必須、を無効化
        "react/require-default-props", // オプショナルなpropsにデフォルト値を毎回セット、しなくてもよくする
        "react/no-multi-comp", // 1ファイルに複数のコンポーネントを書いてもOK
      ].map((rule) => [rule, "off"]),
    ),
    // コンポーネントにclassName使ってもいいし、classから始まるprops作ってもOK
    "react/forbid-component-props": ["off"],
    "unicorn/no-keyword-prefix": ["off"],
    /*
     * TODO: !!を使ってもOKにしたい
     * "no-implicit-coercion": [
     *   "error",
     *   {
     *     boolean: false, //「!!」を使ってもOK化
     *     number: true,
     *     string: true,
     *   },
     * ],
     *
     * TODO: Boolean(...)を禁止。なぜかうまくいかない
     * "no-restricted-syntax": [
     *   "error",
     *   {
     *     selector: 'CallExpression[callee.name="Boolean"]',
     *     message:
     *       "`Boolean(...)` の代わりに `!!` を使用してください。",
     *   },
     * ],
     */

    /* ---------------- warnにしたいルール ---------------- */
    ...Object.fromEntries(
      [
        "no-console", // console.logを使ってもOK
        "react/jsx-no-useless-fragment", // <></> は使ってもOK
        "react-hooks/exhaustive-deps", // UseEffectの第二引数に依存する変数を入れなくてもOK
        "import/order", // Import順でいちいちエラー出てほしくないので警告にする
        "no-else-return", // Elseを使ってもOK
        "prefer-template", // 文字列結合を使ってもOK
        "unicorn/no-new-array",
      ].map((rule) => [rule, "warn"]),
    ),
    "@typescript-eslint/no-unused-vars": ["warn"],
    "react/jsx-max-depth": ["warn", { max: 5 }], // jsxのネストは5からwarn

    /* ---------------- errorにしたいルール ---------------- */
    ...Object.fromEntries(
      [
        "react-hooks/rules-of-hooks", // Hooksのルール違反はエラーにする
      ].map((rule) => [rule, "error"]),
    ),

    // Jsxを書ける拡張子を設定
    "react/jsx-filename-extension": [
      "error",
      {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    ],

    // Import時に以下の拡張子を省略できるようにする
    "import/extensions": [
      "error",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
        mjs: "never",
      },
    ],

    // 名前つきコンポーネントはfunction、名前なしコンポーネントはアロー関数で書く
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "function-declaration",
        unNamedComponents: "arrow-function",
      },
    ],

    // 開発用・テスト用ファイルでは、devDependenciesからimportしても怒られないようにしたい
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "**/*.spec.ts",
          "**/*.spec.tsx",
          "**/*.test.ts",
          "**/*.test.tsx",
          "**/*.e2e.ts",
          "**/*.stories.ts",
          "**/*.stories.tsx",
          "playwright.config.ts",
        ],
      },
    ],

    // // 静的にimportに制約をつけてあげる
    // "import/no-restricted-paths": [
    //   "error",
    //   {
    //     zones: [
    //       /*
    //        * {
    //        *   from: 'このパスのコードを',
    //        *   except: ['fromから例外的に除外したいパスがあればここに記載する。from からの相対パスである必要があることに注意'],
    //        *   target: 'このパスからimportしたら',
    //        *   message: 'このエラーメッセージを出す',
    //        * },
    //        */
    //     ],
    //   },
    // ],
  },
};
