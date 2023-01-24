import { fail, success } from "../general";
import { Response } from "express";
import UserLogic from "./user.logic";

const userLogic = new UserLogic();

export default class UserController {
  getAll = async (req: any, res: Response) => {
    try {
      const users = await userLogic.getAllUsers(req.query, req.user);
      res.json(success(users));
    } catch (error) {
      res.send(fail(error));
    }
  };

  get = async (req: any, res: Response) => {
    try {
      const users = await userLogic.getByUserId(req.params.userId, req.user);
      res.json(success(users));
    } catch (error) {
      res.send(fail(error));
    }
  };
  create = async (req: any, res: Response) => {
    try {
      const users = await userLogic.createUser(req.body,req.user);
      res.json(success(users));
    } catch (error) {
      res.send(fail(error));
    }
  };

  userPosts = async (req: any, res: Response) => {
    try {
      const users = await userLogic.getUserPost(req.params.userId, req.user);
      res.json(success(users));
    } catch (error) {
      res.send(fail(error));
    }
  };
  userTodos = async (req: any, res: Response) => {
    try {
      const users = await userLogic.getUserTodos(req.params.userId, req.user);
      res.json(success(users));
    } catch (error) {
      res.send(fail(error));
    }
  };
}
