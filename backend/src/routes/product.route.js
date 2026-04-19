import express from 'express';
import productController from '../controllers/product.controller.js';


const router = express.Router();

router.get('/search',productController.searchProducts);
router.get('/:productId',productController.findProductById);
router.get('/',productController.getAllProducts);

export default router;