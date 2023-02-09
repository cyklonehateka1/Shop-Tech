const express = require("express");
const verifyToken = require("../middlewares/verifyToken.js");
const {
  addToCart,
  removeFromCart,
} = require("../controllers/cartControllers.js");

const router = express.Router();

router.post("/addproducts/:userId", verifyToken, addToCart);
router.post("/removeproduct/:userId", verifyToken, removeFromCart);

module.exports = router;
