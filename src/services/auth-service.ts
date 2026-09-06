import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { findByEmail, save } from "../repositories/user-repository.ts";
import type { AuthenticatedUser } from "../types/index.ts";
import { getUserByEmail } from "./user-service.ts";

const JWT_SECRET = process.env.JWT_SECRET || "";
const JWT_EXP = Number(process.env.JWT_EXP) || 600;

export async function loginService(email: string, password: string) {
  try {
    const user = await getUserByEmail(email);
    const verified = await bcrypt.compare(password, user.password);
    if (!verified) {
      throw new Error("Incorrect password");
    }

    const token = jwt.sign({}, JWT_SECRET, {
      subject: email,
      expiresIn: JWT_EXP,
    });

    return { user, token };
  } catch (e: unknown) {
    throw e;
  }
}

export async function registerService(
  email: string,
  password: string,
): Promise<AuthenticatedUser> {
  const user = await save({ email, password });

  const token = jwt.sign({}, JWT_SECRET, {
    subject: user.email,
    expiresIn: JWT_EXP,
  });

  return { user, token };
}
