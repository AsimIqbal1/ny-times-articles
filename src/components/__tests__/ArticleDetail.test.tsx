import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ArticleDetail from '../ArticleDetail';
import { getArticles } from '../../services/articleService';

jest.mock('../../services/articleService');
const mockGetArticles = getArticles as jest.MockedFunction<typeof getArticles>;

const mockArticle = {
    id: 1,
    title: 'Test Article',
    abstract: 'Test Abstract',
    byline: 'By Test Author',
    published_date: '2024-03-08',
    url: 'https://example.com',
    media: [{
        type: 'image',
        'media-metadata': [
            { url: 'https://example.com/small.jpg', format: 'thumbnail' },
            { url: 'https://example.com/medium.jpg', format: 'medium' },
            { url: 'https://example.com/large.jpg', format: 'large' }
        ]
    }]
};

const renderWithRouter = (id: string, period?: number) => {
    const path = `/article/${id}${period ? `?period=${period}` : ''}`;
    render(
        <MemoryRouter initialEntries={[path]}>
            <Routes>
                <Route path="/" element={<div>Home</div>} />
                <Route path="/article/:id" element={<ArticleDetail />} />
            </Routes>
        </MemoryRouter>
    );
};

describe('ArticleDetail', () => {
    beforeEach(() => {
        mockGetArticles.mockClear();
    });

    it('renders loading state initially', () => {
        mockGetArticles.mockImplementation(() => new Promise(() => { }));
        renderWithRouter('1');
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders article details when loaded successfully', async () => {
        mockGetArticles.mockResolvedValue([mockArticle]);
        renderWithRouter('1');

        await waitFor(() => {
            expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
            expect(screen.getByText(mockArticle.byline)).toBeInTheDocument();
            expect(screen.getByText(mockArticle.abstract)).toBeInTheDocument();
            expect(screen.getByText(`Published: ${mockArticle.published_date}`)).toBeInTheDocument();
        });
    });

    it('renders error message when article is not found', async () => {
        mockGetArticles.mockResolvedValue([]);
        renderWithRouter('999');

        await waitFor(() => {
            expect(screen.getByText('Article not found')).toBeInTheDocument();
        });
    });

    it('uses default period (7) when no period parameter is provided', async () => {
        mockGetArticles.mockResolvedValue([mockArticle]);
        renderWithRouter('1');

        await waitFor(() => {
            expect(mockGetArticles).toHaveBeenCalledWith(7);
        });
    });

    it('uses period from URL query parameter', async () => {
        mockGetArticles.mockResolvedValue([mockArticle]);
        renderWithRouter('1', 30);

        await waitFor(() => {
            expect(mockGetArticles).toHaveBeenCalledWith(30);
        });
    });

    it('preserves period when navigating back to list', async () => {
        mockGetArticles.mockResolvedValue([mockArticle]);
        renderWithRouter('1', 30);

        const backButton = await screen.findByText('Back to Articles');
        fireEvent.click(backButton);

        await waitFor(() => {
            expect(window.location.pathname).toBe('/');
            expect(window.location.search).toBe('?period=30');
        });
    });

    it('does not include period in URL when using default period', async () => {
        mockGetArticles.mockResolvedValue([mockArticle]);
        renderWithRouter('1', 7);

        const backButton = await screen.findByText('Back to Articles');
        fireEvent.click(backButton);

        await waitFor(() => {
            expect(window.location.pathname).toBe('/');
            expect(window.location.search).toBe('');
        });
    });
}); 