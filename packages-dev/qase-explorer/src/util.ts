import { GetAllTestSuitesResponse } from "./qaseApi";

/**
 * パンくず文字列を作る
 */
export const makeTestSuiteNamesBreadCrumbStringRecursively = (
  suites: GetAllTestSuitesResponse["result"]["entities"]
): {
  [testSuiteId: number]: string;
} => {
  return suites.reduce(
    (cur: { [testSuiteId: number]: string }, targetSuite) => {
      let titles: string[] = [];
      let targetSuiteId = targetSuite.id;
      while (true) {
        const parentSuite = suites.find((suite) => suite.id === targetSuiteId);
        if (parentSuite?.parent_id === undefined) {
          break;
        }
        targetSuiteId = parentSuite?.parent_id;
        titles.push(parentSuite.title);
      }

      return {
        ...cur,
        [targetSuite.id]: titles.reverse().join(" > "),
      };
    },
    {}
  );
};
