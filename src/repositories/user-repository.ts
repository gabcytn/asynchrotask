import sql from "../database/index.ts";
import bcrypt from "bcrypt";
import crypto from "crypto";

export type User = {
  id: string;
  email: string;
  password: string;
};

export async function save(
  user: Omit<User, "id">,
): Promise<Omit<User, "password">> {
  const id = crypto.randomUUID();
  const createdAt = new Date();
  const updatedAt = new Date();

  try {
    const hashedPassword = await bcrypt.hash(user.password, 12)
    await sql` insert into users (id, email, password, created_at, updated_at) values (${id}, ${user.email}, ${hashedPassword}, ${createdAt}, ${updatedAt}) `;
    return { id, email: user.email };
  } catch (e: any) {
    if (e.code === "23505") {
      throw new Error("Email already exists");
    }

    throw new Error("Unknown error occured");
  }
}
