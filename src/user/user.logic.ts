import IPost from "../post/post.interface";
import PostLogic from "../post/post.logic";
import ITodo from "../todo/todo.interface";
import TodoLogic from "../todo/todo.logic";
import { IUserInput, IGetAllUsersInput, IUserOutput } from "./user.interface";
import UserRepository from "./user.repository";
const userRepository = new UserRepository();

export default class UserLogic {
  getAllUsers = (filter: IGetAllUsersInput): Promise<IUserOutput[]> => {
    return userRepository.getAllUsers(filter);
  };
  getByUserId = (userId: string) => {
    this._checkUserId(userId);
    return userRepository.getByUserId(userId);
  };
  createUser = async (user: IUserInput): Promise<IUserOutput> => {
    this._checkCreateUser(user);
    const result = await userRepository.getByUserId(user.username);
    if (result)
      throw new Error(
        `Username ${user.username} is exists, please choose different username`
      );
    return userRepository.createUser(user);
  };

  _checkUserId = (userId: string) => {
    if (!userId) throw new Error(`Please enter valid userId`);
  };
  _checkCreateUser = (user: IUserInput) => {
    if (!user.username) throw new Error(`Please enter username`);
    if (!user.fullname) throw new Error(`Please enter fullname`);
    if (!user.password) throw new Error(`Please enter password`);
    if (user.fullname.length < 5)
      throw new Error(`Minimum fullname must be at least 5 characters`);
    if (user.password.length < 4)
      throw new Error(`Minimum password must be at least 4 characters`);
  };

  login = async (username: string, password: string) => {
    return userRepository.getUser({ username, password });
  };

  getUserPost = async (userId: string): Promise<IPost[]> => {
    this._checkUserId(userId);
    const postLogic = new PostLogic();
    const userPosts = await postLogic.getAll({ userId });
    return userPosts;
  };

  getUserTodos = async (userId: string): Promise<ITodo[]> => {
    this._checkUserId(userId);
    const todoLogic = new TodoLogic();
    const userPosts = await todoLogic.getAll({ userId });
    return userPosts;
  };
}
