import axios from 'axios';
import { getArticles } from '../articleService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('articleService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('fetches articles successfully', async () => {
        const mockData = {
            data: {
                results: [
                    {
                        id: 1,
                        title: 'Test Article',
                        abstract: 'Test Abstract',
                        byline: 'By Test Author',
                        published_date: '2024-03-08',
                        url: 'https://example.com',
                        media: [{
                            type: 'image',
                            'media-metadata': [
                                { url: 'https://example.com/image.jpg', format: 'thumbnail' }
                            ]
                        }]
                    }
                ]
            }
        };

        mockedAxios.get.mockResolvedValueOnce(mockData);

        const result = await getArticles(7);
        expect(result).toEqual(mockData.data.results);
        expect(mockedAxios.get).toHaveBeenCalledWith(
            expect.stringContaining('/viewed/7.json?api-key=')
        );
    });

    it('throws error when API call fails', async () => {
        const errorMessage = 'Network Error';
        mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

        await expect(getArticles(7)).rejects.toThrow(errorMessage);
    });

    it('uses default period when not specified', async () => {
        const mockData = { data: { results: [] } };
        mockedAxios.get.mockResolvedValueOnce(mockData);

        await getArticles();
        expect(mockedAxios.get).toHaveBeenCalledWith(
            expect.stringContaining('/viewed/7.json?api-key=')
        );
    });

    it('uses specified period when provided', async () => {
        const mockData = { data: { results: [] } };
        mockedAxios.get.mockResolvedValueOnce(mockData);

        await getArticles(30);
        expect(mockedAxios.get).toHaveBeenCalledWith(
            expect.stringContaining('/viewed/30.json?api-key=')
        );
    });
}); 