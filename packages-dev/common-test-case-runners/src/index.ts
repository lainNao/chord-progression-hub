import { runAllUnionCases } from "./matchPaths/matchPaths";
import { BACK } from "./testCases/back";
import { FRONT } from "./testCases/front";
import { ObjectToPathsArrayRecursive } from "./types";

export const commonTestCaseRunners = {
  back: {
    common: runAllUnionCases<ObjectToPathsArrayRecursive<typeof BACK.COMMON>>,
    httpLayer: runAllUnionCases<
      ObjectToPathsArrayRecursive<typeof BACK.HTTP_LAYER>
    >,
  },
  front: {
    uiComponent: runAllUnionCases<
      ObjectToPathsArrayRecursive<typeof FRONT.UI_COMPONENT>
    >,
    pages: runAllUnionCases<ObjectToPathsArrayRecursive<typeof FRONT.PAGES>>,
  },
};
