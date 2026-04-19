import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import paymentController from '../controllers/payment.controller.js';
// import paymentController from '../controllers/payment.controller.js';

const router = express.Router();


router.get('/:paymentId',authMiddleware,paymentController.paymentSuccessHandler);

export default router;