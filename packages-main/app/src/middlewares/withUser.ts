import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse,
} from "next/server";
import type { MiddlewareFactory } from "./stackMiddlewares";

/**
 * 使うかもしれないので一応残しておく
 */
export const withUser: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const { pathname } = request.nextUrl;

    if (["/profile"].some((path) => pathname.startsWith(path))) {
      const userId = request.cookies.get("userId");
      if (!userId) {
        const url = new URL(`/auth/login`, request.url);
        return NextResponse.redirect(url);
      }
    }
    return next(request, _next);
  };
};
