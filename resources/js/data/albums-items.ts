
export interface AlbumCategory {
    id: string;
    name: string;
    url: string;
    active?: boolean;
}

export const albumCategories: AlbumCategory[] = [
    {
        id: 'all',
        name: '全部',
        url: '/albums',
        active: true
    },
    {
        id: '2026',
        name: '2026年',
        url: '/albums?year=2026'
    },
    {
        id: '2025',
        name: '2025年',
        url: '/albums?year=2025'
    },
    {
        id: '2024',
        name: '2024年',
        url: '/albums?year=2024'
    }
];