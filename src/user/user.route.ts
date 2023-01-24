import Router from "express";
import AuthenticationMiddleware, {
  AdminAccess,
} from "../authentication/authentication.middleware";
import UserController from "./user.controller";

const userRouter = Router();
const userController = new UserController();

// Just admin user can do it
userRouter.get("/", AdminAccess, userController.getAll);

// if admin has access to all user else just his information
userRouter.get("/:userId", AuthenticationMiddleware, userController.get);
userRouter.get("/me", AuthenticationMiddleware, userController.me);


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
