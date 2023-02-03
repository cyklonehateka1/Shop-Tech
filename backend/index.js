import express from "express";
import dotenv from "dotenv";
import { connection } from "./utils/database.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import cookieParser from "cookie-parser";
import multer from "multer";

dotenv.config();

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

const upload = multer({ dest: "upload" });
app.post("/api/upload", upload.single("file"), function (req, res) {
  res.status(200).json("Image has been uploaded.");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

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
