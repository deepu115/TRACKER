import mongoose from 'mongoose';

const nutrientInfoSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    dvPercentage: {
        type: Number,
        required: true
    }
}, { _id: false });

const foodItemEntrySchema = new mongoose.Schema({
    foodItem: {
        type: Schema.Types.ObjectId,
        ref: 'FoodItem',
        required: true
    },
    servingSize: {
        type: String,
        required: true
    },
    servingsConsumed: {
        type: Number,
        required: true,
        default: 1
    },
    // Nutrient breakdown for the consumed amount
    calories: Number,
    totalFat: nutrientInfoSchema,
    saturatedFat: nutrientInfoSchema,
    transFat: nutrientInfoSchema,
    cholesterol: nutrientInfoSchema,
    sodium: nutrientInfoSchema,
    totalCarbohydrate: nutrientInfoSchema,
    dietaryFiber: nutrientInfoSchema,
    totalSugars: nutrientInfoSchema,
    protein: nutrientInfoSchema,
    vitamins: [nutrientInfoSchema],
}, { _id: false });

const mealSchema = new mongoose.Schema({
    mealType: {
        type: String,
        required: true,
        enum: ['breakfast', 'lunch', 'dinner', 'snack']
    },
    items: [foodItemEntrySchema]
}, { _id: false });

const nutritionLogSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    meals: [mealSchema],
    dailyTotals: {
        calories: Number,
        totalFat: nutrientInfoSchema,
        saturatedFat: nutrientInfoSchema,
        transFat: nutrientInfoSchema,
        cholesterol: nutrientInfoSchema,
        sodium: nutrientInfoSchema,
        totalCarbohydrate: nutrientInfoSchema,
        dietaryFiber: nutrientInfoSchema,
        totalSugars: nutrientInfoSchema,
        protein: nutrientInfoSchema,
        vitamins: [nutrientInfoSchema],
    }
}, {
    timestamps: true
});

const NutritionLog = mongoose.model('NutritionLog', nutritionLogSchema);

export default NutritionLog;
