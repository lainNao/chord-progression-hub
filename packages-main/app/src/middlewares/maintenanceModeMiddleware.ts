import { NextResponse, type NextRequest } from "next/server";
import { appEnv } from "../wrappers/processEnv";
import type { MiddlewareFactory } from "./stackMiddlewares";

/**
 * メンテナンスモードの対象パス
 *
 * これでフィルタリングしないとAPIや静的リソース類（css,画像,ファビコン,svg,etc）などのリクエストもメンテナンス画面にリダイレクトされてしまう挙動をするので注意
 *
 * 逆にapi配下もスルーするようにしているので、画面はメンテナンスモードだけどAPIは使えるので注意
 * それが嫌なら以下から api| を外してしまうか、apiの方では別途違うミドルウェアを作るかする
 */
const maintenanceExclusionPaths: string[] = [
  "/api",
  "/_next/static",
  "/_next/image",
  "/favicon.ico",
];

/**
 * メンテナンスモードの時にリクエストをメンテナンス画面にリダイレクトするミドルウェア
 *
 * @ref https://qiita.com/takumibv/items/25404be769e72afc9a19
 */
export const maintenanceModeMiddleware: MiddlewareFactory = (next) => {
  // eslint-disable-next-line max-statements
  return async (request: NextRequest, _next) => {
    // 対象外パスの時はそのまま次のミドルウェアへ
    const isExclusionPath = maintenanceExclusionPaths.some((target) =>
      request.nextUrl.pathname.startsWith(target),
    );
    if (isExclusionPath) {
      return next(request, _next);
    }

    // メンテナンスモードでない時は、/maintenance を404にする
    if (!appEnv.isMaintenanceMode) {
      if (request.nextUrl.pathname === "/maintenance") {
        request.nextUrl.pathname = "/404";
        return NextResponse.rewrite(request.nextUrl);
      }
      return next(request, _next);
    }

    // メンテナンスモードの時は、/maintenance にリダイレクトする
    if (request.nextUrl.pathname !== "/maintenance") {
      request.nextUrl.pathname = "/maintenance";
      return NextResponse.rewrite(request.nextUrl);
    }

    return next(request, _next);
  };
};
