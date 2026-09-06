import sql from "../database/index.ts";

export async function findByUserEmail(email: string) {
  const tasks = await sql`
    select t.id, t.title, t.description, t.status
    from tasks t
    join users u on u.id = t.user_id
    where u.email = ${email}
    `;

  return tasks;
}
