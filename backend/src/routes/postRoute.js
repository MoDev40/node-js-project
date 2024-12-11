import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
} from "../controllers/postController.js";
import auth from "../middlewares/middleware.js";

const router = express.Router();

router.post("/create", auth, createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.get("/delete/:id", auth, deletePost);
export default router;
