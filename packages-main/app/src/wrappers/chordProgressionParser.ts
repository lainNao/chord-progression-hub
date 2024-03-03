import * as parser from "@lainnao/chord-progression-parser-bundler";

export { type ParsedResult } from "@lainnao/chord-progression-parser-bundler";

export * from "@lainnao/chord-progression-parser-bundler/generatedTypes";

const argumentIndex = 0;
type ParserFirstArgument = Parameters<
  typeof parser.parseChordProgressionString
>[typeof argumentIndex];

/**
 *
 * コード進行の文字列をパースしてASTを返す
 *
 * parseChordProgressionStringは現状内部で使っているRust側でキャッチしないエラーが起こることがあるが、
 * それをキャッチするようにしたラッパー
 */
export function parseChordProgressionString(value: ParserFirstArgument):
  | parser.ParsedResult
  | {
      success: false;
      error: unknown;
    } {
  try {
    return parser.parseChordProgressionString(value);
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
}
