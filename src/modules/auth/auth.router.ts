import { Router } from "express";
import { validateBody } from "../../middlewares/validation.ts";
import { insertUserSchema } from "../../db/schema.ts";
import { register } from "./auth.controller.ts";

const router = Router();

router.post("/register", validateBody(insertUserSchema), register);

router.post("/login", (req, res) => {
  res.status(201).json({ message: "user logged in" });
});

export default router;
