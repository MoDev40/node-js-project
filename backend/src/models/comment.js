import { Types, Schema, model } from "mongoose";

const commentSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  post: {
    type: Types.ObjectId,
    ref: "Post",
  },
});

const Comment = model("Comment", commentSchema);

export default Comment;
