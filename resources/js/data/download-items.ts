export type DownloadCategory = '364' | '363' | '362';

export type DownloadItem = {
    id: string;
    title: string;
    descriptionHtml: string;
    fileHref: string;
    category: DownloadCategory;
};

export const downloadCategories = [
    { csn: null, label: '全部' },
    { csn: '364', label: '會議記錄' },
    { csn: '363', label: '歷史公文' },
    { csn: '362', label: '公文下載' },
] as const;

export const downloadItems: DownloadItem[] = [
    {
        id: '362-1',
        title: '[示意] 入會申請書',
        descriptionHtml: '',
        fileHref: 'https://uploads.posu.tw//22/2236/20260722141303.pdf',
        category: '362',
    },
    {
        id: '363-1',
        title: '[示意] 本會第6屆8月份理監事會',
        descriptionHtml: '(109)博識字第789號',
        fileHref: 'https://uploads.posu.tw//22/2236/20260722141214.jpg',
        category: '363',
    },
    {
        id: '363-2',
        title: '[示意] 八月份例會暨授證籌備會',
        descriptionHtml: '(108)博識字第456號',
        fileHref: 'https://uploads.posu.tw//22/2236/20260722141052.jpg',
        category: '363',
    },
    {
        id: '363-3',
        title: '[示意] 本會第6屆2月份理監事會',
        descriptionHtml: '(109)博識字第123號',
        fileHref: 'https://uploads.posu.tw//22/2236/20260722141013.jpg',
        category: '363',
    },
];

export const DOWNLOAD_PER_PAGE = 12;

export function getDownloadCategoryLabel(csn: string | null | undefined): string {
    return downloadCategories.find(c => c.csn === (csn ?? null))?.label ?? '全部';
}

export function normalizeDownloadCsn(csn: string | null | undefined): string | null {
    if (!csn) {
        return null;
    }

    const normalized = String(csn);
    return downloadCategories.some(c => c.csn === normalized) ? normalized : null;
}

export function filterDownloadItems(csn: string | null | undefined): DownloadItem[] {
    const normalized = normalizeDownloadCsn(csn);

    if (!normalized) {
        return downloadItems;
    }

    return downloadItems.filter(item => item.category === normalized);
}

export function getDownloadTotal(csn: string | null | undefined): number {
    return filterDownloadItems(csn).length;
}

export function getDownloadTotalPages(csn: string | null | undefined): number {
    const total = getDownloadTotal(csn);

    if (total === 0) {
        return 0;
    }

    return Math.ceil(total / DOWNLOAD_PER_PAGE);
}

export function getDownloadPageItems(csn: string | null | undefined, page: number): DownloadItem[] {
    const filtered = filterDownloadItems(csn);
    const start = (page - 1) * DOWNLOAD_PER_PAGE;

    return filtered.slice(start, start + DOWNLOAD_PER_PAGE);
}

export function downloadCategoryHref(csn?: string | null): string {
    if (!csn) {
        return '/download';
    }

    return `/download?new_csn=${csn}`;
}
