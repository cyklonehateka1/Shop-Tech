const express = require("express");
const {
  confirmAccount,
  login,
  register,
  logout,
  resendConfirmationEmail,
} = require("../controllers/authControllers.js");

const router = express.Router();

router.post("/register", register);
router.post("/resendconfirmationemail/:userId", resendConfirmationEmail);
router.get("/:userId/verify/:token", confirmAccount);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
