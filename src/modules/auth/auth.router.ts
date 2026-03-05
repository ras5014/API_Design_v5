import { Router } from "express";
import { validateBody } from "../../middlewares/validation.ts";
import { insertUserSchema } from "../../db/schema.ts";

const router = Router();

router.post("/register", validateBody(insertUserSchema), (req, res) => {
  res.status(201).json({ message: "user signed up" });
});

router.post("/login", (req, res) => {
  res.status(201).json({ message: "user logged in" });
});

export default router;
