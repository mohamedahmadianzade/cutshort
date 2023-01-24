import { Response, Request } from "express";
import Authentication from "./authentication";
import { success, fail } from "../general";

export default class AuthenticationController {
  signin = async (req: Request, res: Response) => {
    try {
      const users = await new Authentication().signin(req.body);
      res.json(success(users));
    } catch (error) {
      res.send(fail(error));
    }
  };
  signup = async (req: Request, res: Response) => {
    try {
      const users = await new Authentication().signup(req.body);
      res.json(success(users));
    } catch (error) {
      res.send(fail(error));
    }
  };
  me = async (req: any, res: Response) => {
    try {
      const users = await new Authentication().me(req.user.userId);
      res.json(success(users));
    } catch (error) {
      res.send(fail(error));
    }
  };
}
