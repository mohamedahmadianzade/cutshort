import UserLogic from "../user/user.logic";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../env";

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
      token: Authentication.generateToken(user.userId),
    };
  }

  static generateToken(userId: string): string {
    return jwt.sign({ userId }, JWT_SECRET_KEY, {
      expiresIn: "1800s",
    });
  }

  static verifyToken(token: string): any {
    try {
      return jwt.verify(token, JWT_SECRET_KEY);
    } catch (err) {
      throw new Error("Token is invalid");
    }
  }
}

interface LoginResult {
  userId: string;
  token: string;
}
