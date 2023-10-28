export const getQaseToken = (): string => {
  const value = process.env.QASE_TOKEN;
  if (!value) {
    throw new Error("QASE_TOKEN is not defined");
  }
  return value;
};
