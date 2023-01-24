import { Router } from "express";
import PostController from "../post/post.controller";

const commentRouter = Router();
const postController = new PostController();

commentRouter.get("/", postController.getAll);
commentRouter.get("/:id", postController.get);
commentRouter.post("/", postController.create);
commentRouter.delete("/:id?", postController.delete);
commentRouter.put("/:id?", postController.update);

export default commentRouter;
