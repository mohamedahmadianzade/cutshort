require("dotenv").config();
import Database from "./database";
import UserModel from "./user/user.model";
import UserRoleModel from "./userRole/userRole.model";
import { exit } from "process";
import TodoModel from "./todo/todo.model";
// import bcrypt from "bcrypt";
// import { SALT } from "./config";
async function init() {
  await Database.initMongo();
  await UserModel.deleteMany({});
  await UserRoleModel.deleteMany({});
  console.log("All user deleted successfully!");

  const adminUser = await UserModel.create({
    fullname: "admin user",
    username: "admin",
    password: "admin",
  });
  await UserRoleModel.create({ userId: adminUser._id, roleId: "admin" });
  await UserRoleModel.create({ userId: adminUser._id, roleId: "user" });

  await TodoModel.create({
    userId: adminUser._id,
    title: "admin user - title 1 - completed",
    description: "admin user - desc 1 - completed",
    completed: true,
    createDate: new Date(),
  });
  await TodoModel.create({
    userId: adminUser._id,
    title: "admin user - title 1 - false",
    description: "admin user - desc 1 - false",
    completed: false,
    createDate: new Date(),
  });

  console.log("admin user created username:admin password:admin");

  const user = await UserModel.create({
    fullname: "default user",
    username: "user",
    password: "user",
  });

  await UserRoleModel.create({ userId: user._id, roleId: "user" });



  await TodoModel.create({
    userId: user._id,
    title: " user - title 1 - completed",
    description: " user - desc 1 - completed",
    completed: true,
    createDate: new Date(),
  });
  await TodoModel.create({
    userId: user._id,
    title: " user - title 1 - false",
    description: " user - desc 1 - false",
    completed: false,
    createDate: new Date(),
  });


  console.log("default user created username:user password:user");
  exit(1);
}

init();
