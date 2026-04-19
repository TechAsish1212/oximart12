import express from 'express';
import sellerMiddleware from '../middlewares/sellerAuth.middleware.js';
import transactionController from '../controllers/transaction.controller.js';

const router=express.Router();


router.get('/seller',sellerMiddleware,transactionController.getTransactionBySeller);

export default router; 