import type { DictionaryObject } from "../types";
import { japaneseAppDictionary } from "./ja";
import { englishAppDictionary } from "./en";

export const t = {
  ja: japaneseAppDictionary,
  en: englishAppDictionary,
} as const satisfies DictionaryObject;
