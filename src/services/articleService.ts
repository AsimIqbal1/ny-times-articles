import axios from 'axios';
import { Article } from '../types/Article';

const API_KEY = process.env.REACT_APP_NYT_APP_KEY;
const BASE_URL = 'https://api.nytimes.com/svc/mostpopular/v2';

export const getArticles = async (period: 1 | 7 | 30 = 7): Promise<Article[]> => {
    try {
        const response = await axios.get(
            `${BASE_URL}/viewed/${period}.json?api-key=${API_KEY}`
        );
        return response.data.results;
    } catch (error) {
        console.error('Error fetching articles:', error);
        throw error;
    }
}; 