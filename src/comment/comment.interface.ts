import { IPaginations } from "../general";

export default interface IComment {
  _id: string;
  text: string;
  userId: string;
  postId: string;
  createDate: Date;
}

export interface ICommentFilter extends IPaginations {
  userId?: string;
  postId?: string;
  _id?: string;
  text?: string;
}

export interface ICommentCreate {
  text: string;
  userId: string;
  postId: string;
}

export interface ICommentUpdate {
  text: string;
}
