import express from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import foodRoutes from './routes/foodRoutes.js';
import nutritionLogRoutes from './routes/nutritionLogRoutes.js';

config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Connection Error:', err));


app.use('/api/users', userRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/nutritionLogs', nutritionLogRoutes);
app.use((err, req, res, next) => {
    res.status(400).json({ msg: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;