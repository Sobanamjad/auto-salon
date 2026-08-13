export type ArticleCategory = '3119' | '3120';

export type ArticleItem = {
    sn: string;
    title: string;
    img: string;
    imgW: number;
    imgH: number;
    summary: string;
    category: ArticleCategory;
};

export const articleCategories = [
    { csn: null, label: '全部' },
    { csn: '3119', label: '會友專欄' },
    { csn: '3120', label: '會友動態' },
] as const;

export const articleItems: ArticleItem[] = [
    {
        sn: '15662',
        title: '有哪些方法可以提高社團的參與度?',
        img: '/asd_files/s2026072313114170.png',
        imgW: 1024,
        imgH: 1024,
        summary: '會友xxx分享',
        category: '3119',
    },
    {
        sn: '15661',
        title: '勝選關鍵與策略',
        img: '/asd_files/s2026072313154230.png',
        imgW: 1024,
        imgH: 1024,
        summary: '會友xxx 分享',
        category: '3120',
    },
    {
        sn: '15660',
        title: '如何與民眾拉近更密切關係?',
        img: '/asd_files/s2026072313193220.png',
        imgW: 1024,
        imgH: 1024,
        summary: '真正打動人心的，不是華麗政見，而是讓選民感受到「你在乎他們的生活」。',
        category: '3119',
    },
];

export const ARTICLE_PER_PAGE = 12;

export function getArticleCategoryLabel(csn: string | null | undefined): string {
    return articleCategories.find(c => c.csn === (csn ?? null))?.label ?? '全部';
}

export function normalizeArticleCsn(csn: string | null | undefined): string | null {
    if (!csn) {
        return null;
    }

    const normalized = String(csn);
    return articleCategories.some(c => c.csn === normalized) ? normalized : null;
}

export function filterArticleItems(csn: string | null | undefined): ArticleItem[] {
    const normalized = normalizeArticleCsn(csn);

    if (!normalized) {
        return articleItems;
    }

    return articleItems.filter(item => item.category === normalized);
}

export function getArticleTotal(csn: string | null | undefined): number {
    return filterArticleItems(csn).length;
}

export function getArticleTotalPages(csn: string | null | undefined): number {
    return Math.max(1, Math.ceil(getArticleTotal(csn) / ARTICLE_PER_PAGE));
}

export function getArticlePageItems(csn: string | null | undefined, page: number): ArticleItem[] {
    const filtered = filterArticleItems(csn);
    const start = (page - 1) * ARTICLE_PER_PAGE;

    return filtered.slice(start, start + ARTICLE_PER_PAGE);
}

export function articleViewHref(sn: string): string {
    return `/article_view?new_sn=${sn}&lang=TS`;
}

export function articleCategoryHref(csn?: string | null): string {
    if (!csn) {
        return '/article';
    }

    return `/article?new_csn=${csn}`;
}
