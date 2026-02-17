/**
 * This middleware validates the request body against a provided schema using Zod.
 * It can be used to ensure that incoming requests contain the expected data structure and types.
 */

import type { Request, Response, NextFunction } from "express";
import { type ZodType, ZodError } from "zod"; // ZodSchema is now ZodType

export const validateBody = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = schema.parse(req.body);
      req.body = validatedData;
      next();
    } catch (e) {
      if (e instanceof ZodError) {
        return res.status(400).json({
          error: "Validation failed",
          details: e.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
      }
      next(e);
    }
  };
};
