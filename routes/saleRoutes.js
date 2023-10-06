const { Router } = require("express");
const verifyToken = require("../middlewares/verifyToken");
const {
  getSale,
  getMonthlySales,
  getYearlySale,
  getWeeklySale,
  getTotalSales,
} = require("../controllers/saleControllers");

const router = Router();

router.get("/get/one/:id", verifyToken, getSale);
router.get("/get/weekly", verifyToken, getWeeklySale);
router.get("/get/monthly", verifyToken, getMonthlySales);
router.get("/get/total", verifyToken, getTotalSales);
router.get("/get/yearly", verifyToken, getYearlySale);

module.exports = router;
