# icon系コンポーネントの作り方

- [iconpark](https://iconpark.oceanengine.com/official)にアクセス
  - `Icon theme`は`Multi-color`（これがしたいのでiconparkを使っている）
  - `Linecap`、`LineJoin`は角丸っぽいやつ
- 好きなアイコンの「Copy SVG」
- `src/components/icons/`に`アイコン名.tsx`で保存
- propsは`CustomSvgProps`を指定し、それをファイル内で使うようにする
