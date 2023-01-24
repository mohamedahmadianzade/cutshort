import UserRepository from "../user/user.repository";
import {
  IPostFilter,
  IPostCreate,
  IPostUpdate,
  IPostOutput,
} from "./post.interface";
import PostRepository from "./post.repository";
import { ObjectId } from "mongodb";
import CommentLogic from "../comment/comment.logic";
import IComment from "../comment/comment.interface";
import { IRequestUser } from "../authentication/authentication.middleware";
import { accessDenied } from "../authentication/authentication";

const postRepository = new PostRepository();
export default class PostLogic {
  async getAll(filter: IPostFilter, requestUser: IRequestUser) {
    if (!requestUser.isAdmin) filter.userId = requestUser.userId;
    return postRepository.getAll(filter);
  }
  async getById(id: string, requestUser: IRequestUser) {
    const _id = this._checkId(id);
    const result = await postRepository.get({ _id });
    if (!result) throw new Error("Id does not exist");

    if (!requestUser.isAdmin && result && result.userId !== requestUser.userId)
      accessDenied();

    return result;
  }

  async getPostComments(
    postId: string,
    requestUser: IRequestUser
  ): Promise<IComment[]> {
    this._checkId(postId);
    //check if user is valid to access the post and after tbat, it's comments
    await this.getById(postId, requestUser);
    const result = await new CommentLogic().getAll({ postId });
    return result;
  }
  async get(filter: IPostFilter) {
    return postRepository.get(filter);
  }

  async delete(id: string, requestUser: IRequestUser) {
    const _id = this._checkId(id);

    const currentPost = await postRepository.get({ _id });
    if (
      !requestUser.isAdmin &&
      currentPost &&
      currentPost.userId !== requestUser.userId
    )
      accessDenied();

    const result = await postRepository.delete(_id);
    if (!result) throw new Error("This record does not exist");

    return "Record deleted successfully";
  }

  async update(
    id: string,
    post: IPostUpdate,
    requestUser: IRequestUser
  ): Promise<IPostOutput> {
    const _id = this._checkId(id);
    const currentPost = await postRepository.get({ _id });
    if (
      !requestUser.isAdmin &&
      currentPost &&
      currentPost.userId !== requestUser.userId
    )
      accessDenied();
    return postRepository.update(_id, post);
  }

  async create(
    post: IPostCreate,
    requestUser: IRequestUser
  ): Promise<IPostOutput> {
    if (!post.text) throw new Error("Please enter a text");

    // if there is no userId, so userId will be from the token userId
    // if user is admin then can cerate post for other users
    // else normal user will face the error
    if (!post.userId) post.userId = requestUser.userId;
    else if (!requestUser.isAdmin && post.userId != requestUser.userId)
      accessDenied();

    const userInfo = await new UserRepository().getByUserId(post.userId);
    if (!userInfo) throw new Error("UserId is not valid");

    const { text, userId } = post;
    const postExist = await postRepository.get({ text, userId });
    if (postExist) throw new Error("text is repeating");

    return postRepository.create(post);
  }

  _checkId(id: string): string {
    if (!id) throw new Error("Please enter a valid id");
    try {
      return new ObjectId(id).toString();
    } catch (error) {
      throw new Error("PostId is not valid");
    }
  }
}
