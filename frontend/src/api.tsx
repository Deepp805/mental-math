import axios from 'axios';

const baseURL = 'https://mental-math-jieg.onrender.com';

const getScores = async (userId: string): Promise<any> => {  // Temporary use of 'any' to debug
    try {
        const response = await axios.post(`${baseURL}/scores`, { userId });
        return response.data;
    } catch (error) {
        console.error('Error fetching scores:', error);
        throw error;
    }
}

export { getScores };
