import express from 'express';
import { signup, login, refreshAccessToken } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { userSignupValidationRules, userLoginValidationRules, validate } from '../middleware/userValidation.js';
import { getUserProfile, updateUserProfile } from '../controllers/userProfileController.js';
import User from '../models/user.js';
const router = express.Router();

router.post('/signup', userSignupValidationRules(), validate, signup);
router.post('/login', userLoginValidationRules(), validate, login);
router.post('/refresh', refreshAccessToken);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

export default router;
