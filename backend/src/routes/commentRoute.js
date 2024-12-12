import express from "express";
import { createComment, getCommentsByPostId } from "../controllers/commentController.js";
import auth from "../middlewares/middleware.js";

const router = express.Router();

router.post("/create", auth, createComment);
router.post("/:id",getCommentsByPostId);
export default router;
