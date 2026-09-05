import { Router } from "express";

const router = Router({ mergeParams: true });

router.post("/login", (req, res) => {
  // TODO: sign a user in
  res.status(500).send();
});

router.post("/register", (req, res) => {
  // TODO: register a user account
  res.status(500).send();
});

export default router;
