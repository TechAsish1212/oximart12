import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import orderController from '../controllers/order.controller.js';

const router = express.Router();

router.post('/',authMiddleware,orderController.createOrder); // Create a new order
router.get('/user',authMiddleware,orderController.getUsersOrderHistory); // Get user's order history
router.put('/:orderId/cancel',authMiddleware,orderController.cancelOrder); // Cancel an order
router.get('/:orderId',authMiddleware,orderController.getOrderById); // Get order by ID
router.get('/item/:orderItemId',authMiddleware,orderController.getOrderItemById); // Get order item by ID 

export default router;