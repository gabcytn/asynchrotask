import sql from "../database/index.ts";
import bcrypt from "bcrypt";
import crypto from "crypto";
import type { User } from "../types/index.ts";

export async function save(
  user: Omit<User, "id">,
): Promise<Omit<User, "password">> {
  const id = crypto.randomUUID();
  const createdAt = new Date();
  const updatedAt = createdAt;

  try {
    const hashedPassword = await bcrypt.hash(user.password, 12);
    await sql` insert into users (id, email, password, created_at, updated_at) values (${id}, ${user.email}, ${hashedPassword}, ${createdAt}, ${updatedAt}) `;
    return { id, email: user.email };
  } catch (e: any) {
    if (e.code === "23505") {
      throw new Error("Email already exists");
    }

    console.error(e);
    throw new Error("Unknown error occured");
  }
}

export async function findByEmail(email: string) {
  const user =
    await sql`select id, email, password from users where email = ${email} limit 1`;
  if (!user) {
    return null;
  }

  return user;
}
