import express from 'express';
import { addFoodItem, getAllFoodItems, updateFoodItem, deleteFoodItem } from '../controllers/foodController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, addFoodItem);
router.get('/', protect, getAllFoodItems);
router.put('/:id', protect, updateFoodItem);
router.delete('/:id', protect, deleteFoodItem);

export default router;
