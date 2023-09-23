const { getUser } = require("../controllers/userControllers.js");
const verifyToken = require("../middlewares/verifyToken.js");
const { Router } = require("express");

const router = Router();

router.get("/getuser/:id", verifyToken, getUser);

module.exports = router;
