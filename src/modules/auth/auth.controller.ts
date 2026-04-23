import type { Request, Response } from "express";
import { comparePassword, hashPassword } from "../../utils/password.ts";
import db from "../../db/connection.ts";
import { users } from "../../db/schema.ts";
import { generateToken } from "../../utils/jwt.ts";
import { eq } from "drizzle-orm";
import { AppError } from "../../middlewares/errorHandler.ts";

/**
 * Stateless authentication: handles user registration, login, and JWT token management.
 * Stateful authentication: manages user sessions, including login/logout and session persistence.
 */
export const register = async (req: Request, res: Response) => {
  const { email, username, password, firstName, lastName } = req.body;

  // Hash Password
  const hashedPassword = await hashPassword(password);

  // Create a user in DB
  const [newUser] = await db
    .insert(users)
    .values({
      email,
      username,
      password: hashedPassword,
      firstName,
      lastName,
    })
    .returning({
      id: users.id,
      email: users.email,
      username: users.username,
      firstName: users.firstName,
      lastName: users.lastName,
      createdAt: users.createdAt,
    });

  // Generate JWT
  const token = await generateToken({
    id: newUser.id,
    email: newUser.email,
    username: newUser.username,
  });

  res.status(201).json({
    message: "User created successfully",
    user: newUser,
    token,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // find user
  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  // verify password
  const isValidPassword = await comparePassword(password, user.password);

  if (!isValidPassword) {
    throw new AppError("Invalid credentials", 401);
  }

  // generate token/JWT
  const token = await generateToken({
    id: user.id,
    email: user.email,
    username: user.username,
  });

  res.status(200).json({
    message: "Login successful",
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    token,
  });
};
