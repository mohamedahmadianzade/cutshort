import { Response, NextFunction } from "express";
import { fail } from "../general";
import UserRoleLogic from "../userRole/userRole.logic";
import Authentication from "./authentication";
import { Roles } from "./roles";
const authentication = new Authentication();
export default async function AuthenticationMiddleware(
  req: any,
  res: Response,
  next: NextFunction
) {
  try {
    const authKey = req.headers.Authorization || req.headers.authorization;
    if (!authKey)
      throw new Error("Please provide token in header authorization key");
    const token = authKey.split(" ")[1];
    const { userId } = authentication.verifyToken(token);
    const roles = await new UserRoleLogic().getAll({ userId });
    const user: IRequestUser = {
      userId,
      roles: roles.map((role) => role.roleId),
      isAdmin: roles.find((role) => role.roleId === Roles.admin) != undefined,
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
  isAdmin: boolean;
}
