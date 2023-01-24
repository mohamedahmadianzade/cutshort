import { pagination } from "../general";
import ITodo, { ITodoCreate, ITodoUpdate, ITodoFilter } from "./todo.interface";
import TodoModel from "./todo.model";
export default class TodoRepository {
  _getAllFilter(filter: ITodoFilter): ITodoFilter {
    const filters: ITodoFilter = {};
    if (filter.completed) filters.completed = filter.completed;
    if (filter.userId) filters.userId = filter.userId;
    if (filter.title) filters.title = filter.title;
    return filters;
  }
  async getAll(
    filter: ITodoFilter,
  ): Promise<ITodo[]> {
    const filters = this._getAllFilter(filter);
    const paginationInfo = pagination(filter.page, filter.pageSize);

    const result = await TodoModel.find(filters)
      .skip(paginationInfo.skip)
      .limit(paginationInfo.limit);
    return result;
  }

  async get(filter: ITodoFilter): Promise<ITodo | null> {
    const result = await TodoModel.findOne(filter);
    return result;
  }

  async delete(_id: string) {
    const result = await TodoModel.deleteOne({ _id });
    return result.deletedCount;
  }
  
  async update(_id: string, todoInfo: ITodoUpdate): Promise<ITodo> {
    const todo = await TodoModel.findOne({ _id });
    if (!todo) throw new Error("The record is not exist");

    const { title, description, completed } = todoInfo;

    if (!description && !title && completed === undefined) return todo;
    if (description) todo.description = description;
    if (title) todo.title = title;
    if (completed) todo.completed = completed;

    todo.save();
    return todo;
  }
  async create(todo: ITodoCreate): Promise<ITodo> {
    const result = await TodoModel.create(todo);
    return result;
  }
}
