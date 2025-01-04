import express from "express";
import auth from "../middlewares/middleware.js";
import Post from "../models/post.js";

const router = express.Router();

// create post
router.post("/create", auth, async (req, res) => {
  try {
    const { title, coverUrl, tags, content } = req.body;

    const user = req.user;

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
});

// get posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve posts", error: error.message });
  }
});

// get post by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve post", error: error.message });
  }
});

//delete post by id
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== user) {
      return res
        .status(403)
        .json({ message: "You do not have permission to delete this post." });
    }

    await Post.findByIdAndDelete(id);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete post", error: error.message });
  }
});

// update post by id
router.put("/edit/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const user = req.user;

    if (!updateData) {
      return res.status(400).json({ message: "Please provide data to update" });
    }

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== user) {
      return res
        .status(403)
        .json({ message: "You do not have permission to update this post." });
    }

    await Post.findByIdAndUpdate(id, updateData, { new: true });

    res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update post", error: error.message });
  }
});
export default router;
