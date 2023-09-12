import { RegexpString } from "./types";

export const META_REGEXP = {
  BAR: "\\|" as RegexpString,
  COMMA: "," as RegexpString,
  SLASH: "/" as RegexpString,
  SPACE: "\\s" as RegexpString,
  NEW_LINE: "(\\r\\n|\\r|\\n)" as RegexpString,
  ENGLISH_OR_NUMBER: "[a-zA-Z0-9]" as RegexpString,
} as const;
