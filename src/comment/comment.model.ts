import { model, Schema } from "mongoose";
import IComment from "./comment.interface";
const CommentModel = model<IComment>(
  "comment",
  new Schema({
    userId: { type: String, required: true },
    postId: { type: String, required: true },
    text: { type: String, required: true },
    createDate: { type: Date, default: new Date() },
  })
);

export default CommentModel;
