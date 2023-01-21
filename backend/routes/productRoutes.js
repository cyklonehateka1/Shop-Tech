import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  addProduct,
  getProduct,
  getProducts,
} from "../controllers/productControllers.js";

const router = express.Router();

router.post("/createproduct", verifyToken, addProduct);
router.get("/getone/:productId", getProduct);
router.get("/getproducts", getProducts);

export default router;
