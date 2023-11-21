import express from 'express';
import { signup, login, refreshAccessToken } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { userSignupValidationRules, userLoginValidationRules, validate } from '../middleware/userValidation.js';
import User from '../models/user.js';
const router = express.Router();

router.post('/signup', userSignupValidationRules(), validate, signup);
router.post('/login', userLoginValidationRules(), validate, login);
router.post('/refresh', refreshAccessToken);
router.get('/profile', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password'); // Exclude password from the result
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error');
    }
});

export default router;
