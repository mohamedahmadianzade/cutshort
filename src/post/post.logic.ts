import UserRepository from "../user/user.repository";
import IPost, { IPostFilter, IPostCreate, IPostUpdate } from "./post.interface";
import PostRepository from "./post.repository";
import { ObjectId } from "mongodb";
import CommentLogic from "../comment/comment.logic";
import IComment from "../comment/comment.interface";

const postRepository = new PostRepository();
export default class PostLogic {
  async getAll(filter: IPostFilter) {
    return postRepository.getAll(filter);
  }
  async getById(id: string) {
    const _id = this._checkId(id);
    const result = await postRepository.get({ _id });
    if (!result) throw new Error("Id does not exist");
    return result;
  }

  async getPostComments(postId: string): Promise<IComment[]> {
    this._checkId(postId);
    const result = await new CommentLogic().getAll({ postId });
    return result;
  }
  async get(filter: IPostFilter) {
    return postRepository.get(filter);
  }

  async delete(id: string) {
    const _id = this._checkId(id);
    const result = await postRepository.delete(_id);
    if (!result) throw new Error("This record does not exist");
    return "Record deleted successfully";
  }
  async update(id: string, post: IPostUpdate): Promise<IPost> {
    const _id = this._checkId(id);
    return postRepository.update(_id, post);
  }

  async create(post: IPostCreate): Promise<IPost> {
    if (!post.text) throw new Error("Please enter a text");
    if (!post.userId) throw new Error("Please enter a userId");

    const userInfo = await new UserRepository().getByUserId(post.userId, undefined, true);
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
