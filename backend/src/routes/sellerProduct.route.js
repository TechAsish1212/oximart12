import express from 'express';
import sellerMiddleware from '../middlewares/sellerAuth.middleware.js';
import productController from '../controllers/product.controller.js';


const router = express.Router();

router.get('/',sellerMiddleware,productController.getProductBySellerId);
router.post('/create-product',sellerMiddleware,productController.createProduct);
router.delete('/:productId',sellerMiddleware,productController.deleteProduct);
router.patch('/:productId',sellerMiddleware,productController.updateProduct);

export default router;