import express from 'express';
import authController from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/sent/login-signup-otp',authController.sendLoginOTP);
router.post('/signup',authController.createUser);
router.post('/signin',authController.signinUser);

export default router;