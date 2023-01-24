import Router from "express";
import AuthenticationMiddleware from "../authentication/authentication.middleware";
import UserController from "./user.controller";

const userRouter = Router();
const userController = new UserController();

// if admin has access to all user else just his information
userRouter.get("/", AuthenticationMiddleware, userController.getAll);

// if admin has access to all user else just his information
userRouter.get("/:userId", AuthenticationMiddleware, userController.get);

// just admin user canc create new user
userRouter.post("/",AuthenticationMiddleware, userController.create);

// if admin, has access to all user post else just his post
userRouter.get(
  "/:userId/posts",
  AuthenticationMiddleware,
  userController.userPosts
);

// if admin, has access to all user todos else just his todos
userRouter.get(
  "/:userId/todos",
  AuthenticationMiddleware,
  userController.userTodos
);

export default userRouter;
