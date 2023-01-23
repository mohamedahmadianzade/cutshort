import { Router } from "express";
import { Request, Response } from "express";
import { fail, success } from "../general";
import TodoLogic from "./todo.logic";
const todoRouter = Router();
const todoLogic = new TodoLogic();
todoRouter.get("/", async (req: Request, res: Response) => {
  try {
    const result = await todoLogic.getAll(req.query);
    res.json(success(result));
  } catch (error) {
    res.json(fail(error));
  }
});
todoRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const result = await todoLogic.getById(req.params?.id);
    res.json(success(result));
  } catch (error) {
    res.json(fail(error));
  }
});
todoRouter.post("/", async (req: Request, res: Response) => {
  try {
    const result = await todoLogic.create(req.body);
    res.json(success(result));
  } catch (error) {
    res.json(fail(error));
  }
});
todoRouter.delete("/:id?", async (req: Request, res: Response) => {
  try {
    const result = await todoLogic.delete(req.params?.id);
    res.json(success(result));
  } catch (error) {
    res.json(fail(error));
  }
});
todoRouter.put("/:id?", async (req: Request, res: Response) => {
  try {
    const result = await todoLogic.update(req.params?.id, req.body);
    res.json(success(result));
  } catch (error) {
    res.json(fail(error));
  }
});

export default todoRouter;
