import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import {
  findAllTasksByUserEmail,
  patchUpdateTask,
  saveTask,
} from "../services/task-service.ts";

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

  const { title, description, status } = req.body;
  const task = await saveTask({
    user,
    title,
    description,
    status,
  });
  res.status(201).json({
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
  });
}

export async function updateTask(req: Request<{ id: string }>, res: Response) {
  const user = req.user;
  if (!user) {
    throw new Error("No user found.");
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, status } = req.body;
  patchUpdateTask({
    id: req.params.id,
    user: { id: user.id, email: user.email },
    title,
    description,
    status,
  });

  res.status(200).json({
    id: req.params.id,
    title,
    description,
    status,
  });
}
