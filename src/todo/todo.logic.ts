import UserRepository from "../user/user.repository";
import {
  ITodoFilter,
  ITodoCreate,
  ITodoUpdate,
  ITodoOutput,
} from "./todo.interface";
import TodoRepository from "./todo.repository";
import { ObjectId } from "mongodb";
import { IRequestUser } from "../authentication/authentication.middleware";
import { accessDenied } from "../authentication/authentication";

const todoRepository = new TodoRepository();

export default class TodoLogic {
  async getAll(filter: ITodoFilter, requestUser: IRequestUser) {
    // adding userId to filter makes result items filtered based userId
    if (!requestUser.isAdmin) filter.userId = requestUser.userId;
    return todoRepository.getAll(filter);
  }
  async getById(id: string, requestUser: IRequestUser) {
    const _id = this._checkId(id);
    const result = await todoRepository.get({ _id });
    if (!result) throw new Error("Id does not exist");

    if (!requestUser.isAdmin && result && result.userId !== requestUser.userId)
      accessDenied();

    return result;
  }
  async get(filter: ITodoFilter) {
    return todoRepository.get(filter);
  }

  async delete(id: string, requestUser: IRequestUser) {
    const _id = this._checkId(id);
    const currentTodo = await todoRepository.get({ _id });

    if (
      !requestUser.isAdmin &&
      currentTodo &&
      currentTodo.userId !== requestUser.userId
    )
      accessDenied();

    const result = await todoRepository.delete(_id);
    if (!result) throw new Error("This record does not exist");
    return "Record deleted successfully";
  }
  async update(
    id: string,
    todo: ITodoUpdate,
    requestUser: IRequestUser
  ): Promise<ITodoOutput> {
    const _id = this._checkId(id);

    const currentTodo = await todoRepository.get({ _id });

    if (
      !requestUser.isAdmin &&
      currentTodo &&
      currentTodo.userId !== requestUser.userId
    )
      accessDenied();

    return todoRepository.update(_id, todo);
  }

  async create(
    todo: ITodoCreate,
    requestUser: IRequestUser
  ): Promise<ITodoOutput> {
    if (!todo.title) throw new Error("Please enter a title");
    if (!todo.description) throw new Error("Please enter a description");

    // if there is no userId, so userId will be from the token userId
    // if user is admin then can cerate todo for other users
    // else normal user will face the error
    if (!todo.userId) todo.userId = requestUser.userId;
    else if (!requestUser.isAdmin && todo.userId != requestUser.userId)
      accessDenied();


    const userInfo = await new UserRepository().getByUserId(todo.userId);
    console.log("===");
    console.log(todo.userId);
    if (!userInfo) throw new Error("UserId is not valid");

    const { title, description } = todo;
    const todoexist = await todoRepository.get({ title, description });
    if (todoexist) throw new Error("Title and description are repeating");

    return todoRepository.create(todo);
  }

  _checkId(id: string): string {
    if (!id) throw new Error("Please enter a valid id");
    try {
      return new ObjectId(id).toString();
    } catch (error) {
      throw new Error("TodoId is not valid");
    }
  }
}
