import { model, Schema } from "mongoose";
import IPost from "./post.interface";
const PostModel = model<IPost>(
  "post",
  new Schema({
    userId: { type: String, required: true },
    text: { type: String, required: true },
    createDate: { type: Date, default: new Date() },
  })
);

export default PostModel;
