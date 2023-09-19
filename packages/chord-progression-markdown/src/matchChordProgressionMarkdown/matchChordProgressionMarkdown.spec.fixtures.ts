export const ok = [
  {
    title: "基本的なコード",
    values: [
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
    ],
  },
  {
    title: "分数コード",
    values: ["|C|G/B|F/A|Em/G|"],
  },
  {
    title: "改行コード＆連続バー",
    values: [
      `|C|C|C|C|
      |C|C|C|C|`,
    ],
  },
  {
    title: "1小節に複数のコード",
    values: ["|Bb7-5(9,13),C,C,C|C , C,C,C|"],
  },
  {
    title: "メタ情報つき",
    values: [
      "|(A=B)C|",
      "|(A=B)C|(D=E)F|",
      "|(key=C)C|",
      "|(key=C)C|Dm|G7|C|",
      "|(key=C)C|(key=Eb)Fm7|Bb7|EbM7|",
    ],
  },
  {
    title: "長く複雑なコード進行",
    values: [
      `
      |Aadd9|F#m7|Dm9|Gaug|
      |G6|Aadd9|F#m7|
      
      |Fm9|Bb7(9,13)|EbM9|Ab7b5|AbM7|
      |Bm7|E9|Ebm9|Ab|Gaug7|
      |DbM9|G7b9|CM9|FM7|
      |EM7|E9|Eaug7|Aadd9|
      `,
    ],
  },
];

export const ng = [
  {
    title: "無い",
    values: ["", " "],
  },
  {
    title: "バーのみ",
    values: [
      "|",
      "|\n|", //改行あり
      "||", // 連続バー
      " | | ", // 連続バー
    ],
  },
  {
    title: "バーで閉じない",
    values: ["|C", "|C|C", "C|C|"],
  },
  {
    title: "メタ情報の形式不正",
    values: [
      "|(key=C)(key=C)C|",
      "|(keyC)C|",
      "|(key=)C|",
      "|(key=C=)C|",
      "|(=key=C)C|",
      "|((key=C))C|",
      "|(=)C|",
      "|(=value)C|",
    ],
  },
];
