import express from "express";
import dotenv from "dotenv";
import { connection } from "./utils/database.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(process.env.PORT || 9000, () => {
  console.log(`Server started on PORT ${process.env.PORT}`);
  connection();
});
