import { User } from "./User";

export type IdField = {
  id: string;
};

export type CreatedInfo = {
  createdAt: Date;
  createdBy: User;
};

export type UpdatedInfo = {
  updatedAt: Date;
  updatedBy: User;
};
