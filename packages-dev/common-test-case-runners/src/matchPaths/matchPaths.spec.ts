import t from "bun:test";
import { runAllUnionCases } from "./matchPaths";

t.describe("runAllUnionCases", () => {
  // REFACTOR: toHaveBeenCalledWithがまだbun.jestに無かったので後対応
  t.test("各ケースが、各ケースのキー名が引数で呼ばれる", () => {
    type SomeStringUnionType = "a" | "b" | "c";

    const mockFnA = t.jest.fn();
    const mockFnB = t.jest.fn();
    const mockFnC = t.jest.fn();

    runAllUnionCases<SomeStringUnionType>({
      a: (key) => {
        mockFnA(key);
        t.expect(key).toBe("a");
      },
      b: (key) => {
        mockFnB(key);
        t.expect(key).toBe("b");
      },
      c: (key) => {
        mockFnC(key);
        t.expect(key).toBe("c");
      },
    });

    t.expect(mockFnA).toHaveBeenCalled();
    t.expect(mockFnB).toHaveBeenCalled();
    t.expect(mockFnC).toHaveBeenCalled();
  });
});
