import Post from "../models/post.js";

const createPost = async (req, res) => {
  const user = req.user;
  try {
    const { title, coverUrl, tags, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required." });
    }

    const post = new Post({ title, coverUrl, tags, content, user });
    await post.save();

    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create post", error: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "name");
    res.status(200).json({ posts });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve posts", error: error.message });
  }
};

export { createPost, getAllPosts };
