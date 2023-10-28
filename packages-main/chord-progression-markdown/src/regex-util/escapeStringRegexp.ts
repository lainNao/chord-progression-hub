import _escapeStringRegexp from "escape-string-regexp";
import { RegexpString } from "./regex-util.types";

export const escapeStringRegexp = (str: string): RegexpString => {
  return _escapeStringRegexp(str) as RegexpString;
};
