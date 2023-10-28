import { getQaseToken } from "./env";

type GetTestAllCasesResponse = {
  result: {
    entities: {
      id: number;
      title: string;
      description: string;
      suite_id: number;
      behavior: 2 | 3 | unknown;
    }[];
  };
};

export type GetAllTestSuitesResponse = {
  result: {
    entities: {
      id: number;
      title: string;
      description: string;
      parent_id: number;
    }[];
  };
};

/**
 * https://developers.qase.io/reference/introduction-to-the-qase-api
 */
export const qaseApi = {
  getAllTestSuites: async () => {
    return (await (
      await fetch("https://api.qase.io/v1/suite/CPH", {
        headers: {
          Token: getQaseToken(),
          accept: "application/json",
        },
      })
    ).json()) as GetAllTestSuitesResponse;
  },
  getAllCases: async () => {
    return (await (
      await fetch("https://api.qase.io/v1/case/CPH", {
        headers: {
          Token: getQaseToken(),
          accept: "application/json",
        },
      })
    ).json()) as GetTestAllCasesResponse;
  },
};

export const getQaseTestCaseUrl = (testCaseId: number) => {
  return `https://app.qase.io/project/CPH?case=${testCaseId}&previewMode=modal`;
};
