import { Response } from "express";
import { fail, success } from "../general";
import CommentLogic from "./comment.logic";

const commentLogic = new CommentLogic();

export default class CommentController {

  create = async (req: any, res: Response) => {
    try {
      const result = await commentLogic.create(req.body,req.user);
      res.json(success(result));
    } catch (error) {
      res.json(fail(error));
    }
  };
  update = async (req: any, res: Response) => {
    try {
      const result = await commentLogic.update(req.params?.id, req.body,req.user);
      res.json(success(result));
    } catch (error) {
      res.json(fail(error));
    }
  };
  delete = async (req: any, res: Response) => {
    try {
      const result = await commentLogic.delete(req.params?.id,req.user);
      res.json(success(result));
    } catch (error) {
      res.json(fail(error));
    }
  };
}
