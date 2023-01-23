import IUserRole from "./src/userRole/userRole.interface";
declare global {
  namespace Express {
    export interface Request {
      user: {
        userId: string;
        roles: IUserRole[];
      };
    }
  }
}
