export type WorksCategory = '1694' | '1700' | '1701' | '1695' | '1692';

export type WorksItem = {
    sn: string;
    title: string;
    img: string;
    imgW: number;
    imgH: number;
    categories: WorksCategory[];
};

export const worksCategories = [
    { csn: null, label: '全部' },
    { csn: '1694', label: '現任會長' },
    { csn: '1700', label: '理監事' },
    { csn: '1701', label: '會務幹部' },
    { csn: '1695', label: '會務顧問' },
    { csn: '1692', label: '歷屆會長' },
] as const;

export const worksItems: WorksItem[] = [
    { sn: '5529', title: '[第三屆會長] 林頌恒', img: '/works_files/s2026072214434030.png', imgW: 775, imgH: 1024, categories: ['1694', '1692'] },
    { sn: '5530', title: '[創會長/第二屆會長] 張志豪', img: '/works_files/s20260722144450100.png', imgW: 775, imgH: 1024, categories: ['1692'] },
    { sn: '5522', title: '[榮譽創會長] 郭培權', img: '/works_files/s2026072217170280.png', imgW: 775, imgH: 1024, categories: ['1692'] },
    { sn: '5549', title: '[財務長] 王淑如', img: '/works_files/s2026072216514560.png', imgW: 775, imgH: 1024, categories: ['1701'] },
    { sn: '5548', title: '[秘書長] 梁晏誠', img: '/works_files/s2026072216505320.png', imgW: 775, imgH: 1024, categories: ['1701'] },
    { sn: '5541', title: '[法制顧問] 羅詠騰', img: '/works_files/202607221414355319.png', imgW: 1024, imgH: 763, categories: ['1695'] },
    { sn: '5540', title: '[會務顧問] 蔡麗青', img: '/works_files/202607221414355319.png', imgW: 1024, imgH: 763, categories: ['1695'] },
    { sn: '5539', title: '[會務顧問] 朱正軒', img: '/works_files/202607221414355319.png', imgW: 1024, imgH: 763, categories: ['1695'] },
    { sn: '5538', title: '[會務顧問] 蔡宗豪', img: '/works_files/202607221414355319.png', imgW: 1024, imgH: 763, categories: ['1695'] },
    { sn: '5537', title: '[會務顧問] 呂根銘', img: '/works_files/202607221414355319.png', imgW: 1024, imgH: 763, categories: ['1695'] },
    { sn: '5536', title: '[會務顧問] 黃瓊慧', img: '/works_files/202607221414355319.png', imgW: 1024, imgH: 763, categories: ['1695'] },
    { sn: '5535', title: '[會務顧問] 陳富群', img: '/works_files/202607221414355319.png', imgW: 1024, imgH: 763, categories: ['1695'] },
    { sn: '5534', title: '[會務顧問] 陳燦榮', img: '/works_files/202607221414355319.png', imgW: 1024, imgH: 763, categories: ['1695'] },
    { sn: '5533', title: '[會務顧問] 夏立岩', img: '/works_files/202607221414355319.png', imgW: 1024, imgH: 763, categories: ['1695'] },
    { sn: '5532', title: '[會務顧問] 吳俊賦', img: '/works_files/202607221414355319.png', imgW: 1024, imgH: 763, categories: ['1695'] },
    { sn: '5527', title: '[常務監事] 鄒耀德', img: '/works_files/s2026072211272880.png', imgW: 775, imgH: 1024, categories: ['1700'] },
    { sn: '5526', title: '[監事/榮譽會長] 曾翊銘', img: '/works_files/s2026072211264410.png', imgW: 775, imgH: 1024, categories: ['1700', '1692'] },
    { sn: '5525', title: '[監事] 吳宗融', img: '/works_files/s2026072211133440.png', imgW: 775, imgH: 1024, categories: ['1700'] },
    { sn: '5524', title: '[監事] 謝信安', img: '/works_files/s2026072211041880.jpg', imgW: 775, imgH: 1024, categories: ['1700'] },
    { sn: '5523', title: '[監事] 劉ㄧ德', img: '/works_files/s2026072211034850.jpg', imgW: 775, imgH: 1024, categories: ['1700'] },
];

export function worksItemHref(sn: string): string {
    return `/works_view?new_sn=${sn}&lang=TS`;
}

export function getWorksCategoryLabel(csn: string | null | undefined): string {
    return worksCategories.find(c => c.csn === (csn ?? null))?.label ?? '全部';
}

export function filterWorksItems(csn: string | null | undefined, searchTitle?: string | null): WorksItem[] {
    let items = worksItems;
    if (csn) {
        items = items.filter(item => item.categories.includes(csn as WorksCategory));
    }
    if (searchTitle?.trim()) {
        const query = searchTitle.trim().toLowerCase();
        items = items.filter(item => item.title.toLowerCase().includes(query));
    }
    return items;
}
