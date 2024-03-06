import type { AppTranslationDictionary } from "../types";

export const englishAppDictionary: AppTranslationDictionary = {
  hello_world: "hello world",
  your_age: ({ age }: { age: number }) => `your age is ${age}`,
} as const;
