import moment from "moment";
import { pagination } from "../general";
import {
  IPostCreate,
  IPostUpdate,
  IPostFilter,
  IPostOutput,
} from "./post.interface";
import PostModel from "./post.model";
export default class PostRepository {
  _getAllFilter(filter: IPostFilter): IPostFilter {
    const filters: IPostFilter = {};
    if (filter.userId) filters.userId = filter.userId;
    return filters;
  }
  async getAll(filter: IPostFilter): Promise<IPostOutput[]> {
    const filters = this._getAllFilter(filter);
    const paginationInfo = pagination(filter.page, filter.pageSize);
    const result = await PostModel.find(filters)
      .skip(paginationInfo.skip)
      .limit(paginationInfo.limit);
    return result?.map((item) => this._format(item));
  }
  async get(filter: IPostFilter): Promise<IPostOutput | null> {
    const result = await PostModel.findOne(filter);
    return result ? this._format(result) : null;
  }
  async delete(_id: string) {
    const result = await PostModel.deleteOne({ _id });
    return result.deletedCount;
  }
  async update(_id: string, postInfo: IPostUpdate): Promise<IPostOutput> {
    const post = await PostModel.findOne({ _id });
    if (!post) throw new Error("The record is not exist");
    post.text = postInfo.text;
    await post.save();
    return this._format(post);
  }
  async create(post: IPostCreate): Promise<IPostOutput> {
    const result = await PostModel.create(post);
    return this._format(result);
  }

  _format = (post: any) => ({
    id: post._id,
    text: post.text,
    userId: post.userId,
    createdDate: moment(post.createDate).format("YYYY-MM-DD HH:mm:ss"),
  });
}
