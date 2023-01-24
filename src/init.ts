require("dotenv").config();
import Database from "./database";
import UserModel from "./user/user.model";
import UserRoleModel from "./userRole/userRole.model";
import { exit } from "process";
import TodoModel from "./todo/todo.model";
import PostModel from "./post/post.model";
import CommentModel from "./comment/comment.model";
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

  const postAdmin1 = await PostModel.create({
    userId: adminUser._id,
    text: " adminUser - text 1 ",
    createDate: new Date(),
  });
  const postAdmin2 = await PostModel.create({
    userId: adminUser._id,
    text: " adminUser - text 2 ",
    createDate: new Date(),
  });

  await CommentModel.create({
    userId: adminUser._id,
    postId: postAdmin1._id,
    text: "post ( text 1) by admin for admin posts",
    createDate: new Date(),
  });

  await CommentModel.create({
    userId: adminUser._id,
    postId: postAdmin1._id,
    text: "post ( text 2) by admin for admin posts",
    createDate: new Date(),
  });

  await CommentModel.create({
    userId: adminUser._id,
    postId: postAdmin2._id,
    text: "post ( text 1) by admin for admin posts",
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

  const userPost1 = await PostModel.create({
    userId: user._id,
    text: " user - text 1 ",
    createDate: new Date(),
  });
  const userPost2 = await PostModel.create({
    userId: user._id,
    text: " user - text 2 ",
    createDate: new Date(),
  });

  await CommentModel.create({
    userId: adminUser._id,
    postId: userPost1._id,
    text: "post (text 1) by admin for user post",
    createDate: new Date(),
  });
  await CommentModel.create({
    userId: adminUser._id,
    postId: userPost2._id,
    text: "post (text 1) by admin for user post",
    createDate: new Date(),
  });

  await CommentModel.create({
    userId: user._id,
    postId: userPost1._id,
    text: "post (text 1) by admin for user post",
    createDate: new Date(),
  });


  console.log("default user created username:user password:user");
  exit(1);
}

init();
