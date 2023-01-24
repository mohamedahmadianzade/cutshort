import { Request, Response } from "express";
import { fail, success } from "../general";
import CommentLogic from "./comment.logic";

const commentLogic = new CommentLogic();

export default class CommentController {
  getAll = async (req: Request, res: Response) => {
    try {
      const result = await commentLogic.getAll(req.query);
      res.json(success(result));
    } catch (error) {
      res.json(fail(error));
    }
  };
  get = async (req: Request, res: Response) => {
    try {
      const result = await commentLogic.getById(req.params?.id);
      res.json(success(result));
    } catch (error) {
      res.json(fail(error));
    }
  };
  create = async (req: Request, res: Response) => {
    try {
      const result = await commentLogic.create(req.body);
      res.json(success(result));
    } catch (error) {
      res.json(fail(error));
    }
  };
  update = async (req: Request, res: Response) => {
    try {
      const result = await commentLogic.update(req.params?.id, req.body);
      res.json(success(result));
    } catch (error) {
      res.json(fail(error));
    }
  };
  delete = async (req: Request, res: Response) => {
    try {
      const result = await commentLogic.delete(req.params?.id);
      res.json(success(result));
    } catch (error) {
      res.json(fail(error));
    }
  };
}
