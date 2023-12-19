/**
 * 文字列の末尾にある 'spec-${...}' パターンを見つける正規表現
 */
function getSpecId(str) {
  const regex = /spec-(.*?)\)$/;
  const matched = str.match(regex);

  if (!matched) {
    return undefined;
  }

  return matched[1];
}

module.exports = {
  names: ["spec-checklist"],
  description: "チェックリストの末尾に (spec-${id}) が必要です",
  tags: ["test"],
  function: function rule(params, onError) {
    params.tokens.forEach((token) => {
      if (token.type === "list_item_open") {
        const specId = getSpecId(token.line);
        if (specId) {
          // console.log(333, specId);
        } else {
          onError({
            lineNumber: token.lineNumber,
            context: token.line,
          });
        }
      }
    });
  },
};
