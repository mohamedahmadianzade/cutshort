import moment from "moment";
import { pagination } from "../general";
import {
  ITodoCreate,
  ITodoUpdate,
  ITodoFilter,
  ITodoOutput,
} from "./todo.interface";
import TodoModel from "./todo.model";
export default class TodoRepository {
  _getAllFilter(filter: ITodoFilter): ITodoFilter {
    const filters: ITodoFilter = {};
    if (filter.completed) filters.completed = filter.completed;
    if (filter.userId) filters.userId = filter.userId;
    if (filter.title) filters.title = filter.title;
    return filters;
  }
  async getAll(filter: ITodoFilter): Promise<ITodoOutput[]> {
    const filters = this._getAllFilter(filter);
    const paginationInfo = pagination(filter.page, filter.pageSize);

    const result = await TodoModel.find(filters)
      .skip(paginationInfo.skip)
      .limit(paginationInfo.limit);
    return result?.map((item) => this._format(item));
  }

  async get(filter: ITodoFilter): Promise<ITodoOutput | null> {
    const result = await TodoModel.findOne(filter);
    return result ? this._format(result) : null;
  }

  async delete(_id: string) {
    const result = await TodoModel.deleteOne({ _id });
    return result.deletedCount;
  }

  async update(_id: string, todoInfo: ITodoUpdate): Promise<ITodoOutput> {
    const todo = await TodoModel.findOne({ _id });
    if (!todo) throw new Error("The record is not exist");

    const { title, description, completed } = todoInfo;

    if (!description && !title && completed === undefined)
      return this._format(todo);
    if (description) todo.description = description;
    if (title) todo.title = title;
    if (completed) todo.completed = completed;

    await todo.save();
    return this._format(todo);
  }
  async create(todo: ITodoCreate): Promise<ITodoOutput> {
    const result = await TodoModel.create(todo);
    return this._format(result);
  }

  _format = (todo: any) => ({
    id: todo._id,
    title: todo.title,
    description: todo.description,
    completed: todo.completed,
    userId: todo.userId,
    createdDate: moment(todo.createDate).format("YYYY-MM-DD HH:mm:ss"),
  });
}
``;
