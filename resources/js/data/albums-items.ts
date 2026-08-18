
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
        id: 7075,
        title: '2026-07-22 永康國際同濟會第一屆第五次理監事會議',
        date: '2026-07-22',
        category: '2026年',
        image: '/asd_files/s202607221405366.png',
        description: '永康國際同濟會第一屆第五次理監事會議紀錄',
        viewUrl: '/albums_view?id=7075'
    },
    {
        id: 7079,
        title: '2025-08-20 臺灣同濟會50年年會',
        date: '2025-08-20',
        category: '2025年',
        image: '/asd_files/s202607221407447.jpg',
        description: '參與臺灣同濟會50週年慶祝大會',
        viewUrl: '/albums_view?id=7079'
    },
    {
        id: 7078,
        title: '2024-08-20 高雄展覽館50屆全國年會',
        date: '2024-08-20',
        category: '2024年',
        image: '/asd_files/s202607221407071.jpg',
        description: '高雄展覽館舉辦的第50屆全國年會活動',
        viewUrl: '/albums_view?id=7078'
    },
    {
        id: 7077,
        title: '2024-08-20 永康會創會授證典禮',
        date: '2024-08-20',
        category: '2024年',
        image: '/asd_files/s202607221406322.jpg',
        description: '永康國際同濟會創會授證典禮盛大舉行',
        viewUrl: '/albums_view?id=7077'
    },
    {
        id: 7076,
        title: '2024-08-13 永康同濟會-第二次會議',
        date: '2024-08-13',
        category: '2024年',
        image: '/asd_files/s202607221406077.jpg',
        description: '永康同濟會第二次會議活動記錄',
        viewUrl: '/albums_view?id=7076'
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