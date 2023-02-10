const express = require("express");
const verifyToken = require("../middlewares/verifyToken.js");
const verifyPayment = require("../controllers/paymentControllers");

const router = express.Router();

router.get("/verifytransaction", verifyPayment);

module.exports = router;
