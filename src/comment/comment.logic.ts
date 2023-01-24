import UserRepository from "../user/user.repository";
import IComment, {
  ICommentFilter,
  ICommentCreate,
  ICommentUpdate,
} from "./comment.interface";
import CommentRepository from "./comment.repository";
import { ObjectId } from "mongodb";
import PostRepository from "../post/post.repository";
import { IRequestUser } from "../authentication/authentication.middleware";
import { accessDenied } from "../authentication/authentication";

const commentRepository = new CommentRepository();
export default class CommentLogic {
  async getAll(filter: ICommentFilter) {
    return commentRepository.getAll(filter);
  }

  async get(filter: ICommentFilter) {
    return commentRepository.get(filter);
  }

  async delete(id: string, requestUser: IRequestUser) {
    const _id = this._checkId(id, "CommentId");

    const currentComment = await commentRepository.get({ _id });

    if (!currentComment) throw new Error("This record does not exist");

    const currentPost = await new PostRepository().get({
      _id: currentComment.postId,
    });

    if (!requestUser.isAdmin && currentPost?.userId !== requestUser.userId)
      accessDenied();

    const result = await commentRepository.delete(_id);
    if (!result) throw new Error("This record does not exist");
    return "Record deleted successfully";
  }
  async update(
    id: string,
    comment: ICommentUpdate,
    requestUser: IRequestUser
  ): Promise<IComment> {
    const _id = this._checkId(id, "CommentId");
    const currentComment = await commentRepository.get({ _id });

    if (!currentComment) throw new Error("This record does not exist");

    const currentPost = await new PostRepository().get({
      _id: currentComment.postId,
    });

    if (!requestUser.isAdmin && currentPost?.userId !== requestUser.userId)
      accessDenied();

    return commentRepository.update(_id, comment);
  }

  async create(
    comment: ICommentCreate,
    requestUser: IRequestUser
  ): Promise<IComment> {
    if (!comment.text) throw new Error("Please enter a text");
    if (!comment.userId) throw new Error("Please enter a userId");
    if (!comment.postId) throw new Error("Please enter a postId");

    // Just admin user can create comment instead of another user
    if (!requestUser.isAdmin && comment.userId != requestUser.userId)
      accessDenied();

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
