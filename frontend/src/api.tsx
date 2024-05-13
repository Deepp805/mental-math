import axios from 'axios';

const baseURL = 'https://mental-math-jieg.onrender.com';

// Define an interface for the score object
interface Score {
    id: number;
    score: number;
    createdAt: Date; // Assuming the backend returns a date string that needs to be converted
    length: number;
}

// Define the function signature for fetchTopScores
interface FetchTopScores {
    (length: number): Promise<Score[]>;
}

const fetchTopScores: FetchTopScores = async (length) => {
    try {
        const response = await axios.get<Score[]>(`${baseURL}/top-scores?length=${length}`);
        return response.data.map(score => ({
            ...score,
            createdAt: new Date(score.createdAt) // Convert date string to Date object
        }));
    } catch (error) {
        console.error('Failed to fetch top scores:', error);
        throw error; // Rethrow the error to handle it in the calling function
    }
}

const getScores = async (userId: string): Promise<any> => {  // Temporary use of 'any' to debug
    try {
        const response = await axios.post(`${baseURL}/scores`, { userId });
        return response.data;
    } catch (error) {
        console.error('Error fetching scores:', error);
        throw error;
    }
}

export { getScores, fetchTopScores };
