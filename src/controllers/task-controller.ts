import type { Request, Response } from "express";

export async function getTasks(req: Request, res: Response) {
  // TODO: get tasks from database
  return res.send("No tasks available");
}
