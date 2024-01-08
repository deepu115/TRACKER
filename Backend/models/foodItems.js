import mongoose from 'mongoose';

const foodItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    servingSize: {
        type: String
    },
    servingsPerContainer: {
        type: Number,
        required: true
    },
    calories: {
        type: Number
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
    // Additional fields from Nutritionix, if needed
    brandName: String,
    servingWeightGrams: Number,
    photoUrl: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const FoodItem = mongoose.model('FoodItem', foodItemSchema);
export default FoodItem;
