import NutritionLog from '../models/nutritionLog.js'; // Replace with your actual path

// Add a new nutrition log
export const addNutritionLog = async (req, res) => {
    try {
        const log = new NutritionLog({ ...req.body, user: req.user.userId });
        await log.save();
        res.status(201).json(log);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all nutrition logs for a user
export const getUserNutritionLogs = async (req, res) => {
    try {
        const logs = await NutritionLog.find({ user: req.user.userId });
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a nutrition log
export const updateNutritionLog = async (req, res) => {
    const { id } = req.params;
    try {
        const log = await NutritionLog.findByIdAndUpdate(id, { ...req.body }, { new: true });
        if (!log) {
            return res.status(404).json({ message: "Nutrition log not found" });
        }
        res.status(200).json(log);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a nutrition log
export const deleteNutritionLog = async (req, res) => {
    const { id } = req.params;
    try {
        const log = await NutritionLog.findByIdAndDelete(id);
        if (!log) {
            return res.status(404).json({ message: "Nutrition log not found" });
        }
        res.status(200).json({ message: "Nutrition log deleted" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
