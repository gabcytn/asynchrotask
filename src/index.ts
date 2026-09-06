import express, { type Request, type Response } from "express";
import auth from "./routes/auth.ts";
import tasks from "./routes/tasks.ts";
import { authJwt } from "./middlewares/auth.ts";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/v1/public/auth", auth);

app.use("/api/v1/tasks", authJwt);
app.use("/api/v1/tasks", tasks);

app.use((_, res) => {
  res.status(404).send();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
