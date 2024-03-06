/**
 * 単なる文字列の翻訳キー
 */
type TranslationKeyOfString = "hello_world";

/**
 * 引数を受け取る関数の翻訳キー
 */
type TranslationKeyOfFunction = {
  your_age: (arg: { age: number }) => string;
};

/**
 * 翻訳キーをまとめた型
 */
export type AppTranslationDictionary = {
  [key in TranslationKeyOfString]: string;
} & TranslationKeyOfFunction;

/**
 * サポートする言語
 */
export type Locales = "ja" | "en";

export type DictionaryObject = {
  [key in Locales]: AppTranslationDictionary;
};
