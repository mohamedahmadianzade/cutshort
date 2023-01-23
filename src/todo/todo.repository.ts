// @ts-nocheck
import { pagination } from "../general";
import ITodo, {
  IGetAllTodoInput,
  ITodoCreate,
  ITodoUpdate,
} from "./todo.interface";
import TodoModel from "./todo.model";
import { ObjectId } from "mongodb";
export default class TodoRepository {
  _getAllFilter(filter: IGetAllTodoInput): IGetAllTodoInput {
    const filters: IGetAllTodoInput = {};
    if (filter.completed) filters.completed = filter.completed;
    if (filter.userId) filters.userId = filter.userId;
    if (filter.title) filters.title = filter.title;
    return filters;
  }
  async getAll(filter: IGetAllTodoInput): Promise<ITodo[]> {
    const filters = this._getAllFilter(filter);
    const paginationInfo = pagination(filter.page, filter.pageSize);
    const result = await TodoModel.find(filters)
      .skip(paginationInfo.skip)
      .limit(paginationInfo.limit);
    return result;
  }
  async get(filter: any): Promise<ITodo> {
    const result = await TodoModel.findOne(filter);
    return result;
  }
  async delete(_id: string) {
    const result = await TodoModel.deleteOne({ _id });
    return result.deletedCount;
  }
  async update(_id: string, todoInfo: ITodoUpdate): ITodo {
    const todo = await TodoModel.findOne({ _id });
    if (!todo) throw new Error("The record is not exist");
    if (!todoInfo.description && !todoInfo.title) return todo;
    if (todoInfo.description) todo.description = todoInfo.description;
    if (todoInfo.title) todo.title = todoInfo.title;
    if (todoInfo.completed) todo.completed = todoInfo.completed;

    todo.save();
    return todo;
  }
  async create(todo: ITodoCreate): ITodo {
    const result = await TodoModel.create(todo);
    return result;
  }
}
