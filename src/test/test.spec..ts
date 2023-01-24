import request from "supertest";
import { assert, expect } from "chai";
import app from "../app";
import Database from "../database";
import UserModel from "../user/user.model";

const username = "user",
  password = "user";
require("dotenv").config();
before(async () => {
  await Database.initMongo();
  await UserModel.deleteMany({ username });
});

let userToken = "",
  userId = "";
describe("Cutshot project - Authenticaion Module", function () {
  it("Create new user", async function () {
    const userInfo = await request(app)
      .post("/signUp")
      .send({ username, password, fullname: "mohamed" });
    assert.equal(userInfo.body.success, true);
    userId = userInfo.body.data.userId;
  });
  it("Login and get jwtToken", async function () {
    const userInfo = await request(app)
      .post("/signIn")
      .send({ username: "user", password: "user" });
    assert.equal(userInfo.body.success, true);
    assert.exists(userInfo.body.data.token);
    userToken = userInfo.body.data.token;
  });
  it("call /me to get user information", async function () {
    const userInfo = await request(app)
      .get("/me")
      .set("Authorization", userToken)
      .send({ username: "user", password: "user" });
    assert.equal(userInfo.body.success, true);
    assert.equal(userInfo.body.data.username, username);
  });
});

let postId = "";
describe("Cutshort Project - Post Module", () => {
  it("Creaet user Post", async () => {
    const posts = await request(app)
      .post("/posts/")
      .send({
        userId,
        text: "new post",
      })
      .set("authorization", userToken);
    expect(posts.body.success).to.equal(true);
    postId = posts.body.data.id;
  });
  it("Get all user Post - user must have 1 post", async () => {
    const posts = await request(app)
      .get("/posts/")
      .set("authorization", userToken);
    expect(posts.body.data.length).to.not.equal(0);
  });
  it("Update user post - updated text should has updated value", async () => {
    const posts = await request(app)
      .put(`/posts/${postId}`)
      .send({ text: "updated" })
      .set("authorization", userToken);
    expect(posts.body.data.text).to.equal("updated");
  });
  // it("Delete user post ", async () => {
  //   const posts = await request(app)
  //     .delete(`/posts/${postId}`)
  //     .set("authorization", userToken);
  //   expect(posts.body.success).to.equal(true);
  // });
});

describe("Cutshort Project - Todo Module", () => {
  let todoId = "";
  it("Creaet user Todo", async () => {
    const result = await request(app)
      .post("/todos/")
      .send({
        userId,
        title: "new todo title",
        description: "new todo description",
      })
      .set("authorization", userToken);
    expect(result.body.success).to.equal(true);
    todoId = result.body.data.id;
  });
  it("Get all user todo - user must have 1 todo", async () => {
    const result = await request(app)
      .get("/todos/")
      .set("authorization", userToken);
    expect(result.body.data.length).to.not.equal(0);
  });
  it("Update user todo - updated title should has updated value", async () => {
    const result = await request(app)
      .put(`/todos/${todoId}`)
      .send({ title: "updated" })
      .set("authorization", userToken);
    expect(result.body.data.title).to.equal("updated");
  });
  it("Delete user todo ", async () => {
    const result = await request(app)
      .delete(`/todos/${todoId}`)
      .set("authorization", userToken);
    expect(result.body.success).to.equal(true);
  });
});

describe("Cutshort Project - Comment Module", () => {
  let commentId = "";
  it("Create user comment", async () => {
    const result = await request(app)
      .post("/comments/")
      .send({
        userId,
        postId,
        text: "new comment text",
      })
      .set("authorization", userToken);
    expect(result.body.success).to.equal(true);
    commentId = result.body.data.id;
  });

  it("Get Post comments - should have at least 1 comments", async () => {
    const result = await request(app)
      .get(`/posts/${postId}/comments`)
      .set("authorization", userToken);
    expect(result.body.success).to.equal(true);
    expect(result.body.data.length).to.not.equal(0);
  });
  it("Delete user comments ", async () => {
    const result = await request(app)
      .delete(`/comments/${commentId}`)
      .set("authorization", userToken);
    expect(result.body.success).to.equal(true);
  });
});


