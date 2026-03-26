import { Router } from "express";
import { authenticateToken } from "../../middlewares/auth.ts";
import { validateBody } from "../../middlewares/validation.ts";
import { createHabitSchema } from "./habit.types.ts";
import { createHabit, getUserHabits } from "./habit.controller.ts";

const router = Router();

// Route Level Authentication Middleware
router.use(authenticateToken);

router.get("/", getUserHabits);

router.post("/", validateBody(createHabitSchema), createHabit);

export default router;
