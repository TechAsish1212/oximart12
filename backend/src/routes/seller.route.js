import express from 'express';
import sellerController from '../controllers/seller.controller.js';
import sellerMiddleware from '../middlewares/sellerAuth.middleware.js';


const router = express.Router();

// all seller rotes will be here , prefixed with /api/v1/seller

router.get('/profile',sellerMiddleware,sellerController.getSellerProfile);
router.post('/',sellerController.createSeller);
router.get('/',sellerController.getAllSellers);
router.patch('/update-seller',sellerMiddleware,sellerController.updateSeller);
router.post('/verify/login-otp',sellerController.verifyLoginOTP);


export default router;