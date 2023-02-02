import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { addToCart, removeFromCart } from "../controllers/cartControllers.js";

const router = express.Router();

router.post("/addproducts/:userId", verifyToken, addToCart);
router.post("/removeproduct/:userId", verifyToken, removeFromCart);

export default router;
