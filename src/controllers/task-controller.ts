import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import {
  deleteTaskById,
  findAllTasksByUserId,
  findTaskById,
  patchUpdateTask,
  saveTask,
} from "../services/task-service.ts";

export async function getTasks(req: Request, res: Response) {
  const user = req.user;
  if (!user) {
    throw new Error("No user found.");
  }

  const tasks = await findAllTasksByUserId(user.id);
  res.status(200).json(tasks);
}

export async function getTask(req: Request<{ id: string }>, res: Response) {
  const user = req.user;
  if (!user) {
    throw new Error("No user found.");
  }

  try {
    const task = await findTaskById(req.params.id);
    res.status(200).json({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.description,
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return res.status(404).send({ message: e.message });
    }
  }
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
  await patchUpdateTask({
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

export async function deleteTask(req: Request<{ id: string }>, res: Response) {
  const user = req.user;
  if (!user) {
    throw new Error("No user found.");
  }

  try {
    await deleteTaskById(req.params.id);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return res.status(404).json({ message: e.message });
    }
  }
  res.status(204).send();
}
