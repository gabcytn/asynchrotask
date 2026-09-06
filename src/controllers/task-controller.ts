import type { Request, Response } from "express";
import { findAllTasksByUserEmail } from "../services/task-service.ts";

export async function getTasks(req: Request, res: Response) {
  const user = req.user;
  if (!user) {
    throw new Error("No user found.");
  }

  const tasks = await findAllTasksByUserEmail(user.email);
  res.status(200).json(tasks);
}
