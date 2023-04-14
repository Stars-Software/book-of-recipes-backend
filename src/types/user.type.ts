import { IDataBaseRecord } from "./database-record.type";

export interface IUser extends IDataBaseRecord {
  name: string;
  email: string;
  avatar: string;
}

export interface IUserSignUp extends IUserSignIn {
  name: string;
  avatar: string;
}

export interface IUserSignIn {
  email: string;
  password: string;
}
