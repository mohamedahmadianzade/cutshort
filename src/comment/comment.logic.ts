import UserRepository from "../user/user.repository";
import IComment, {
  ICommentFilter,
  ICommentCreate,
  ICommentUpdate,
} from "./comment.interface";
import CommentRepository from "./comment.repository";
import { ObjectId } from "mongodb";
import PostRepository from "../post/post.repository";

const commentRepository = new CommentRepository();
export default class CommentLogic {
  async getAll(filter: ICommentFilter) {
    return commentRepository.getAll(filter);
  }
  async getById(id: string) {
    const _id = this._checkId(id, "CommentId");
    const result = await commentRepository.get({ _id });
    if (!result) throw new Error("Id does not exist");
    return result;
  }
  async get(filter: ICommentFilter) {
    return commentRepository.get(filter);
  }

  async delete(id: string) {
    const _id = this._checkId(id, "CommentId");
    const result = await commentRepository.delete(_id);
    if (!result) throw new Error("This record does not exist");
    return "Record deleted successfully";
  }
  async update(id: string, comment: ICommentUpdate): Promise<IComment> {
    const _id = this._checkId(id, "CommentId");
    return commentRepository.update(_id, comment);
  }

  async create(comment: ICommentCreate): Promise<IComment> {
    if (!comment.text) throw new Error("Please enter a text");
    if (!comment.userId) throw new Error("Please enter a userId");
    if (!comment.postId) throw new Error("Please enter a postId");

    const userInfo = await new UserRepository().getByUserId(comment.userId);
    if (!userInfo) throw new Error("Related user not found");

    this._checkId(comment.postId, "PostId");
    const postInfo = await new PostRepository().get({ _id: comment.postId });
    if (!postInfo) throw new Error("Related post not found");

    const { text, userId, postId } = comment;
    const commentExist = await commentRepository.get({ text, userId, postId });
    if (commentExist) throw new Error("text is repeating");

    return commentRepository.create(comment);
  }

  _checkId(id: string, name: string): string {
    if (!id) throw new Error(`Please enter a valid ${name}`);
    try {
      return new ObjectId(id).toString();
    } catch (error) {
      throw new Error(`${name} is not valid`);
    }
  }
}
