/**
 * ネストされたオブジェクトを「:」つながりのパス文字列の配列にして返す
 *
 * @throws {Error} 対象のオブジェクトが想定外の型の場合
 */
export const extractPaths = (targetObject: object): string[] => {
  const extractPathsInner = ({
    obj,
    currentPath = "",
    result = [],
  }: {
    obj: object;
    currentPath?: string;
    result?: string[];
  }): string[] => {
    Object.entries(obj).forEach(([key, value]) => {
      const newPath = currentPath ? `${currentPath}:${key}` : key;

      if (Array.isArray(value)) {
        value.forEach((v) => {
          result.push(`${newPath}:${String(v)}`);
        });
      } else if (typeof value === "object") {
        // もし対象が更にオブジェクトなら、再帰的にこの関数を呼び出して探索を続けます。
        extractPathsInner({
          obj: value,
          currentPath: newPath,
          result,
        });
      } else {
        throw new Error(
          "対象のオブジェクトが想定外の型です。値はオブジェクトか配列かのどちらかである必要があります。"
        );
      }
    });

    return result;
  };

  return extractPathsInner({
    obj: targetObject,
  });
};
