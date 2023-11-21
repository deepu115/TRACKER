import express from 'express';
import {
    addNutritionLog,
    getUserNutritionLogs,
    updateNutritionLog,
    deleteNutritionLog
} from '../controllers/nutritionLogController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, addNutritionLog);
router.get('/', protect, getUserNutritionLogs);
router.put('/:id', protect, updateNutritionLog);
router.delete('/:id', protect, deleteNutritionLog);

export default router;
