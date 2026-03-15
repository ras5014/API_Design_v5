// Jose library will take care of all JWT functionalities
import { SignJWT, jwtVerify, decodeJwt } from "jose";
import { createSecretKey } from "node:crypto";
import env from "../config/env.ts";
import { create } from "node:domain";

export interface JwtPayload {
  id: string;
  email: string;
  username: string;
  [key: string]: unknown;
}

export const generateToken = async (payload: JwtPayload): Promise<string> => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET not found");

  const secretKey = createSecretKey(secret, "utf-8");

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(env.JWT_EXPIRES_IN || "7d")
    .sign(secretKey);
};

export const verifyToken = async (token: string): Promise<JwtPayload> => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET not found");

  const secretKey = createSecretKey(secret, "utf-8");

  const { payload } = await jwtVerify(token, secretKey);

  return {
    id: payload.id as string,
    email: payload.email as string,
    username: payload.username as string,
  };
};
