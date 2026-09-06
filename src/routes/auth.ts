import { Router, type Request, type Response } from "express";
import bcrypt from "bcrypt";
import { register } from "../controllers/user-controller.ts";
import { body } from "express-validator";

const router = Router({ mergeParams: true });

router.post("/login", (req, res) => {
  // TODO: sign a user in
  res.status(500).send();
});

const registerValidationRules = [
  body("email").isEmail().withMessage("Email is required.").normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),
];
router.post("/register", registerValidationRules, register);

export default router;
