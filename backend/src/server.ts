import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import employeesRouter from "./routes/employees.routes";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/employees", employeesRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Invalid route");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
