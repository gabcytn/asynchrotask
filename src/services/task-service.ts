import { findByUserEmail } from "../repositories/task-repository.ts";
import type { User } from "../types/index.ts";

export async function findAllTasksByUserEmail(email: string) {
  try {
    const tasks = await findByUserEmail(email);
    return tasks;
  } catch (e: unknown) {
    throw e;
  }
}
