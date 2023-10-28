export type Result<TValue> =
  | {
      isSuccess: true;
      value: TValue;
    }
  | {
      isSuccess: false;
      error: Error;
    };

export const Result = {
  success: <TValue>(value: TValue): Result<TValue> => ({
    isSuccess: true,
    value,
  }),
  failure: (error: Error): Result<never> => ({
    isSuccess: false,
    error,
  }),
};
