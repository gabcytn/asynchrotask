import sql from "../database/index.ts";
import crypto from "crypto";
import type { Task } from "../types/index.ts";

export async function findByUserEmail(email: string) {
  const tasks = await sql`
    select t.id, t.title, t.description, t.status
    from tasks t
    join users u on u.id = t.user_id
    where u.email = ${email}
  `;

  return tasks;
}

export async function save(task: Task) {
  const createdAt = new Date();
  const updatedAt = createdAt;

  await sql`
    insert into tasks
    (id, user_id, title, description, status, created_at, updated_at) values
    (${task.id}, ${task.user.id}, ${task.title}, ${task.description}, ${task.status}, ${createdAt}, ${updatedAt})
  `;
}
