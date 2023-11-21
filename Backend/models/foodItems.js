import mongoose from 'mongoose';

const foodItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    servingSize: {
        type: String,
        required: true
    },
    servingsPerContainer: {
        type: Number,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    totalFat: {
        amount: Number,
        dvPercentage: Number
    },
    saturatedFat: {
        amount: Number,
        dvPercentage: Number
    },
    transFat: {
        amount: Number
    },
    cholesterol: {
        amount: Number,
        dvPercentage: Number
    },
    sodium: {
        amount: Number,
        dvPercentage: Number
    },
    totalCarbohydrate: {
        amount: Number,
        dvPercentage: Number
    },
    dietaryFiber: {
        amount: Number,
        dvPercentage: Number
    },
    totalSugars: {
        amount: Number,
        dvPercentage: Number
    },
    protein: {
        amount: Number,
        dvPercentage: Number
    },
    vitamins: [{
        name: String,
        amount: Number,
        dvPercentage: Number
    }],
}, {
    timestamps: true
});

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

export default FoodItem;
