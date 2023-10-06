const {
  getUser,
  getTotalCustomerCount,
} = require("../controllers/userControllers.js");
const verifyToken = require("../middlewares/verifyToken.js");
const { Router } = require("express");

const router = Router();

router.get("/getuser/:id", verifyToken, getUser);
router.get("/get/totalcount", verifyToken, getTotalCustomerCount);

module.exports = router;
