import { Router } from "express";
import { validateBody } from "../../middlewares/validation.ts";
import { insertUserSchema } from "../../db/schema.ts";
import { login, register } from "./auth.controller.ts";
import { loginSchema } from "./auth.types.ts";

const router = Router();

router.post("/register", validateBody(insertUserSchema), register);

router.post("/login", validateBody(loginSchema), login);

export default router;
