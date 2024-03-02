// ref: https://qiita.com/takumibv/items/25404be769e72afc9a19
import { NextResponse, type NextRequest } from "next/server";
import { appEnv } from "./appEnv";

// メンテナンスモードの除外ページ。今は空
const maintenanceExclusionPaths = new Set<string>([]);

export const config = {
  /**
   * 画面遷移以外のリクエストを除外するために以下のようなmatcherを設定する
   *
   * これをしないとAPIや静的リソース類（css,画像,ファビコン,svg,etc）などのリクエストもメンテナンス画面にリダイレクトされてしまう挙動をするので注意
   *
   * 逆にapi配下もスルーするようにしているので、画面はメンテナンスモードだけどAPIは使えるので注意
   * それが嫌なら以下から api| を外してしまうか、apiの方では別途違うミドルウェアを作るかする
   */
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};

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
