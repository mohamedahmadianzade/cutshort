import { IPaginations } from "../general";

export default interface ITodo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  userId: string;
  createDate: Date;
}

export interface IGetAllTodoInput extends IPaginations {
  title?: string;
  completed?: boolean;
  userId?: string;
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
