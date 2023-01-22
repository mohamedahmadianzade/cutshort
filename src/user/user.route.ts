import Router, { Response, Request } from "express";
import Authentication from "../authentication/authentication";
import AuthenticationMiddleware from "../authentication/authentication.middleware";
import { success, fail } from "../general";
import UserLogic from "./user.logic";

const userRouter = Router();
const userLogic = new UserLogic();

userRouter.get(
  "/",
  AuthenticationMiddleware,
  async (req: Request, res: Response) => {
    try {
      let users = await userLogic.getAllUsers(req.query);
      res.json(success(users));
    } catch (error) {
      res.send(fail(error));
    }
  }
);

userRouter.get("/:userId", async (req: Request, res: Response) => {
  try {
    let users = await userLogic.getByUserId(req.params.userId);
    res.json(success(users));
  } catch (error) {
    res.send(fail(error));
  }
});

userRouter.post("/", async (req: Request, res: Response) => {
  try {
    let users = await userLogic.createUser(req.body);
    res.json(success(users));
  } catch (error) {
    res.send(fail(error));
  }
});

userRouter.post("/login", async (req: Request, res: Response) => {
  try {
    let users = await new Authentication().login(req.body);
    res.json(success(users));
  } catch (error) {
    res.send(fail(error));
  }
});

export default userRouter;
