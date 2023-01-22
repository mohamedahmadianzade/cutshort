import UserLogic from "../user/user.logic";
const jwt = require("jsonwebtoken");
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
    return jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: "1800s" });
  }

  static verifyToken(token: string): boolean {
    try {
      return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
      throw new Error("Token is invalid");
    }
  }
}

interface LoginResult {
  userId: string;
  token: string;
}
