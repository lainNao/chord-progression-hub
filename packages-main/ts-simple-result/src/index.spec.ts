import { Result } from ".";

describe("Result", () => {
  describe("success", () => {
    test("成功時、valueが入る", () => {
      const result = Result.success(42);
      if (!result.isSuccess) {
        throw new Error("Result should be success");
      }
      expect(result.isSuccess).toBe(true);
      expect(result.value).toBe(42);
    });
  });

  describe("failure", () => {
    test("成功時、errorが入る", () => {
      const error = new Error("Something went wrong");
      const result = Result.failure(error);
      if (result.isSuccess) {
        throw new Error("Result should be failure");
      }
      expect(result.isSuccess).toBe(false);
      expect(result.error).toBe(error);
    });
  });
});
