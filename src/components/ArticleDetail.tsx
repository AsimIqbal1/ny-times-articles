import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Box,
    CircularProgress,
    Link
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Article } from '../types/Article';
import { getArticles } from '../services/articleService';
import { Period } from './PeriodSelector';

const DEFAULT_PERIOD: Period = 7;

const ArticleDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [searchParams] = useSearchParams();
    const period = Number(searchParams.get('period') || DEFAULT_PERIOD) as Period;
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const articles = await getArticles(period);
                const found = articles.find(a => a.id === Number(id));
                if (found) {
                    setArticle(found);
                    setError(null);
                } else {
                    setError('Article not found');
                }
            } catch (err) {
                setError('Failed to fetch article details');
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id, period]);

    const handleBack = () => {
        window.history.back();
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (error || !article) {
        return (
            <Box mt={4}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={handleBack}
                    sx={{ mb: 2 }}
                >
                    Back to Articles
                </Button>
                <Typography color="error" align="center">
                    {error || 'Article not found'}
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={handleBack}
                sx={{ mb: 2 }}
            >
                Back to Articles
            </Button>
            <Card>
                {article.media[0]?.['media-metadata']?.[2]?.url && (
                    <CardMedia
                        component="img"
                        height="300"
                        image={article.media[0]['media-metadata'][2].url}
                        alt={article.title}
                        sx={{ objectFit: 'contain' }}
                    />
                )}
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        {article.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                        {article.byline}
                    </Typography>
                    <Typography variant="body1" paragraph>
                        {article.abstract}
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                        Published: {article.published_date}
                    </Typography>
                    <Link href={article.url} target="_blank" rel="noopener noreferrer">
                        Read full article on NY Times
                    </Link>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ArticleDetail; 