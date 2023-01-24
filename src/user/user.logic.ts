import { accessDenied } from "../authentication/authentication";
import { IRequestUser } from "../authentication/authentication.middleware";
import { IPostOutput } from "../post/post.interface";
import PostLogic from "../post/post.logic";
import { ITodoOutput } from "../todo/todo.interface";
import TodoLogic from "../todo/todo.logic";
import { IGetAllUsersInput, IUserOutput } from "./user.interface";
import bcrypt from "bcrypt";
import UserRepository from "./user.repository";
const userRepository = new UserRepository();

export default class UserLogic {
  getAllUsers = (filter: IGetAllUsersInput): Promise<IUserOutput[]> => {
    return userRepository.getAllUsers(filter);
  };

  getByUserId = (userId: string, requestUser: IRequestUser) => {
    this._checkUserId(userId);
    if (!requestUser.isAdmin && userId !== requestUser?.userId) accessDenied();
    return userRepository.getByUserId(userId);
  };

  login = async (username: string, password: string) => {
    const message = "Username and password do not match";
    const user = await userRepository.login(username);
    if (!user) throw new Error(message);
    const passVerify = bcrypt.compareSync(password, user.password);
    console.log(passVerify);
    if (!passVerify) throw new Error(message);
    return user;
  };

  getUserPost = async (
    userId: string,
    requestUser: IRequestUser
  ): Promise<IPostOutput[]> => {
    this._checkUserId(userId);

    if (!requestUser.isAdmin && requestUser.userId !== requestUser.userId)
      accessDenied();

    const postLogic = new PostLogic();
    const userPosts = await postLogic.getAll({ userId }, requestUser);
    return userPosts;
  };

  getUserTodos = async (
    userId: string,
    requestUser: IRequestUser
  ): Promise<ITodoOutput[]> => {
    this._checkUserId(userId);

    if (!requestUser.isAdmin && requestUser.userId !== requestUser.userId)
      accessDenied();

    const todoLogic = new TodoLogic();
    const userTodos = await todoLogic.getAll({ userId });
    return userTodos;
  };

  _checkUserId = (userId: string) => {
    if (!userId) throw new Error(`Please enter valid userId`);
  };
}
