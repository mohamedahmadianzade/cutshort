import { Router } from "express";
import PostController from "./post.controller";

const postRouter = Router();
const postController = new PostController();

postRouter.get("/", postController.getAll);
postRouter.get("/:id", postController.get);
postRouter.post("/", postController.create);
postRouter.delete("/:id", postController.delete);
postRouter.put("/:id", postController.update);
postRouter.get("/:id/comments", postController.postComments);

export default postRouter;
