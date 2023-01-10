import express from "express";
import { confirmAccount, register } from "../controllers/authControllers.js";

const router = express.Router();

router.post("/register", register);
router.get(":userId/verify/:token", confirmAccount);

export default router;
