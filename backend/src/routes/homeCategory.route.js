import express from 'express';
import homeCategoryController from '../controllers/homeCategory.controller.js';

const router=express.Router();

router.post('/create-categories',homeCategoryController.createHomeCategories);
router.get('/home-category',homeCategoryController.getHomeCategory);
router.patch('/home-category/:id',homeCategoryController.updateHomeCategory);

export default router;