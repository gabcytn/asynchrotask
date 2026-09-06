import { Router } from "express";
import { createTask, getTasks } from "../controllers/task-controller.ts";
import { body } from "express-validator";

const router = Router({ mergeParams: true });

router.get("/", getTasks);

const validationRules = [
  body("title")
    .isString()
    .isLength({ min: 1 })
    .withMessage("Title is required."),
  body("description")
    .isString()
    .isLength({ min: 1 })
    .withMessage("Description is required."),
];
router.post("/", validationRules, createTask);

export default router;
