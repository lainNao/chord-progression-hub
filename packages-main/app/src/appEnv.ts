type ValidatedEnvVars = {
  readonly nodeEnv: NodeJS.ProcessEnv["NODE_ENV"];
  readonly isMaintenanceMode: boolean;
};

/**
 * 環境変数をバリデーションした値を返す
 */
function getValidatedEnvVarsOrThrowError(): ValidatedEnvVars {
  const isMaintenanceMode = Boolean(
    process.env["NEXT_PUBLIC_MAINTENANCE_MODE"] !== undefined &&
      process.env["NEXT_PUBLIC_MAINTENANCE_MODE"] !== "false"
  );

  return {
    nodeEnv: process.env.NODE_ENV,
    isMaintenanceMode,
  };
}

export const appEnv = getValidatedEnvVarsOrThrowError();
