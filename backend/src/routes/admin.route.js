import express from 'express';
import sellerController from '../controllers/seller.controller.js';

const router = express.Router();

// all admin rotes will be here , prefixed with /api/v1/admin
router.patch('/seller/:id/status/:status',sellerController.updateSellerAccountStatus)

export default router;