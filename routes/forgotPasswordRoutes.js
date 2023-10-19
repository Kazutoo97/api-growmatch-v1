import express from "express";
import {
  resetPassword,
  forgotPassword,
} from "../controllers/forgotPasswordController.js";

const router = express.Router();

router.put("/forgot-password", forgotPassword);
router.put("/reset-password", resetPassword);
export default router;
