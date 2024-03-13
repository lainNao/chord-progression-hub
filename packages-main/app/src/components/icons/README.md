# iconsフォルダ

- shadcn/uiインストールしたら`radix-ui/react-icons`もくっついてきたので、基本的にはそっちのアイコンを使ってください
- ただし、`radix-ui/react-icons`にないアイコンがあったりもっと別のを使ったりしたい場合は、このフォルダ配下に適当に作ってください

## もしicon-parkを使うなら

- icon-parkは複数色アイコンが使えるので、うまく使えばいい感じにできるかも
- 流れは以下
  - [iconpark](https://iconpark.oceanengine.com/official)にアクセス
    - `Icon theme`は`Multi-color`（これがしたいのでiconparkを使っている）
    - `Linecap`、`LineJoin`は角丸っぽいやつ
  - 好きなアイコンの「Copy SVG」
  - `src/components/icons/`に`アイコン名.tsx`で保存
  - 内部の色を`cssThemeValues`から選んでセット（このcss変数がshadcn/uiに依存しているので、あまり適したのが無いかもだけど…）
  - サイズは`SVG_ICON_CONSTANTS`から選んでセット
