const { newOrder } = require("../controllers/ordersControllers.js");
const express = require("express");

const router = express.Router();

router.post("/new", newOrder);

module.exports = router;
