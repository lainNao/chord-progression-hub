/**
 * 文字列の末尾にある 'spec-${id}' のパターンを見つけ、idかundefinedを返す
 */
function extractSpecId(str) {
  const regex = /spec-(.*?)\)$/;
  const matched = str.match(regex);

  if (!matched) {
    return undefined;
  }

  return matched[1];
}

/**
 * 文字列がチェックリスト項目かどうかを判定する
 * `- [x]` または `- [ ]` で始まる文字列をチェックリスト項目と判定する
 */
function isCheckListItem(str) {
  // チェックリスト項目を検出する正規表現
  const checklistItemStartRegex = /^(?:\s*)- \[(\s|x)\]/;
  const matched = str.match(checklistItemStartRegex);

  if (!matched) {
    return false;
  }

  return true;
}

module.exports = {
  names: ["spec-checklist"],
  description: "チェックリストの末尾には (spec-${id}) を追加してください",
  tags: ["spec", "todo", "list"],
  function: function rule(params, onError) {
    params.lines.forEach((line, lineIndex) => {
      if (!isCheckListItem(line)) {
        return;
      }

      const specId = extractSpecId(line);
      if (specId) {
        // console.log(333, specId);
      } else {
        onError({
          lineNumber: lineIndex + 1,
          context: line,
        });
      }
    });
  },
};
