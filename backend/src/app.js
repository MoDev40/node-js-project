import express from "express";
import chalk from "chalk";
import cors from "cors";
import { port } from "./config/config.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import postRouter from "./routes/postRoute.js";
import commentRouter from "./routes/commentRoute.js";

const app = express();

app.use(cors());


app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

app.use((err, req, res, next) => {
  console.error(chalk.red(err.stack));
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    error: {},
  });
});

connectDB();

app.listen(port, () => {
  console.log(`${chalk.green.bold("Server")} is listening on port ${port}`);
});
