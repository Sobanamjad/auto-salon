
export interface AlbumItem {
    id: number;
    title: string;
    date: string;
    category: string;
    image: string;
    description?: string;
    viewUrl: string;
}

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

export const albumsItems: AlbumItem[] = [
    {
        id: 1,
        title: '2026年度春季會員大會',
        date: '2026-03-15',
        category: '2026年',
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
        description: '2026年度春季會員大會紀錄',
        viewUrl: '/albums_view?id=1'
    },
    {
        id: 2,
        title: '登山健行活動',
        date: '2026-04-20',
        category: '2026年',
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
        description: '登山健行活動記錄',
        viewUrl: '/albums_view?id=2'
    },
    {
        id: 3,
        title: '夏季露營活動',
        date: '2026-07-10',
        category: '2026年',
        image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800',
        description: '夏季露營活動記錄',
        viewUrl: '/albums_view?id=3'
    },
    {
        id: 4,
        title: '志工服務活動',
        date: '2026-05-25',
        category: '2026年',
        image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800',
        description: '志工服務活動記錄',
        viewUrl: '/albums_view?id=4'
    },
    {
        id: 5,
        title: '秋季旅遊活動',
        date: '2026-10-15',
        category: '2026年',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
        description: '秋季旅遊活動記錄',
        viewUrl: '/albums_view?id=5'
    },
    {
        id: 6,
        title: '聖誕節聯歡晚會',
        date: '2026-12-20',
        category: '2026年',
        image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=800',
        description: '聖誕節聯歡晚會記錄',
        viewUrl: '/albums_view?id=6'
    },
    {
        id: 7,
        title: '新年茶會',
        date: '2027-01-10',
        category: '2027年',
        image: 'https://images.unsplash.com/photo-1503376763036-066120622c74?w=800',
        description: '新年茶會記錄',
        viewUrl: '/albums_view?id=7'
    },
    {
        id: 8,
        title: '春季野餐活動',
        date: '2027-03-25',
        category: '2027年',
        image: 'https://images.unsplash.com/photo-1568607688298-68499558d95b?w=800',
        description: '春季野餐活動記錄',
        viewUrl: '/albums_view?id=8'
    }
];

export const getAlbumsByCategory = (category?: string): AlbumItem[] => {
    if (!category || category === 'all') {
        return albumsItems;
    }

    return albumsItems.filter(item => item.category === category);
};

export const getAlbumsByYear = (year?: string): AlbumItem[] => {
    if (!year) {
        return albumsItems;
    }

    return albumsItems.filter(item => item.category === `${year}年`);
};