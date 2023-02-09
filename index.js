const express = require("express");
const dotenv = require("dotenv");
const connection = require("./utils/database.js");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const cartRoutes = require("./routes/cartRoutes.js");
const cookieParser = require("cookie-parser");
const path = require("path");
const multer = require("multer");

dotenv.config();

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  res.status(200).json(req.file.filename);
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

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(process.env.PORT || 9000, () => {
  console.log(`Server started on PORT ${process.env.PORT}`);
  connection();
});
