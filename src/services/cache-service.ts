import redisClient from "../database/redis/index.ts";
import type { TaskDto } from "../types/index.ts";

export async function findCachedTasksByUserId(
  userId: string,
): Promise<TaskDto[] | null> {
  const tasks = await redisClient.get(`user:${userId}`);
  if (!tasks) {
    console.log("Cache miss");
    return null;
  }

  console.log("Cache hit");
  return JSON.parse(tasks) as TaskDto[];
}

export async function cacheTasksByUserId(tasks: TaskDto[], userId: string) {
  await redisClient.set(`user:${userId}`, JSON.stringify(tasks), { EX: 120 });
}
