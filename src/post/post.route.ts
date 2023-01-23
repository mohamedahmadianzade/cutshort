import { Router } from "express";
import { Request, Response } from "express";
import { fail, success } from "../general";
import PostLogic from "./post.logic";
const postRouter = Router();
const postLogic = new PostLogic();
postRouter.get("/", async (req: Request, res: Response) => {
  try {
    const result = await postLogic.getAll(req.query);
    res.json(success(result));
  } catch (error) {
    res.json(fail(error));
  }
});
postRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const result = await postLogic.getById(req.params?.id);
    res.json(success(result));
  } catch (error) {
    res.json(fail(error));
  }
});
postRouter.get("/:id/comments", async (req: Request, res: Response) => {
  try {
    const result = await postLogic.getPostComments(req.params?.id);
    res.json(success(result));
  } catch (error) {
    res.json(fail(error));
  }
});
postRouter.post("/", async (req: Request, res: Response) => {
  try {
    const result = await postLogic.create(req.body);
    res.json(success(result));
  } catch (error) {
    res.json(fail(error));
  }
});
postRouter.delete("/:id?", async (req: Request, res: Response) => {
  try {
    const result = await postLogic.delete(req.params?.id);
    res.json(success(result));
  } catch (error) {
    res.json(fail(error));
  }
});
postRouter.put("/:id?", async (req: Request, res: Response) => {
  try {
    const result = await postLogic.update(req.params?.id, req.body);
    res.json(success(result));
  } catch (error) {
    res.json(fail(error));
  }
});

export default postRouter;
