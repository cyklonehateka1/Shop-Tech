const express = require("express");
const verifyToken = require("../middlewares/verifyToken.js");
const {
  addToCart,
  removeFromCart,
  getUserCart,
} = require("../controllers/cartControllers.js");

const router = express.Router();

router.post("/addproduct/:userId", verifyToken, addToCart);
router.get("/getusercart/:userId", getUserCart);
router.post("/removeproduct/:userId", verifyToken, removeFromCart);

module.exports = router;
