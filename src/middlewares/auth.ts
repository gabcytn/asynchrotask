import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

interface CustomPayload extends JwtPayload {
  email: string;
}

export async function authJwt(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access Denied" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET || "",
    ) as CustomPayload;
    req.user = { id: verified.sub!, email: verified.email };
    next();
  } catch (e) {
    res.status(401).json({ message: "Invalid token" });
  }
}
