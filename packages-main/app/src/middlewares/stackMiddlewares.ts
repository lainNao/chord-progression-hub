import { type NextMiddleware, NextResponse } from "next/server";

export type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;

const initialTargetIndex = 0;

/**
 * 渡された複数のミドルウェアを実行する
 *
 * @ref https://stackoverflow.com/questions/76603369/how-to-use-multiple-middlewares-in-next-js-using-the-middleware-ts-file
 */
export function stackMiddlewares(
  middlewares: MiddlewareFactory[],
  targetIndex: number = initialTargetIndex,
): NextMiddleware {
  const current = middlewares[targetIndex];
  if (current) {
    const nextIndex = 1;
    const next = stackMiddlewares(middlewares, targetIndex + nextIndex);
    return current(next);
  }
  return () => NextResponse.next();
}
