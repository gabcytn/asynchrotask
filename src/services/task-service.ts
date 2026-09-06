import crypto from "crypto";
import { findByUserEmail, save } from "../repositories/task-repository.ts";
import type { Task, User } from "../types/index.ts";
import type { Request } from "express";

export async function findAllTasksByUserEmail(email: string) {
  try {
    const tasks = await findByUserEmail(email);
    return tasks;
  } catch (e: unknown) {
    throw e;
  }
}

export async function saveTask(taskDto: Omit<Task, "id">): Promise<Task> {
  const id = crypto.randomUUID();
  try {
    const task = { id, ...taskDto };
    save(task);
    return task;
  } catch (e: unknown) {
    console.error(e);
    throw e;
  }
}
