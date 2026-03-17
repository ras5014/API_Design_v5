import { Router } from "express";
import { authenticateToken } from "../../middlewares/auth.ts";

const router = Router();

// Route Level Authentication Middleware
router.use(authenticateToken);

router.get("/", (req, res) => {
  res.json({ message: "Get all habits" });
});

router.post("/", (req, res) => {
  res.json({ message: "Create a new habit" });
});

export default router;
