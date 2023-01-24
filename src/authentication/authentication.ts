import UserLogic from "../user/user.logic";
import jwt from "jsonwebtoken";
import { JWT_EXPIRE, JWT_SECRET_KEY } from "../config";
import { IRequestUser } from "./authentication.middleware";
import { Roles } from "./roles";
import { IUserInput, IUserOutput } from "../user/user.interface";
import UserRepository from "../user/user.repository";

const userLogic = new UserLogic();
export default class Authentication {
  async signin({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<LoginResult> {
    if (!username) throw new Error("Please enter a username");
    if (!password) throw new Error("Please enter a password");

    const user = await userLogic.login(username, password);

    return {
      userId: user.userId,
      token: this.generateToken(user.userId),
    };
  }

  async signup(user: IUserInput): Promise<IUserOutput> {
    this._checkCreateUser(user);
    const userRepository = new UserRepository();
    const result = await userRepository.getUser({ username: user.username });
    if (result)
      throw new Error(
        `Username ${user.username} is exists, please choose different username`
      );
    return userRepository.createUser(user);
  }
  me = (userId: string) => {
    return new UserRepository().getByUserId(userId);
  };
  _checkCreateUser = (user: IUserInput) => {
    if (!user.username) throw new Error(`Please enter username`);
    if (!user.fullname) throw new Error(`Please enter fullname`);
    if (!user.password) throw new Error(`Please enter password`);
    if (user.fullname.length < 5)
      throw new Error(`Minimum fullname must be at least 5 characters`);
    if (user.password.length < 4)
      throw new Error(`Minimum password must be at least 4 characters`);
  };

  generateToken(userId: string): string {
    return "Bearer " + jwt.sign({ userId }, JWT_SECRET_KEY, {
      expiresIn: JWT_EXPIRE,
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
