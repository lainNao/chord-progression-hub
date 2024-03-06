import type { AppTranslationDictionary } from "../types";

export const japaneseAppDictionary = {
  hello_world: "こんにちワールド",
  your_age: ({ age }: { age: number }) => `あなたの年齢は${age}歳です`,
} as const satisfies AppTranslationDictionary;
