import FoodItem from '../models/foodItems.js';
import { getNutritionalData } from '../services/nutritionixService.js';

export const addFoodItem = async (req, res) => {
    try {
        const { name, servingSize, servingsPerContainer } = req.body;
        const nutritionResponse = await getNutritionalData(name);
        const nutritionData = nutritionResponse.foods[0];

        // Determine the multiplier based on the provided servings per container
        const servingsMultiplier = servingsPerContainer || 1;

        const servingSizeMultiplier = nutritionData.serving_unit;

        // Adjust each nutritional value based on the servings multiplier
        const adjustForServings = value => ((value || 0) * servingsMultiplier)

        const newFoodItem = new FoodItem({
            name: nutritionData.food_name || name,
            //servingSize: servingSize || nutritionData.serving_unit,
            servingsPerContainer: servingsMultiplier, servingSizeMultiplier,
            //servingSize: servingSizeMultiplier,
            calories: adjustForServings(nutritionData.nf_calories),
            totalFat: {
                amount: adjustForServings(nutritionData.nf_total_fat),
                dvPercentage: calculateDVPercentage(adjustForServings(nutritionData.nf_total_fat), 'fat')
            },
            saturatedFat: {
                amount: adjustForServings(nutritionData.nf_saturated_fat),
                dvPercentage: calculateDVPercentage(nutritionData.nf_saturated_fat, 'saturatedFat')
            },
            transFat: {
                amount: adjustForServings(nutritionData.nf_trans_fatty_acid)
            },
            cholesterol: {
                amount: adjustForServings(nutritionData.nf_cholesterol),
                dvPercentage: calculateDVPercentage(nutritionData.nf_cholesterol, 'cholesterol')
            },
            sodium: {
                amount: adjustForServings(nutritionData.nf_sodium),
                dvPercentage: calculateDVPercentage(nutritionData.nf_sodium, 'sodium')
            },
            totalCarbohydrate: {
                amount: adjustForServings(nutritionData.nf_total_carbohydrate),
                dvPercentage: calculateDVPercentage(nutritionData.nf_total_carbohydrate, 'carbohydrate')
            },
            dietaryFiber: {
                amount: adjustForServings(nutritionData.nf_dietary_fiber),
                dvPercentage: calculateDVPercentage(nutritionData.nf_dietary_fiber, 'fiber')
            },
            totalSugars: {
                amount: adjustForServings(nutritionData.nf_sugars),
                dvPercentage: calculateDVPercentage(nutritionData.nf_sugars, 'sugar')
            },
            protein: {
                amount: adjustForServings(nutritionData.nf_protein),
                dvPercentage: calculateDVPercentage(nutritionData.nf_protein, 'protein')
            },
            brandName: nutritionData.brand_name,
            servingWeightGrams: adjustForServings(nutritionData.serving_weight_grams),
            photoUrl: nutritionData.photo ? nutritionData.photo.thumb : '',
            createdBy: req.user.userId
        });

        await newFoodItem.save();
        res.status(201).json({ foods: [newFoodItem] });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllFoodItems = async (req, res) => {
    try {
        const foodItems = await FoodItem.find({ createdBy: req.user.userId });
        res.status(200).json(foodItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateFoodItem = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedFoodItem = await FoodItem.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedFoodItem) {
            return res.status(404).json({ message: "Food item not found" });
        }
        res.status(200).json(updatedFoodItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteFoodItem = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedFoodItem = await FoodItem.findByIdAndDelete(id);
        if (!deletedFoodItem) {
            return res.status(404).json({ message: "Food item not found" });
        }
        res.status(200).json({ message: "Food item deleted" });
    } catch (error) {
        res
    }
}

const DV_VALUES = {
    fat: 78, // grams
    saturatedFat: 20, // grams
    cholesterol: 300, // milligrams
    sodium: 2300, // milligrams
    carbohydrate: 275, // grams
    fiber: 28, // grams
    sugar: 50, // grams
    protein: 50 // grams
};

const calculateDVPercentage = (amount, nutrient) => {
    if (!DV_VALUES[nutrient] || !amount) {
        return null; // Return null if no DV is established or amount is not provided
    }
    return (amount / DV_VALUES[nutrient]) * 100; // Calculate the DV percentage
};
