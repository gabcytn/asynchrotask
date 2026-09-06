import { findByEmail } from "../repositories/user-repository.ts";

export async function getUserByEmail(email: string) {
  try {
    const users = await findByEmail(email);
    if (!users || users.length === 0) {
      throw new Error("User not found.");
    }

    return users[0];
  } catch (e: unknown) {
    throw e;
  }
}
