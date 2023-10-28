const UI_COMPONENT = {
  BASE: ["a11y", "themes", "language", "responsive"],
  EXTRA_STYLE: ["hover", "focus"],
  STATE: [
    "active(open/checked/expanded)",
    "inactive(close/disabled/collapsed)",
    "loading",
    "error",
  ],
  VALUE: [
    "min",
    "max",
    "negative",
    "positive",
    "zero",
    "empty(undefined/null)",
    "large/long",
    "float",
    "special characters/emoji",
    "invalid(NaN/Infinity/etc)",
  ],
  VULNERABILITY: ["xss", "tab nabbing"],
} as const;

const PAGES = {
  ABNORMAL: ["multiple tabs"],
  USER_TYPE: ["logged out(public)", "logged in(free)", "logged in(paid)"],
  STATUS: [
    "400 bad request",
    "403 forbidden",
    "404 not found",
    "500 server error",
    "503 service unavailable",
  ],
  URL_PARAMS: ["query params", "hash param"],
  ACTION: ["page transition", "history back", "submit", "click", "reload"],
  COMMUNICATION: [
    "form submit",
    "form loading",
    "form validation error",
    "API success",
    "API failure",
  ],
  OBSERVABILITY: ["error log"],
  VULNERABILITY: ["open redirect"],
} as const;

export const FRONT = {
  UI_COMPONENT,
  PAGES,
} as const;
