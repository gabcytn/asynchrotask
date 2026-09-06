import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { loadEnvFile } from "node:process";
import { save } from "../repositories/user-repository.ts";

loadEnvFile();

const JWT_SECRET = process.env.JWT_SECRET || "";
const JWT_EXP = Number(process.env.JWT_EXP) || 600;

export async function register(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await save({ email, password });

    const token = jwt.sign({ email }, JWT_SECRET, {
      expiresIn: JWT_EXP,
    });

    res.status(201).json({ user, token });
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).json({ error: "Validation failed.", message: e.message });
    }
  }
}
