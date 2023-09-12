import _escapeStringRegexp from "escape-string-regexp";
import { RegexpString } from "./types";

// TODO escapeStringRegexpはここでしか使えないようにリントかける

export const escapeStringRegexp = (str: string): RegexpString => {
  return _escapeStringRegexp(str) as RegexpString;
};
