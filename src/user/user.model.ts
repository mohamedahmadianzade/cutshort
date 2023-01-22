import { Schema, model } from "mongoose";
import IUser from "./user.interface";
const UserModel = model<IUser>(
  "user",
  new Schema<IUser>({
    userId: { type: String, required: true },
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    enabled: { type: Boolean, required: false, default: true },
    createDate: { type: Date, required: false, default: new Date() },
  })
);

export default UserModel;
