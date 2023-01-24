import { Router } from "express";
import TodoController from "./todo.controller";

const todoRouter = Router();
const todoController = new TodoController();

todoRouter.get("/", todoController.getAll);
todoRouter.get("/:id", todoController.get);
todoRouter.post("/", todoController.create);
todoRouter.delete("/:id", todoController.delete);
todoRouter.put("/:id", todoController.update);

export default todoRouter;
