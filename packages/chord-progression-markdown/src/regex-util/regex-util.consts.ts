import { RegexpString } from "./regex-util.types";

export const META_REGEXP = {
  BAR: "\\|" as RegexpString,
  COMMA: "," as RegexpString,
  SLASH: "/" as RegexpString,
  SPACE: "\\s" as RegexpString,
  NEW_LINE: "(\\r\\n|\\r|\\n)" as RegexpString,
  ENGLISH_OR_NUMBER: "[a-zA-Z0-9]" as RegexpString,
} as const;

export const CHORD_REGEXP = {
  CHORD: "([A-G])" as RegexpString,
  SHARP_FLAT: "(#|b)" as RegexpString,
  TYPE: "(m|M|aug|dim|add|sus2|sus4)" as RegexpString,
  MODIFIER:
    "(2|3|b3|4|b5|-5|5|#5|b6|6|7|b9|9|#9|b11|11|#11|b13|13|#13)" as RegexpString,
} as const;
