import { Response, NextFunction } from "express";
import { fail } from "../general";
import Authentication from "./authentication";
export default function AuthenticationMiddleware(
  req: any,
  res: Response,
  next: NextFunction
) {
  try {
    const authKey = req.headers.authorization;
    if (!authKey) throw new Error("Please provide token in header");
    const token = authKey.split(" ")[1];
    const userId = Authentication.verifyToken(token);
    req.userId = userId;
  } catch (error: any) {
    return res.status(403).json(fail(error));
  }
  next();
}
