import express from "express";
import chalk from "chalk";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import compression from "compression";
import cookieParser from "cookie-parser";
import { nodeEnv, port } from "./config/config.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import postRouter from "./routes/postRoute.js";
import commentRouter from "./routes/commentRoute.js";

const app = express();
app.use(cookieParser());

app.use(helmet());

app.use(cors());

if (nodeEnv === "development") {
  app.use(morgan("dev"));
}

app.use(compression());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

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
