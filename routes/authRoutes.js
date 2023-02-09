const express = require("express");
const {
  confirmAccount,
  login,
  register,
  logout,
} = require("../controllers/authControllers.js");

const router = express.Router();

router.post("/register", register);
router.get("/:userId/verify/:token", confirmAccount);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
