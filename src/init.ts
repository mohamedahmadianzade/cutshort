require("dotenv").config();
import Database from "./database";
import UserModel from "./user/user.model";
import UserRoleModel from "./userRole/userRole.model";
import { uuid } from "uuidv4";
import { exit } from "process";
async function init() {
  await Database.initMongo();
  await UserModel.deleteMany({});
  await UserRoleModel.deleteMany({});
  console.log("All user deleted successfully!");

  const adminUser = await UserModel.create({
    userId: uuid(),
    fullname: "admin user",
    username: "admin",
    password: "admin",
  });
  await UserRoleModel.create({ userId: adminUser.userId, roleId: "admin" });
  await UserRoleModel.create({ userId: adminUser.userId, roleId: "user" });

  console.log("admin user created username:admin password:admin");

  const user = await UserModel.create({
    userId: uuid(),
    fullname: "default user",
    username: "user",
    password: "user",
  });

  await UserRoleModel.create({ userId: user.userId, roleId: "user" });

  console.log("default user created username:user password:user");
  exit(1)
}

init();
