import UserLogic from "../user/user.logic";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config";
import { IRequestUser } from "./authentication.middleware";
import { Roles } from "./roles";

const userLogic = new UserLogic();
export default class Authentication {
  async login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<LoginResult> {
    if (!username) throw new Error("Please enter a username");
    if (!password) throw new Error("Please enter a password");
    const user = await userLogic.login(username, password);
    if (!user) throw new Error("Username or password is incorrect");

    return {
      userId: user.userId,
      token: this.generateToken(user.userId),
    };
  }

  generateToken(userId: string): string {
    return jwt.sign({ userId }, JWT_SECRET_KEY, {
      expiresIn: "1800s",
    });
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, JWT_SECRET_KEY);
    } catch (err) {
      throw new Error("Token is invalid");
    }
  }

  static isAdminUser(user?: IRequestUser): boolean {
    return user?.roles?.includes(Roles.admin) || false;
  }
}

interface LoginResult {
  userId: string;
  token: string;
}


export const accessDenied = () => {
  throw new Error("Access denied, you can just access/modify your information");
};