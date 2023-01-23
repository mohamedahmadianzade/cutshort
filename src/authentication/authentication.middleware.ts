import { Response, NextFunction } from "express";
import { fail } from "../general";
import UserRoleLogic from "../userRole/userRole.logic";
import Authentication from "./authentication";
const authentication = new Authentication();
export default async function AuthenticationMiddleware(
  req: any,
  res: Response,
  next: NextFunction
) {
  try {
    const authKey = req.headers.authorization;
    if (!authKey) throw new Error("Please provide token in header");
    const token = authKey.split(" ")[1];
    const { userId } = authentication.verifyToken(token);
    const roles = await new UserRoleLogic().getAll({ userId });
    const user: IRequestUser = {
      userId,
      roles: roles.map((role) => role.roleId),
    };
    req.user = user;
  } catch (error: any) {
    return res.status(403).json(fail(error));
  }
  next();
}

export interface IRequestUser {
  userId: string;
  roles: (string | undefined)[];
}
