import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/task-controller.ts";
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
  body("status")
    .isIn(["PENDING", "DONE"])
    .withMessage("Status must either be 'PENDING' or 'DONE'"),
];
router.post("/", validationRules, createTask);
router.patch("/:id", validationRules, updateTask);
router.delete("/:id", deleteTask);

export default router;
