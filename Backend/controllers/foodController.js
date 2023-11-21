import FoodItem from '../models/foodItems.js'; // Replace with your actual FoodItem model path

// Add a new food item
export const addFoodItem = async (req, res) => {
    try {
        const { name, calories, protein, carbs, fats, category } = req.body;
        const newFoodItem = new FoodItem({ name, calories, protein, carbs, fats, category, createdBy: req.user.userId });
        await newFoodItem.save();
        res.status(201).json(newFoodItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all food items for a user
export const getAllFoodItems = async (req, res) => {
    try {
        const foodItems = await FoodItem.find({ createdBy: req.user.userId });
        res.status(200).json(foodItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a food item
export const updateFoodItem = async (req, res) => {
    const { id } = req.params;
    const { name, calories, protein, carbs, fats, category } = req.body;

    try {
        const updatedFoodItem = await FoodItem.findByIdAndUpdate(id, { name, calories, protein, carbs, fats, category }, { new: true });
        if (!updatedFoodItem) {
            return res.status(404).json({ message: "Food item not found" });
        }
        res.status(200).json(updatedFoodItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a food item
export const deleteFoodItem = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedFoodItem = await FoodItem.findByIdAndDelete(id);
        if (!deletedFoodItem) {
            return res.status(404).json({ message: "Food item not found" });
        }
        res.status(200).json({ message: "Food item deleted" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
