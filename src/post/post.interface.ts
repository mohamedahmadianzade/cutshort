import { IPaginations } from "../general";

export default interface IPost {
  _id: string;
  text: string;
  userId: string;
  createDate: Date;
}

export interface IPostFilter extends IPaginations {
  userId?: string;
  _id?: string;
  text?: string;
}

export interface IPostCreate {
  text: string;
  userId: string;
}

export interface IPostUpdate {
  text: string;
}
