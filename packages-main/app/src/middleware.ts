import { NextResponse, type NextRequest } from "next/server";
import { appEnv } from "./appEnv";

// メンテナンスモードの除外ページ。今は空
const maintenanceExclusionPaths = new Set<string>([]);

export function middleware(request: NextRequest): NextResponse {
  // メンテナンスモードでない時は、/maintenance を404にする
  if (!appEnv.isMaintenanceMode) {
    if (request.nextUrl.pathname === "/maintenance") {
      request.nextUrl.pathname = "/404";
      return NextResponse.rewrite(request.nextUrl);
    }
    return NextResponse.next();
  }

  // メンテナンスモードの対象パスかどうか
  const isMaintenanceTargetPath = !maintenanceExclusionPaths.has(
    request.nextUrl.pathname
  );
  if (isMaintenanceTargetPath) {
    // 繰り返しリダイレクトを防ぐ
    if (request.nextUrl.pathname === "/maintenance") return NextResponse.next();

    // メンテナンス画面へリダイレクト
    return NextResponse.redirect(`${appEnv.appHost}/maintenance`);
  }

  return NextResponse.next();
}
