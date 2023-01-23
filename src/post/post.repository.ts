import { pagination } from "../general";
import IPost, {
  IPostCreate,
  IPostUpdate,
  IPostFilter,
} from "./post.interface";
import PostModel from "./post.model";
export default class PostRepository {
  _getAllFilter(filter: IPostFilter): IPostFilter {
    const filters: IPostFilter = {};
    if (filter.userId) filters.userId = filter.userId;
    return filters;
  }
  async getAll(filter: IPostFilter): Promise<IPost[]> {
    const filters = this._getAllFilter(filter);
    const paginationInfo = pagination(filter.page, filter.pageSize);
    const result = await PostModel.find(filters)
      .skip(paginationInfo.skip)
      .limit(paginationInfo.limit);
    return result;
  }
  async get(filter: IPostFilter): Promise<IPost | null> {
    const result = await PostModel.findOne(filter);
    return result;
  }
  async delete(_id: string) {
    const result = await PostModel.deleteOne({ _id });
    return result.deletedCount;
  }
  async update(_id: string, postInfo: IPostUpdate): Promise<IPost> {
    const post = await PostModel.findOne({ _id });
    if (!post) throw new Error("The record is not exist");
    post.text= postInfo.text;
    post.save();
    return post;
  }
  async create(post: IPostCreate): Promise<IPost> {
    const result = await PostModel.create(post);
    return result;
  }
}
