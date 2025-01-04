import express from "express";
import auth from "../middlewares/middleware.js";
import Comment from "../models/comment.js";

const router = express.Router();

// create comment specific post
router.post("/create", auth, async (req, res) => {
  try {
    const { message, post } = req.body;

    if (!message || !post) {
      return res
        .status(400)
        .json({ error: "Message and Post ID are required." });
    }

    const newComment = new Comment({ message, post });
    await newComment.save();

    res
      .status(201)
      .json({ message: "Comment created successfully.", comment: newComment });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating comment.", details: error.message });
  }
});

// Get comments by post id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Post ID is required." });
    }

    const comments = await Comment.find({ post: id }).populate("post", "title");

    res.status(200).json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching comments.", details: error.message });
  }
});
export default router;
