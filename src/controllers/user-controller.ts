import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import { loginService, registerService } from "../services/auth-service.ts";

export async function loginController(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    const authenticatedUser = await loginService(email, password);
    res.json(authenticatedUser);
  } catch (e: unknown) {
    console.error(e);
    res.status(401).json({ message: "Invalid credentials" });
  }
}

export async function registerController(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    const authenticatedUser = await registerService(email, password);
    res.status(201).json(authenticatedUser);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).json({ error: "Validation failed.", message: e.message });
    }
  }
}
