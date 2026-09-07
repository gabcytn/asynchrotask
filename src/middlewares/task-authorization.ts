import type { NextFunction, Request, Response } from "express";
import { findTaskById } from "../services/task-service.ts";

export async function authorize(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  const user = req.user;
  if (!user) {
    throw new Error("User is not authenticated.");
  }

  const task = await findTaskById(req.params.id);
  if (user.id !== task.user_id) {
    return res.status(403).json({ message: "Access Denied" });
  }

  next();
}
