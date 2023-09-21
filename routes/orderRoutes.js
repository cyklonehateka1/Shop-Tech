const { newOrder } = require("../controllers/orderControllers.js");
const verifyToken = require("../middlewares/verifyToken.js");
const express = require("express");

const router = express.Router();

router.post("/new", verifyToken, newOrder);

module.exports = router;
