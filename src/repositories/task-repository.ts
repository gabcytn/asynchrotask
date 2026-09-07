import sql from "../database/index.ts";
import type { Task, TaskDto } from "../types/index.ts";

export async function findByUserId(userId: string): Promise<TaskDto[]> {
  const tasks = await sql`
    select id, title, description, status
    from tasks
    where user_id = ${userId}
  `;

  const res: TaskDto[] = [];
  tasks.forEach((task) => {
    res.push({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
    });
  });

  return res;
}

export async function findById(id: string) {
  const records = await sql`
    select id, user_id, title, description, status
    from tasks
    where id = ${id}
    limit 1
  `;

  if (records.length === 0) {
    throw new Error("Task does not exist.");
  }

  return records[0];
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

export async function update(task: Task) {
  const updatedAt = new Date();
  await sql`
    update tasks
    set title = ${task.title}, description = ${task.description}, status = ${task.status}, updated_at = ${updatedAt}
    where id = ${task.id}
  `;
}

export async function existsById(id: string) {
  const records = await sql`
    select 1 from tasks
    where id = ${id}
    limit 1
  `;

  return records.length === 1;
}

export async function deleteById(id: string) {
  await sql`
    delete from tasks
    where id = ${id}
  `;
}
