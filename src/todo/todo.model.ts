import { model, Schema } from "mongoose";
import ITodo from "./todo.interface";
const TodoModel = model<ITodo>(
  "todo",
  new Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
    createDate: { type: Date, default: new Date() },
  })
);

export default TodoModel;
