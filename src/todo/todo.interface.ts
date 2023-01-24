import { IPaginations } from "../general";

export default interface ITodo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  userId: string;
  createDate: Date;
}

export interface ITodoOutput {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  userId: string;
  createdDate: string;
}

export interface ITodoFilter extends IPaginations {
  _id?: string;
  title?: string;
  completed?: boolean;
  userId?: string;
  description?: string;
}

export interface ITodoCreate {
  title: string;
  description: string;
  userId: string;
}

export interface ITodoUpdate {
  title?: string;
  description?: string;
  completed?: boolean;
}
