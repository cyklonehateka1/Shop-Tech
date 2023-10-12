const express = require("express");
const verifyToken = require("../middlewares/verifyToken.js");
const {
  addProduct,
  getProduct,
  getProducts,
  updateProduct,
  createDiscount,
} = require("../controllers/productControllers.js");

const router = express.Router();

router.post("/createproduct", verifyToken, addProduct);
router.get("/getone/:productId", getProduct);
router.get("/getproducts", getProducts);
router.get("/updateone/:id", verifyToken, updateProduct);
router.put("/discounts/new/:id", verifyToken, createDiscount);

module.exports = router;
