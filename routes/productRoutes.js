const express = require("express");
const verifyToken = require("../middlewares/verifyToken.js");
const {
  addProduct,
  getProduct,
  getProducts,
  updateProduct,
} = require("../controllers/productControllers.js");

const router = express.Router();

router.post("/createproduct", verifyToken, addProduct);
router.get("/getone/:productId", verifyToken, getProduct);
router.get("/getproducts", getProducts);
router.get("/updateone/:id", verifyToken, updateProduct);

module.exports = router;
