import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    ListItemButton,
    Avatar,
    Typography,
    Paper,
    CircularProgress,
    Box
} from '@mui/material';
import { Article } from '../types/Article';
import { getArticles } from '../services/articleService';
import PeriodSelector, { Period } from './PeriodSelector';

const DEFAULT_PERIOD: Period = 7;

const ArticleList = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const period = Number(searchParams.get('period') || DEFAULT_PERIOD) as Period;

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                setLoading(true);
                const data = await getArticles(period);
                setArticles(data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch articles. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, [period]);

    const handlePeriodChange = (newPeriod: Period) => {
        setSearchParams({ period: newPeriod.toString() });
    };

    if (error) {
        return (
            <>
                <PeriodSelector value={period} onChange={handlePeriodChange} />
                <Typography color="error" align="center" mt={4}>
                    {error}
                </Typography>
            </>
        );
    }

    return (
        <>
            <PeriodSelector value={period} onChange={handlePeriodChange} />
            {loading ? (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            ) : (
                <Paper elevation={2}>
                    <List>
                        {articles.map((article) => (
                            <ListItem key={article.id} disablePadding divider>
                                <ListItemButton onClick={() => navigate(`/article/${article.id}`)}>
                                    <ListItemAvatar>
                                        <Avatar
                                            src={article.media[0]?.['media-metadata']?.[0]?.url}
                                            alt={article.title}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={article.title}
                                        secondary={
                                            <>
                                                <Typography component="span" variant="body2" color="text.primary">
                                                    {article.byline}
                                                </Typography>
                                                {` — ${article.published_date}`}
                                            </>
                                        }
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            )}
        </>
    );
};

export default ArticleList; 