import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { isTestEnv } from "./config/env.ts";
import { errorHandler, notFound } from "./middlewares/errorHandler.ts";

const app = express();

// Global middleware
app.use(helmet()); // Set security-related HTTP headers
app.use(cors()); // Enable CORS for all routes (you can configure this further if needed)
app.use(express.json()); // To parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // To handle URL-encoded data (e.g., form submissions)
app.use(
  morgan("dev", {
    // Use 'dev' format for concise colored output
    skip: () => isTestEnv(), // Skip logging in test environment
  }),
);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Note: Starting with Express 5, route handlers and middleware that return a Promise will call next(value) automatically when they reject or throw an error.
// Routes
app.use(
  "/api/auth",
  await import("./modules/auth/auth.router.ts").then((mod) => mod.default),
);
// app.use("/api/users");
app.use(
  "/api/habits",
  await import("./modules/habits/habit.router.ts").then((mod) => mod.default),
);

// Error handling middleware
app.use(notFound);

// Global Error Handler (must be the last middleware)
app.use(errorHandler);

export { app };

export default app;
