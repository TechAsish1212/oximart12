import express from 'express';
import sellerMiddleware from '../middlewares/sellerAuth.middleware.js';
import orderController from '../controllers/order.controller.js';

const router = express.Router();

router.get('/', sellerMiddleware, orderController.getSellersOrders);
router.patch('/:orderId/status/:orderStatus', sellerMiddleware, orderController.updateOrderStatus);
router.delete('/:orderId', sellerMiddleware, orderController.cancelOrder); // Cancel an order

export default router;