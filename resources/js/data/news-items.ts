export type NewsCategory = '3604' | '3603';

export type NewsItem = {
    sn: string;
    title: string;
    date: string; // YYYY-MM-DD
    photo: string;
    photoW: number;
    photoH: number;
    excerpt?: string;
    categories: NewsCategory[];
};

export const newsCategories = [
    { csn: null, label: '全部' },
    { csn: '3604', label: '會務訊息' },
    { csn: '3603', label: '會務活動' },
] as const;

export const newsItems: NewsItem[] = [
    {
        sn: '136462',
        title: '以團結為名、以服務為行　 永康同濟會跨夜送暖花蓮',
        date: '2025-10-05',
        photo: '/news_files/s2026072210534540.jpg',
        photoW: 768,
        photoH: 1024,
        excerpt: '',
        categories: ['3603'],
    },
    {
        sn: '136461',
        title: '國際同濟會臺灣總會澎嘉南區第50、51屆主席交接典禮',
        date: '2025-09-15',
        photo: '/news_files/s2026072210451960.jpg',
        photoW: 1024,
        photoH: 768,
        excerpt: '澎嘉南區主席交接典禮圓滿成功',
        categories: ['3604'],
    },
    {
        sn: '136460',
        title: '永康同濟會會員一同參加嘉義阿里山同濟會的交接活動！',
        date: '2025-08-20',
        photo: '/news_files/s2026072210425840.jpg',
        photoW: 1024,
        photoH: 768,
        excerpt: '',
        categories: ['3603'],
    },
    {
        sn: '136457',
        title: '國際同濟會24/07/30 於北台南家扶中心舉行愛心捐鞋聯合社服活動！',
        date: '2024-07-30',
        photo: '/news_files/s2026072210323270.jpg',
        photoW: 1024,
        photoH: 768,
        excerpt: '愛心捐鞋活動圓滿成功',
        categories: ['3603'],
    },
    {
        sn: '136452',
        title: '永康會與澎嘉南區同濟會共同辦理反毒反暴力的籃球賽',
        date: '2024-06-15',
        photo: '/news_files/s2026072210194340.jpg',
        photoW: 1024,
        photoH: 768,
        excerpt: '',
        categories: ['3603'],
    },
];

export function getNewsCategoryLabel(csn: string | null | undefined): string {
    return newsCategories.find(c => c.csn === (csn ?? null))?.label ?? '全部';
}

export function newsViewHref(sn: string): string {
    return `/news_view?new_sn=${sn}&lang=TS`;
}

export function filterNewsItems(csn: string | null | undefined, searchTitle?: string | null): NewsItem[] {
    let items = newsItems;
    if (csn) {
        items = items.filter(item => item.categories.includes(csn as NewsCategory));
    }
    if (searchTitle?.trim()) {
        const query = searchTitle.trim().toLowerCase();
        items = items.filter(item => item.title.toLowerCase().includes(query));
    }
    // Sort by date descending (newest first)
    return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
