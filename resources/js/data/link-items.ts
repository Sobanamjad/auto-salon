export type LinkCategory = '900' | '899';

export type LinkItem = {
    href: string;
    title: string;
    img: string;
    imgW: number;
    imgH: number;
    categories: LinkCategory[];
};

export const linkCategories = [
    { csn: null, label: '全部' },
    { csn: '900', label: '政府單位' },
    { csn: '899', label: '本會相關' },
] as const;

export const linkItems: LinkItem[] = [
    {
        href: 'https://www.kiwanis.org.tw/',
        title: '國際同濟會台灣總會',
        img: '/asd_files/s20260722143043100.png',
        imgW: 1024,
        imgH: 1024,
        categories: ['899'],
    },
    {
        href: 'https://www.youtube.com/@%E5%90%8C%E6%BF%9F%E6%96%B0%E8%81%9E%E5%8F%B0',
        title: '同濟新聞台',
        img: '/asd_files/s2026072214362130.png',
        imgW: 1024,
        imgH: 1024,
        categories: ['899'],
    },
    {
        href: 'https://drive.google.com/drive/folders/0B1BHPOKkSSugZUFEckM3RTZjYkE?resourcekey=0-UgELiJx818yBj1p6SyfvnQ',
        title: '網路硬碟',
        img: '/asd_files/s2026072214383290.png',
        imgW: 1024,
        imgH: 1024,
        categories: ['899'],
    },
    {
        href: 'https://www.tainan.gov.tw/Default.aspx',
        title: '台南市政府',
        img: '/asd_files/s202507251351370.png',
        imgW: 1024,
        imgH: 600,
        categories: ['900'],
    },
    {
        href: 'https://b-partner.org/',
        title: '商務夥伴協會',
        img: '/asd_files/s2026071314025490.png',
        imgW: 1024,
        imgH: 1024,
        categories: ['899'],
    },
];

export function getLinkCategoryLabel(csn: string | null | undefined): string {
    return linkCategories.find(c => c.csn === (csn ?? null))?.label ?? '全部';
}

export function filterLinkItems(csn: string | null | undefined): LinkItem[] {
    if (!csn) {
        return linkItems;
    }

    return linkItems.filter(item => item.categories.includes(csn as LinkCategory));
}
