import express from "express";
import dealController from "../controllers/deal.controller.js";

const router=express.Router();

router.get('/',dealController.getAllDeals);
router.post('/',dealController.createDeals);
router.patch('/:id',dealController.updateDeal);
router.delete('/:id',dealController.deleteDeals);

export default router;