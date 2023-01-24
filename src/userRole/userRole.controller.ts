import { Request, Response } from "express";
import { fail, success } from "../general";
import UserRoleLogic from "./userRole.logic";

const userRoleLogic = new UserRoleLogic();

export default class UserRoleController {
  getAll = async (req: Request, res: Response) => {
    try {
      const result = await userRoleLogic.getAll(req.query);
      res.json(success(result));
    } catch (error) {
      res.json(fail(error));
    }
  };
  delete = async (req: Request, res: Response) => {
    try {
      const result = await userRoleLogic.delete(req.body);
      res.json(success(result));
    } catch (error) {
      res.json(fail(error));
    }
  };
  create = async (req: Request, res: Response) => {
    try {
      const result = await userRoleLogic.create(req.body);
      res.json(success(result));
    } catch (error) {
      res.json(fail(error));
    }
  };
}
