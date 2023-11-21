import mongoose from 'mongoose';

const foodItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    calories: {
        type: Number,
        required: true
    },
    protein: {
        type: Number,
        required: true
    },
    carbs: {
        type: Number,
        required: true
    },
    fats: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

export default FoodItem;
