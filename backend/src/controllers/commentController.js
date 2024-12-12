import Comment from "../models/comment.js";

const createComment = async (req, res) => {
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
};

export { createComment };
