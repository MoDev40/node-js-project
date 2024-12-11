import { model, Schema, Types } from "mongoose";

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  coverUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: Types.ObjectId,
    ref: "User",
  },
});

const Post = model("Post", postSchema);

export default Post;
