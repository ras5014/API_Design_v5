import type { Request, Response } from "express";
import { hashPassword } from "../../utils/password.ts";
import db from "../../db/connection.ts";
import { users } from "../../db/schema.ts";
import { create } from "node:domain";
import { generateToken } from "../../utils/jwt.ts";

/**
 * Stateless authentication: handles user registration, login, and JWT token management.
 * Stateful authentication: manages user sessions, including login/logout and session persistence.
 */
export const register = async (req: Request, res: Response) => {
  try {
    const {email, username, password, firstName, lastName} = req.body;

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
    lastName
  })
  .returning({
    id: users.id,
    email: users.email,
    username: users.username,
    firstName: users.firstName,
    lastName: users.lastName,
    createdAt: users.createdAt
  })

  // Generate JWT
  const token = await generateToken({
    id: newUser.id,
    email: newUser.email,
    username: newUser.username
  })

  res.status(201).json({
    message: "User created successfully",
    user: newUser,
    token
  })
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
};
