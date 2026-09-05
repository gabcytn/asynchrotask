import express, { type Request, type Response } from "express";
import auth from "./routes/auth.ts";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/v1/public/auth", auth);

app.use((_, res) => {
  res.status(404).send();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
