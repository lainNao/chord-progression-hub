import _escapeStringRegexp from "escape-string-regexp";
import { RegexpString } from "./regex-util.types";

// TODO(refactor) escapeStringRegexpはここでしか使えないようにリントかける

export const escapeStringRegexp = (str: string): RegexpString => {
  return _escapeStringRegexp(str) as RegexpString;
};
