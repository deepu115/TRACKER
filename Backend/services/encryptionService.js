import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv'

config({ path: `.env.${process.env.NODE_ENV}` });

const saltRounds = 10;
const accessTokenExpiry = '15m'; // Short-lived access token
const refreshTokenExpiry = '7d'; // Long-lived refresh token

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
};

export const comparePassword = async (password, hash) => {
    return bcrypt.compare(password, hash);
};

export const createAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, { expiresIn: accessTokenExpiry });
};

export const createRefreshToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: refreshTokenExpiry });
};
