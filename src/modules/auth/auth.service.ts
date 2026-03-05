import { users, type NewUser } from "../../db/schema.ts";
import db from "../../db/connection.ts";
import { hashPassword } from "../../utils/password.ts";

export const registerService = async (userData: NewUser) => {
  const { email, username, password, firstName, lastName } = userData;

  // Hash Password
  const hashedPassword = await hashPassword(password);

  // Create User in DB
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
};
