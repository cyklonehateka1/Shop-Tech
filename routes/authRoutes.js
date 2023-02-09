import express from "express";
import {
  confirmAccount,
  login,
  register,
  logout,
} from "../controllers/authControllers.js";

const router = express.Router();

router.post("/register", register);
router.get("/:userId/verify/:token", confirmAccount);
router.post("/login", login);
router.get("/logout", logout);

export default router;