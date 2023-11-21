import {
    hashPassword,
    comparePassword,
    createAccessToken,
    createRefreshToken,
} from '../services/encryptionService.js';
import User from '../models/user.js';
import { config } from 'dotenv'

config({ path: `.env.${process.env.NODE_ENV}` });



export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await hashPassword(password);
        const user = await User.create({ username, email, password: hashedPassword });
        const accessToken = createAccessToken(user._id);
        const refreshToken = createRefreshToken(user._id);
        res.status(201).json({ userId: user._id, accessToken, refreshToken });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && await comparePassword(password, user.password)) {
            const accessToken = createAccessToken(user._id);
            const refreshToken = createRefreshToken(user._id);
            res.status(200).json({ userId: user._id, accessToken, refreshToken });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const refreshAccessToken = async (req, res) => {
    const { refreshToken } = req.body;
    try {
        if (!refreshToken) {
            throw new Error('Refresh token required');
        }
        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const accessToken = createAccessToken(payload.userId);
        res.status(200).json({ accessToken });
    } catch (error) {
        res.status(401).json({ error: 'Invalid refresh token' });
    }
};
