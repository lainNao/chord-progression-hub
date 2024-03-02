type ValidatedEnvVars = {
  readonly nodeEnv: NodeJS.ProcessEnv["NODE_ENV"];
  readonly appHost: string;
  readonly isMaintenanceMode: boolean;
};

/**
 * 環境変数をバリデーションした値を返す
 */
function getValidatedEnvVarsOrThrowError(): ValidatedEnvVars {
  const appHost = process.env["NEXT_PUBLIC_APP_HOST"];
  if (appHost === undefined || appHost === "") {
    throw new Error("NEXT_PUBLIC_APP_HOST is not set");
  }

  const isMaintenanceMode = Boolean(
    process.env["NEXT_PUBLIC_MAINTENANCE_MODE"] !== undefined &&
      process.env["NEXT_PUBLIC_MAINTENANCE_MODE"] !== "false"
  );

  return {
    nodeEnv: process.env.NODE_ENV,
    appHost,
    isMaintenanceMode,
  };
}

export const appEnv = getValidatedEnvVarsOrThrowError();
