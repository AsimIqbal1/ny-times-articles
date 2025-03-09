import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ArticleList from '../ArticleList';
import { getArticles } from '../../services/articleService';

// Mock the articleService
jest.mock('../../services/articleService');
const mockGetArticles = getArticles as jest.MockedFunction<typeof getArticles>;

const mockArticles = [
    {
        id: 1,
        title: 'Test Article 1',
        abstract: 'Test Abstract 1',
        byline: 'By Test Author 1',
        published_date: '2024-03-08',
        url: 'https://example.com/1',
        media: [{
            type: 'image',
            'media-metadata': [
                { url: 'https://example.com/image1.jpg', format: 'thumbnail' }
            ]
        }]
    },
    {
        id: 2,
        title: 'Test Article 2',
        abstract: 'Test Abstract 2',
        byline: 'By Test Author 2',
        published_date: '2024-03-08',
        url: 'https://example.com/2',
        media: [{
            type: 'image',
            'media-metadata': [
                { url: 'https://example.com/image2.jpg', format: 'thumbnail' }
            ]
        }]
    }
];

const renderWithRouter = (initialPath: string = '/') => {
    return render(
        <MemoryRouter initialEntries={[initialPath]}>
            <Routes>
                <Route path="/" element={<ArticleList />} />
            </Routes>
        </MemoryRouter>
    );
};

describe('ArticleList', () => {
    beforeEach(() => {
        mockGetArticles.mockClear();
    });

    it('renders loading state initially', () => {
        mockGetArticles.mockImplementation(() => new Promise(() => { }));
        renderWithRouter();
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders articles when loaded successfully', async () => {
        mockGetArticles.mockResolvedValue(mockArticles);
        renderWithRouter();

        await waitFor(() => {
            expect(screen.getByText('Test Article 1')).toBeInTheDocument();
            expect(screen.getByText('Test Article 2')).toBeInTheDocument();
        });
    });

    it('renders error message when API call fails', async () => {
        mockGetArticles.mockRejectedValue(new Error('API Error'));
        renderWithRouter();

        await waitFor(() => {
            expect(screen.getByText('Failed to fetch articles. Please try again later.')).toBeInTheDocument();
        });
    });

    it('uses default period (7) when no query parameter is provided', async () => {
        mockGetArticles.mockResolvedValue(mockArticles);
        renderWithRouter();

        await waitFor(() => {
            expect(mockGetArticles).toHaveBeenCalledWith(7);
        });
    });

    it('uses period from URL query parameter', async () => {
        mockGetArticles.mockResolvedValue(mockArticles);
        renderWithRouter('/?period=30');

        await waitFor(() => {
            expect(mockGetArticles).toHaveBeenCalledWith(30);
        });
    });

    it('changes period and updates URL when period selector is used', async () => {
        mockGetArticles.mockResolvedValue(mockArticles);
        renderWithRouter();

        // Wait for initial load
        await waitFor(() => {
            expect(mockGetArticles).toHaveBeenCalledWith(7); // Default period
        });

        // Click the "Today" button
        const todayButton = screen.getByRole('button', { name: /today/i });
        fireEvent.click(todayButton);

        await waitFor(() => {
            expect(mockGetArticles).toHaveBeenCalledWith(1);
            expect(window.location.search).toBe('?period=1');
        });

        // Click the "Last 30 Days" button
        const thirtyDaysButton = screen.getByRole('button', { name: /last 30 days/i });
        fireEvent.click(thirtyDaysButton);

        await waitFor(() => {
            expect(mockGetArticles).toHaveBeenCalledWith(30);
            expect(window.location.search).toBe('?period=30');
        });
    });
}); 