import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";

export interface IUser {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export interface IGroup {
  id: string;
  name: string;
  permissions: string[];
  setUsers: (users: IUser[]) => Promise<any>;
}

export interface IUserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
  };
}

export interface IGroupRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    name: string;
    permissions: string[];
  };
}
