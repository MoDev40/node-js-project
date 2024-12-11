import express from "express";
import { createPost } from "../controllers/postController.js";
import auth from "../middlewares/middleware.js";

const router = express.Router();

router.post("/create", auth, createPost);
export default router;
