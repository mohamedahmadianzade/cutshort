import { Router } from "express";
import { Request, Response } from "express";
import { fail, success } from "../general";
import UserRoleLogic from "./userRole.logic";
const UserRoleRouter = Router();
const userRoleLogic = new UserRoleLogic();
UserRoleRouter.get("/", async (req: Request, res: Response) => {
  try {
    const result = await userRoleLogic.getAll(req.query);
    res.json(success(result));
  } catch (error) {
    res.json(fail(error));
  }
});
UserRoleRouter.delete("/", async (req: Request, res: Response) => {
  try {
    const result = await userRoleLogic.delete(req.body);
    res.json(success(result));
  } catch (error) {
    res.json(fail(error));
  }
});
UserRoleRouter.post("/", async (req: Request, res: Response) => {
  try {
    const result = await userRoleLogic.create(req.body);
    res.json(success(result));
  } catch (error) {
    res.json(fail(error));
  }
});


export default UserRoleRouter;
