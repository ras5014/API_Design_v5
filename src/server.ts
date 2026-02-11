import express from "express";

const app = express();

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Routes
app.use("/api/auth");
app.use("/api/users");
app.use("/api/habits");

export { app };

export default app;
