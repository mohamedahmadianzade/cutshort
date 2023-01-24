import { Router } from "express";
import CommentController from "./comment.controller";

const commentRouter = Router();
const commentController = new CommentController();

commentRouter.post("/", commentController.create);
commentRouter.delete("/:id?", commentController.delete);
commentRouter.put("/:id?", commentController.update);

export default commentRouter;
