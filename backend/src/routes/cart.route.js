import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import cartController from '../controllers/cart.controller.js';


const router = express.Router();

router.get('/', authMiddleware, cartController.findUserCartHandler);
router.put('/add', authMiddleware, cartController.addItemToCartHandler);
router.delete('/item/:cartItemId', authMiddleware, cartController.deleteCartItemHandler);
router.put('/item/:cartItemId', authMiddleware, cartController.updateCartItemHandler);

export default router;