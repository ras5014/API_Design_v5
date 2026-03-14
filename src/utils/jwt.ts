import { SignJWT, jwtVerify, decodeJwt } from "jose";
import { createSecretKey } from "node:crypto";
import env from "../config/env.ts";

export interface JwtPayload {
    id: string
    email: string
    username: string
    [key: string]: unknown
}

export const generateToken = async (payload: JwtPayload): Promise<string> => {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET not found");

    const secretKey = createSecretKey(secret, 'utf-8')

    return await new SignJWT(payload)
    .setProtectedHeader({alg: "HS256"})
    .setIssuedAt()
    .setExpirationTime(env.JWT_EXPIRES_IN || "7d")
    .sign(secretKey);
}