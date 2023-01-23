import { Router } from "express";
import { Request, Response } from "express";
import { fail, success } from "../general";
import CommentLogic from "./comment.logic";
const commentRouter = Router();
const commentLogic = new CommentLogic();
commentRouter.get("/", async (req: Request, res: Response) => {
  try {
    const result = await commentLogic.getAll(req.query);
    res.json(success(result));
  } catch (error) {
    res.json(fail(error));
  }
});
commentRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const result = await commentLogic.getById(req.params?.id);
    res.json(success(result));
  } catch (error) {
    res.json(fail(error));
  }
});
commentRouter.post("/", async (req: Request, res: Response) => {
  try {
    const result = await commentLogic.create(req.body);
    res.json(success(result));
  } catch (error) {
    res.json(fail(error));
  }
});
commentRouter.delete("/:id?", async (req: Request, res: Response) => {
  try {
    const result = await commentLogic.delete(req.params?.id);
    res.json(success(result));
  } catch (error) {
    res.json(fail(error));
  }
});
commentRouter.put("/:id?", async (req: Request, res: Response) => {
  try {
    const result = await commentLogic.update(req.params?.id, req.body);
    res.json(success(result));
  } catch (error) {
    res.json(fail(error));
  }
});

export default commentRouter;
