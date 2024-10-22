"use server";
import jwt from "jsonwebtoken";

export async function generateCustomJWT(userId: string) {
  const secret = process.env.SECRET_KEY;
  if (!secret) {
    throw new Error("SECRET_KEY environment variable is not set.");
  }

  const payload = {
    sub: userId,
    role: "viewer",
    aud: "authenticated",
  };

  const token = jwt.sign(payload, secret, { expiresIn: "1h" });

  return token;
}
