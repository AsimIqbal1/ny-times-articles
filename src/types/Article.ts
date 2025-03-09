export interface Article {
    id: number;
    title: string;
    abstract: string;
    byline: string;
    published_date: string;
    url: string;
    media: Array<{
        type: string;
        'media-metadata': Array<{
            url: string;
            format: string;
        }>;
    }>;
} 