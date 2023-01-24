import { Request, Response } from "express";
import { fail, success } from "../general";
import PostLogic from "./post.logic";

const postLogic = new PostLogic();

export default class PostController {
  getAll = async (req: Request, res: Response) => {
    try {
      const result = await postLogic.getAll(req.query);
      res.json(success(result));
    } catch (error) {
      res.json(fail(error));
    }
  };
  get = async (req: Request, res: Response) => {
    try {
      const result = await postLogic.getById(req.params?.id);
      res.json(success(result));
    } catch (error) {
      res.json(fail(error));
    }
  };
  create = async (req: Request, res: Response) => {
    try {
      const result = await postLogic.create(req.body);
      res.json(success(result));
    } catch (error) {
      res.json(fail(error));
    }
  };
  delete = async (req: Request, res: Response) => {
    try {
      const result = await postLogic.delete(req.params?.id);
      res.json(success(result));
    } catch (error) {
      res.json(fail(error));
    }
  };
  update = async (req: Request, res: Response) => {
    try {
      const result = await postLogic.update(req.params?.id, req.body);
      res.json(success(result));
    } catch (error) {
      res.json(fail(error));
    }
  };
  postComments = async (req: Request, res: Response) => {
    try {
      const result = await postLogic.getPostComments(req.params?.id);
      res.json(success(result));
    } catch (error) {
      res.json(fail(error));
    }
  };
}
