import type { Request, Response } from "express";
import { registerService } from "./auth.service.ts";

/**
 * Stateless authentication: handles user registration, login, and JWT token management.
 * Stateful authentication: manages user sessions, including login/logout and session persistence.
 */
export const registerController = async (req: Request, res: Response) => {
  const newUser = await registerService(req.body);
};
