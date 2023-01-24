import { Schema, model  } from "mongoose";
import IUserRole from "./userRole.interface";
const UserRoleModel = model<IUserRole>(
  "userRole",
  new Schema<IUserRole>({
    userId: { type: String , required: true },
    roleId: { type: String, required: true },
  })
);

export default UserRoleModel;
