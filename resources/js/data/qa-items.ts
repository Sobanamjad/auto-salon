export type QaCategory = '382';

export type QaItem = {
    question: string;
    answerHtml: string;
    categories: QaCategory[];
};

export const qaCategories = [
    { csn: null, label: '全部' },
    { csn: '382', label: '加入問題' },
] as const;

export const qaItems: QaItem[] = [
    {
        question: '加入本會需要收費嗎？費用多少？',
        answerHtml: '<p>是的。主要分為入會費、常年會費：$1000/年，入會費：$500。</p>',
        categories: ['382'],
    },
    {
        question: '如何加入本會？',
        answerHtml:
            '<p>請於網站「我要加入本會」填寫您的基本資料即可，並附上相關證明，我們在收到您的加入訊息，會主動與您聯繫並核對您的相關資料。非常歡迎您的加入！</p>' +
            '<p><a href="/announcement" target="_blank" rel="noopener noreferrer">https://auto.52salon.com/2236/announcement?new_csn=605</a></p>',
        categories: ['382'],
    },
];

export function getQaCategoryLabel(csn: string | null | undefined): string {
    return qaCategories.find(c => c.csn === (csn ?? null))?.label ?? '全部';
}

export function filterQaItems(csn: string | null | undefined): QaItem[] {
    if (!csn) {
        return qaItems;
    }

    return qaItems.filter(item => item.categories.includes(csn as QaCategory));
}

export const QA_PER_PAGE = 10;

export function getQaTotal(csn: string | null | undefined): number {
    return filterQaItems(csn).length;
}

export function getQaTotalPages(csn: string | null | undefined): number {
    return Math.max(1, Math.ceil(getQaTotal(csn) / QA_PER_PAGE));
}

export function getQaPageItems(csn: string | null | undefined, page: number): QaItem[] {
    const filtered = filterQaItems(csn);
    const start = (page - 1) * QA_PER_PAGE;

    return filtered.slice(start, start + QA_PER_PAGE);
}
