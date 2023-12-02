import { CreatedInfo, UpdatedInfo, IdField } from "./_util";

/**
 * ユーザー
 */
export type User = IdField &
  CreatedInfo &
  UpdatedInfo & {
    name: string;
  };
