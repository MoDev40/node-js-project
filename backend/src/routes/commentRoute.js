import express from "express";
import { createComment } from "../controllers/commentController.js";
import auth from "../middlewares/middleware.js";

const router = express.Router();

router.post("/create", auth, createComment);
export default router;
