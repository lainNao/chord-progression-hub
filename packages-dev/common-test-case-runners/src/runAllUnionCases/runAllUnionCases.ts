/**
 *
 * 指定の文字列のユニオン型の全てのケースを網羅しているかをチェックし、関数を実行する
 *
 * @example
 * type SomeStringUnionType = "a" | "b" | "c"
 *
 * matchPaths<SomeStringUnionType>({
 *   "a": () => {...},
 *   "b": () => {...},
 *   "c": () => {...},
 *   "d": () => {...}, // error
 * })
 */
export const runAllUnionCases = <TStringUnion extends string>(obj: {
  [key in TStringUnion]: (key: string) => void;
}) => {
  Object.entries(obj).forEach(([key, fn]) => {
    if (obj.hasOwnProperty(key)) {
      (fn as (key: string) => void)(key);
    }
  });
};
