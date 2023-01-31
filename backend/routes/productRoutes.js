import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  addProduct,
  addProductToCart,
  getProduct,
  getProducts,
  updateProduct,
  removeFromCart,
} from "../controllers/productControllers.js";

const router = express.Router();

router.post("/createproduct", verifyToken, addProduct);
router.get("/getone/:productId", getProduct);
router.get("/getproducts", getProducts);
router.get("/updateone/:id", verifyToken, updateProduct);
router.post("/addtocart/:userId", verifyToken, addProductToCart);
router.post("/removefromcart/:userId", verifyToken, removeFromCart);

export default router;
