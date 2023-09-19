export const ok = [
  // 基本的なコード
  "|C|",
  "|   C   |",
  "|Cm|",
  "|CM|",
  "|CM7|",
  "|Bbm|",
  "|Bbm|",
  "|Bbm7|",
  "|Bbmb5|",
  "|Bbdim7|",
  "|Bbm7-5|",
  "|Bbm13|",
  "|Bbaug13|",
  "|Bb7(9,13)|",
  "|Bb7-5(9,13)|",

  // 分数コード
  "|C|G/B|F/A|Em/G|",

  // 改行コード&連続バー
  `|C|C|C|C|
    |C|C|C|C|`,

  // csv
  "|Bb7-5(9,13),C,C,C|C , C,C,C|",

  // メタ情報あり
  "|(key=C)C|Dm|G7|C|",
  "|(key=C)C|(key=Eb)Fm7|Bb7|EbM7|",

  // 長い
  `
  |Aadd9|F#m7|Dm9|Gaug|
  |G6|Aadd9|F#m7|
  
  |Fm9|Bb7(9,13)|EbM9|Ab7b5|AbM7|
  |Bm7|E9|Ebm9|Ab|Gaug7|
  |DbM9|G7b9|CM9|FM7|
  |EM7|E9|Eaug7|Aadd9|
  `,
];

export const ng = [
  {
    title: "無い",
    value: "",
  },
  {
    title: "空白",
    value: " ",
  },
  {
    title: "バーのみ",
    value: "|",
  },
  {
    title: "バーのみ(改行あり)",
    value: "|\n|",
  },
  {
    title: "バーのみ（2つ連続）",
    value: "||",
  },
  {
    title: "バーで閉じない",
    value: "|C",
  },
  {
    title: "バーで閉じない",
    value: "|C|C",
  },
  {
    title: "メタ情報がキーバリュー形式でない",
    value: "|(key=C=)C|",
  },
  {
    title: "メタ情報がキーバリュー形式でない",
    value: "|(keyC)C|",
  },
  {
    title: "メタ情報の形式がおかしい",
    value: "|(=)C|",
  },
  {
    title: "メタ情報の形式がおかしい",
    value: "|(key=)C|",
  },
  {
    title: "メタ情報の形式がおかしい",
    value: "|(=value)C|",
  },
  {
    title: "メタ情報が２つある",
    value: "|(key=C)(key=C)C|",
  },
];
