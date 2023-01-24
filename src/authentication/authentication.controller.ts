import { Response, Request } from "express";
import Authentication from "./authentication";
import { success, fail } from "../general";

export default class AuthenticationController {
  login = async (req: Request, res: Response) => {
    try {
      const users = await new Authentication().login(req.body);
      res.json(success(users));
    } catch (error) {
      res.send(fail(error));
    }
  };
}
