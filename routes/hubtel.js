const express = require("express");
const hubtelPay = require("../controllers/hubtelPayment");

const router = express.Router();

router.post("/", hubtelPay);

module.exports = router;
