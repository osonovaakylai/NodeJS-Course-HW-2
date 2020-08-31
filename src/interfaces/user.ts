import {
  ContainerTypes,
  ValidatedRequestSchema
} from 'express-joi-validation';

export interface IUser {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export interface IUserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
  };
}
