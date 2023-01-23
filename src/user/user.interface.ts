import { IPaginations } from "../general";

export default interface IUser {
  userId: string;
  fullname: string;
  username: string;
  password: string;
  enabled?: boolean;
  createDate?: Date;
}

export interface IGetAllUsersInput extends IPaginations {
  username?: string;
  enabled?: boolean;
  fullname?: string;
  userId?: string;
}

export interface IUserOutput {
  userId: string;
  fullname: string;
  username: string;
  createDate: string;
}
export interface IUserInput {
  fullname: string;
  username: string;
  password: string;
}


