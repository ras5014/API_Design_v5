import bcrypt from "bcrypt";
import env from "../config/env.ts";

// hashedPassword method is asynchronous to prevent timing attacks
export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, env.BCRYPT_SALT_ROUNDS);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string,
) => {
  return bcrypt.compare(password, hashedPassword);
};
