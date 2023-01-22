import Router, { Response, Request } from "express";
const userRouter = Router();
import UserRepository from "./user.repository";
const userRepository = new UserRepository();
import { success, fail } from "../general";

userRouter.get("/", async (_req: Request, res: Response) => {
  try {
    let users = await userRepository.getAllUsers();
    res.json(success(users));
  } catch (error) {
    res.send(fail(error));
  }
});

userRouter.get("/:userId", async (req: Request, res: Response) => {
  try {
    let users = await userRepository.getByUserId(req.params.userId);
    res.json(success(users));
  } catch (error) {
    res.send(fail(error));
  }
});

export default userRouter;
