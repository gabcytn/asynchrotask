import { Router } from "express";
import { getTasks } from "../controllers/task-controller.ts";

const router = Router({ mergeParams: true });

router.get("/", getTasks);

export default router;
