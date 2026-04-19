import express from 'express'
import sellerMiddleware from '../middlewares/sellerAuth.middleware.js';
import sellerReportController from '../controllers/sellerReport.controller.js';

const router=express.Router();

router.get('/',sellerMiddleware,sellerReportController.getSellerReport);

export default router;