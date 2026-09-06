import { Router } from "express";
import {
  loginController,
  registerController,
} from "../controllers/user-controller.ts";
import { body } from "express-validator";

const router = Router({ mergeParams: true });

const validationRules = [
  body("email").isEmail().withMessage("Email is required.").normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),
];

router.post("/login", validationRules, loginController);
router.post("/register", validationRules, registerController);

export default router;
