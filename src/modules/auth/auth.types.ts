// If you don't want to use drizzle types then you can use this file to define your own types for auth module

import z from "zod";

// login schema requires custom validation for email and password
export const loginSchema = z.object({
    email: z.email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long")
})