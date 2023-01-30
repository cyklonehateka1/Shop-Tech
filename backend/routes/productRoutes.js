import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  addProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/productControllers.js";

const router = express.Router();

router.post("/createproduct", verifyToken, addProduct);
router.get("/getone/:productId", getProduct);
router.get("/getproducts", getProducts);
router.get("/updateone/:id", verifyToken, updateProduct);

export default router;
