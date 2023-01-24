import { fail, success } from "../general";
import { Response } from "express";
import TodoLogic from "./todo.logic";

const todoLogic = new TodoLogic();

export default class TodoController {
  getAll = async (req: any, res: Response) => {
    try {
      const result = await todoLogic.getAll(req.query);
      res.json(success(result));
    } catch (error) {
      res.json(fail(error));
    }
  };
  get = async (req: any, res: Response) => {
    try {
      const result = await todoLogic.getById(req.params?.id, req.user);
      res.json(success(result));
    } catch (error) {
      res.json(fail(error));
    }
  };

  create = async (req: any, res: Response) => {
    try {
      const result = await todoLogic.create(req.body, req.user);
      res.json(success(result));
    } catch (error) {
      res.json(fail(error));
    }
  };
  delete = async (req: any, res: Response) => {
    try {
      const result = await todoLogic.delete(req.params?.id, req.user);
      res.json(success(result));
    } catch (error) {
      res.json(fail(error));
    }
  };
  update = async (req: any, res: Response) => {
    try {
      const result = await todoLogic.update(req.params?.id, req.body, req.user);
      res.json(success(result));
    } catch (error) {
      res.json(fail(error));
    }
  };
}
