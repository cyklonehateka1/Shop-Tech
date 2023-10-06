const {
  newOrder,
  getOrder,
  getUnfulfilledOrders,
  getOrders,
  getfulfilledOrders,
  fulfillAnOrder,
  getTotalOrders,
} = require("../controllers/orderControllers.js");
const verifyToken = require("../middlewares/verifyToken.js");
const express = require("express");

const router = express.Router();

router.post("/new", verifyToken, newOrder);
router.get("/find/one", verifyToken, getOrder);
router.get("/find/all", verifyToken, getOrders);
router.get("/find/unfulfilled", verifyToken, getUnfulfilledOrders);
router.get("/find/fulfilled", verifyToken, getfulfilledOrders);
router.post("/fulfill/:id", verifyToken, fulfillAnOrder);
router.get("/get/totalorders", verifyToken, getTotalOrders);

module.exports = router;
