import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import { findAllTasksByUserEmail, saveTask } from "../services/task-service.ts";

export async function getTasks(req: Request, res: Response) {
  const user = req.user;
  if (!user) {
    throw new Error("No user found.");
  }

  const tasks = await findAllTasksByUserEmail(user.email);
  res.status(200).json(tasks);
}

export async function createTask(req: Request, res: Response) {
  const user = req.user;
  if (!user) {
    throw new Error("No user found.");
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description } = req.body;
  const task = await saveTask({ user, title, description, status: "PENDING" });
  res
    .status(201)
    .json({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
    });
}
