import express from "express";
import controller from "../controller/index.js";

const router = express.Router();

router.post('/send-otp',controller.AuthController.sendOtp)
router.post('/verify-otp',controller.AuthController.verifyOtp)

export default router;