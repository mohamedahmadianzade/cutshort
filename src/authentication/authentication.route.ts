import Router, { Response, Request } from "express";
import Authentication from "./authentication";
import { success, fail } from "../general";
const authenticationRouter = Router();

authenticationRouter.post("/login", async (req: Request, res: Response) => {
  try {
    let users = await new Authentication().login(req.body);
    res.json(success(users));
  } catch (error) {
    res.send(fail(error));
  }
});

export default authenticationRouter;
