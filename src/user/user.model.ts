import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import IUser from "./user.interface";
import { SALT } from "../config";
const userSchema = new Schema<IUser>({
  fullname: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  enabled: { type: Boolean, required: false, default: true },
  createDate: { type: Date, required: false, default: new Date() },
});
userSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, SALT);
});

const UserModel = model<IUser>("user", userSchema);
export default UserModel;
