import { pagination } from "../general";
import IComment, {
  ICommentCreate,
  ICommentUpdate,
  ICommentFilter,
} from "./comment.interface";
import CommentModel from "./comment.model";
export default class CommentRepository {
  _getAllFilter(filter: ICommentFilter): ICommentFilter {
    const filters: ICommentFilter = {};
    if (filter.userId) filters.userId = filter.userId;
    if (filter.postId) filters.postId = filter.postId;
    return filters;
  }
  async getAll(filter: ICommentFilter): Promise<IComment[]> {
    const filters = this._getAllFilter(filter);
    const paginationInfo = pagination(filter.page, filter.pageSize);
    const result = await CommentModel.find(filters)
      .skip(paginationInfo.skip)
      .limit(paginationInfo.limit);
    return result;
  }
  async get(filter: ICommentFilter): Promise<IComment | null> {
    const result = await CommentModel.findOne(filter);
    return result;
  }
  async delete(_id: string) {
    const result = await CommentModel.deleteOne({ _id });
    return result.deletedCount;
  }
  async update(_id: string, commentInfo: ICommentUpdate): Promise<IComment> {
    const comment = await CommentModel.findOne({ _id });
    if (!comment) throw new Error("The record is not exist");
    comment.text= commentInfo.text;
    comment.save();
    return comment;
  }
  async create(comment: ICommentCreate): Promise<IComment> {
    const result = await CommentModel.create(comment);
    return result;
  }
}
