import express from "express";
import {
  registerUser,
  loginUser,
  profileUser,
  logoutUser,
} from "../controllers/authControllers.js";
import { authGuard } from "../middleware/authGuard.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authGuard, profileUser);
router.delete("/logout", logoutUser);

export default router;
