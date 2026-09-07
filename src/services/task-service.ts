import crypto from "crypto";
import {
  deleteById,
  existsById,
  findById,
  findByUserEmail,
  save,
  update,
} from "../repositories/task-repository.ts";
import type { Task } from "../types/index.ts";

export async function findAllTasksByUserEmail(email: string) {
  try {
    const tasks = await findByUserEmail(email);
    return tasks;
  } catch (e: unknown) {
    throw e;
  }
}

export async function findTaskById(id: string) {
  try {
    const task = await findById(id);
    return task;
  } catch (e: unknown) {
    console.error(e);
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

export async function patchUpdateTask(task: Task) {
  try {
    update(task);
  } catch (e: unknown) {
    console.error(e);
    throw e;
  }
}

export async function deleteTaskById(id: string) {
  try {
    const doesTaskExist = await existsById(id);
    if (doesTaskExist) {
      throw new Error("Task does not exist.");
    }

    await deleteById(id);
  } catch (e: unknown) {
    throw e;
  }
}
