import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
} from "../controllers/postController.js";
import auth from "../middlewares/middleware.js";

const router = express.Router();

router.post("/create", auth, createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
export default router;
