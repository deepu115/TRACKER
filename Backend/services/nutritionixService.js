import axios from 'axios';
import { config } from 'dotenv'

config({ path: `.env.${process.env.NODE_ENV}` });

const NUTRITIONIX_API_ENDPOINT = 'https://trackapi.nutritionix.com/v2'; // Base URL for Nutritionix API
const NUTRITIONIX_APP_ID = process.env.NUTRITIONIX_APP_ID;  // Your Nutritionix App ID
const NUTRITIONIX_API_KEY = process.env.NUTRITIONIX_API_KEY; // Your Nutritionix API Key

export const getNutritionalData = async (foodItem) => {
    try {
        const response = await axios.post(`${NUTRITIONIX_API_ENDPOINT}/natural/nutrients`, {
            query: foodItem
        }, {
            headers: {
                'x-app-id': NUTRITIONIX_APP_ID,
                'x-app-key': NUTRITIONIX_API_KEY,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching data from Nutritionix:', error);
        throw error;
    }
};
