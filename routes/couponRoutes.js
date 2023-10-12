const { Router } = require("express");
const verifyToken = require("../middlewares/verifyToken");
const {
  getAllCoupons,
  getAvailableCoupons,
  getCouponCode,
  createCoupon,
} = require("../controllers/couponControllers");

const router = Router();

router.post("/new", verifyToken, createCoupon);
router.get("/code/:id", verifyToken, getCouponCode);
router.get("/all", verifyToken, getAllCoupons);
router.get("/available", getAvailableCoupons);

module.exports = router;
