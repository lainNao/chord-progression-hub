const COMMON = {
  VULNERABILITY: [
    "weak password",
    "brute force",
    "rate limit",
    "xss",
    "injection(sql/os command)",
    "csrf",
    "ssrf",
    "open redirect",
    "insecure deserialization",
    "dos",
    "csp",
    "insufficient logging and monitoring",
    "未認証でのアクセス",
    "他人のデータへのアクセス",
  ],
  PERFORMANCE: ["cache"],
  OBSERVABILITY: ["log"],
} as const;

const DB = ["slow query", "n+1"] as const;

const HTTP_LAYER = {
  REQUEST: ["header", "body", "query params"],
  RESPONSE: ["header", "body"],
  ERROR: [
    "400 bad request",
    "403 forbidden",
    "404 not found",
    "500 server error",
    "503 service unavailable",
  ],
} as const;

export const BACK = {
  COMMON,
  DB,
  HTTP_LAYER,
} as const;
