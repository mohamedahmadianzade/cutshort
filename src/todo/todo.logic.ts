import UserRepository from "../user/user.repository";
import ITodo, {
  IGetAllTodoInput,
  ITodoCreate,
  ITodoUpdate,
} from "./todo.interface";
import TodoRepository from "./todo.repository";
import { ObjectId } from "mongodb";

const todoRepository = new TodoRepository();
export default class TodoLogic {
  async getAll(filter: IGetAllTodoInput) {
    return todoRepository.getAll(filter);
  }
  async getById(id: string) {
    const _id = this._checkId(id);
    return todoRepository.get({ _id });
  }
  async delete(id: string) {
    const _id = this._checkId(id);
    const result = await todoRepository.delete(_id);
    if (!result) throw new Error("This record does not exist");
    return "Record deleted successfully";
  }
  async update(id: string, todo: ITodoUpdate): Promise<ITodo> {
    const _id = this._checkId(id);
    return todoRepository.update(_id, todo);
  }

  async create(todo: ITodoCreate): Promise<ITodo> {
    if (!todo.title) throw new Error("Please enter a title");
    if (!todo.description) throw new Error("Please enter a description");
    if (!todo.userId) throw new Error("Please enter a userId");

    const userInfo = await new UserRepository().getByUserId(todo.userId);
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
