import moment from "moment";
import { pagination } from "../general";
import {
  ICommentCreate,
  ICommentUpdate,
  ICommentFilter,
  ICommentOutput,
} from "./comment.interface";
import CommentModel from "./comment.model";
export default class CommentRepository {
  _getAllFilter(filter: ICommentFilter): ICommentFilter {
    const filters: ICommentFilter = {};
    if (filter.userId) filters.userId = filter.userId;
    if (filter.postId) filters.postId = filter.postId;
    return filters;
  }
  async getAll(filter: ICommentFilter): Promise<ICommentOutput[]> {
    const filters = this._getAllFilter(filter);
    const paginationInfo = pagination(filter.page, filter.pageSize);
    const result = await CommentModel.find(filters)
      .skip(paginationInfo.skip)
      .limit(paginationInfo.limit);
    return result?.map((item) => this._format(item));
  }
  async get(filter: ICommentFilter): Promise<ICommentOutput | null> {
    const result = await CommentModel.findOne(filter);
    return result ? this._format(result) : null;
  }
  async delete(_id: string) {
    const result = await CommentModel.deleteOne({ _id });
    return result.deletedCount;
  }
  async update(
    _id: string,
    commentInfo: ICommentUpdate
  ): Promise<ICommentOutput> {
    const comment = await CommentModel.findOne({ _id });
    if (!comment) throw new Error("The record is not exist");
    comment.text = commentInfo.text;
    await comment.save();
    return this._format(comment);
  }
  async create(comment: ICommentCreate): Promise<ICommentOutput> {
    const result = await CommentModel.create(comment);
    return this._format(result);
  }

  _format = (comment: any) => ({
    id: comment._id,
    text: comment.text,
    userId: comment.userId,
    postId: comment.postId,
    createdDate: moment(comment.createDate).format("YYYY-MM-DD HH:mm:ss"),
  });
}
