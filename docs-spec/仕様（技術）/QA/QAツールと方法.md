#

## 留意

- <https://engineering.mercari.com/blog/entry/20221206-a9b78f523f/>を参考に、テストをモノレポ的に分離しても良いかも

## テストケース管理

- Qase
  - ドメイン仕様のテストケースを網羅させる。
  - これのIDが全て網羅されているかもツールを作るなどしてチェックを行う。
- packages-dev/commonTestCaseRunners
  - 汎用的なテストケースを網羅させる。Qase等で管理するまでもないが地味に重要なやつを逃さないようにしたい。

## ランナー系

- `一般`
  - playwright
  - jest
  - @storybook/addon-interactions
  - prettier
  - eslint
    - eslint-config-next
    - eslint-plugin-unicorn
    - eslint-plugin-react
    - eslint-plugin-react-hooks
    - eslint-plugin-jsx-a11y
    - eslint-plugin-import
    - eslint-plugin-storybook
    - eslint-plugin-jest
    - eslint-plugin-testing-library
    - typescript-eslint
- `モック`
  - next-router-mock
- `VRT`
  - Chromatic or reg-suit or Playwright
- `a11y`
  - axe-playwright
  - @storybook/addon-a11y
- `ファイル名`
  - lslint
