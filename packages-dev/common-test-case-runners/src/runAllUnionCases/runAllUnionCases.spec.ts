import { runAllUnionCases } from "./runAllUnionCases";

describe("runAllUnionCases", () => {
  // REFACTOR: toHaveBeenCalledWithがまだbun.jestに無かったので後対応
  test("各ケースが、各ケースのキー名が引数で呼ばれる", () => {
    type SomeStringUnionType = "a" | "b" | "c";

    const mockFnA = jest.fn();
    const mockFnB = jest.fn();
    const mockFnC = jest.fn();

    runAllUnionCases<SomeStringUnionType>({
      a: (key) => {
        mockFnA(key);
        expect(key).toBe("a");
      },
      b: (key) => {
        mockFnB(key);
        expect(key).toBe("b");
      },
      c: (key) => {
        mockFnC(key);
        expect(key).toBe("c");
      },
    });

    expect(mockFnA).toHaveBeenCalled();
    expect(mockFnB).toHaveBeenCalled();
    expect(mockFnC).toHaveBeenCalled();
  });
});
