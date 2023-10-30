const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const {
  confirmAccount,
  login,
  register,
  logout,
  getCredentials,
  resendConfirmationEmail,
} = require("../controllers/authControllers.js");

const router = express.Router();

router.post("/register", register);
router.post("/resendconfirmationemail/:userId", resendConfirmationEmail);
router.get("/:userId/verify/:token", confirmAccount);
router.post("/login", login);
router.get("/logout", logout);
router.get("/getcredentials", verifyToken, getCredentials);

module.exports = router;
