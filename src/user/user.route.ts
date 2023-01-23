import Router, { Response } from "express";
import Authentication from "../authentication/authentication";
import { success, fail } from "../general";
import UserLogic from "./user.logic";
import AuthenticationMiddleware from "../authentication/authentication.middleware";
const userRouter = Router();
const userLogic = new UserLogic();

userRouter.get(
  "/",
  AuthenticationMiddleware,
  async (req: any, res: Response) => {
    try {
      const users = await userLogic.getAllUsers(req.query, req.user);
      res.json(success(users));
    } catch (error) {
      res.send(fail(error));
    }
  }
);

userRouter.get(
  "/:userId",
  AuthenticationMiddleware,
  async (req: any, res: Response) => {
    try {
      const users = await userLogic.getByUserId(req.params.userId, req.user);
      res.json(success(users));
    } catch (error) {
      res.send(fail(error));
    }
  }
);

userRouter.post("/", async (req: any, res: Response) => {
  try {
    const users = await userLogic.createUser(req.body);
    res.json(success(users));
  } catch (error) {
    res.send(fail(error));
  }
});

userRouter.post("/login", async (req: any, res: Response) => {
  try {
    const users = await new Authentication().login(req.body);
    res.json(success(users));
  } catch (error) {
    res.send(fail(error));
  }
});

userRouter.get(
  "/:userId/posts",
  AuthenticationMiddleware,
  async (req: any, res: Response) => {
    try {
      const users = await userLogic.getUserPost(req.params.userId);
      res.json(success(users));
    } catch (error) {
      res.send(fail(error));
    }
  }
);

userRouter.get(
  "/:userId/todos",
  AuthenticationMiddleware,
  async (req: any, res: Response) => {
    try {
      const users = await userLogic.getUserTodos(req.params.userId);
      res.json(success(users));
    } catch (error) {
      res.send(fail(error));
    }
  }
);

export default userRouter;
