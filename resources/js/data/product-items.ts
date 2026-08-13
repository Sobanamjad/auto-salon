export type ProductCategory = '7519' | '7518' | '7517';

export type ProductItem = {
    sn: string;
    title: string;
    img: string;
    imgW: number;
    imgH: number;
    descriptionHtml: string;
    category: ProductCategory;
};

export const productCategories = [
    { csn: '7519', label: '保養飾品' },
    { csn: '7518', label: '居家用品' },
    { csn: '7517', label: '吃吃喝喝' },
] as const;

const xinzhanBadge =
    '<p><a href="https://www.xinzhansilver.com/product_view.php?id=69158" target="_blank" rel="noopener noreferrer">' +
    '<img style="float: left;" src="/asd_files/1783926018_0.png" alt="" width="200" /></a></p>';

const xinzhanBadge2 =
    '<p><a href="https://www.xinzhansilver.com/product_view.php?id=69161" target="_blank" rel="noopener noreferrer">' +
    '<img style="float: left;" src="/asd_files/1783926018_0.png" alt="" width="200" /></a></p>';

export const productItems: ProductItem[] = [
    {
        sn: '28066',
        title: '純銀易扣耳環2',
        img: '/asd_files/s2026072214160850.jpg',
        imgW: 1024,
        imgH: 1024,
        category: '7519',
        descriptionHtml:
            '材質：925銀<br />' +
            '外直徑尺寸：約11ｍｍ<br />' +
            '內直徑尺寸：約8ｍｍ<br />' +
            '水滴鑽尺寸：約6×4ｍｍ<br />' +
            '圓鑽尺寸：約3ｍｍ<br />' +
            '<br />' +
            xinzhanBadge,
    },
    {
        sn: '28065',
        title: '純銀易扣耳環',
        img: '/asd_files/s20260722141549100.jpg',
        imgW: 1024,
        imgH: 1024,
        category: '7519',
        descriptionHtml:
            '材質：925銀<br />' +
            '外直徑尺寸：約10ｍｍ<br />' +
            '內直徑尺寸：約8ｍｍ<br />' +
            '主體尺寸：約5×5×5ｍｍ<br />' +
            '<br />' +
            xinzhanBadge2,
    },
];

export const PRODUCT_PER_PAGE = 12;
export const DEFAULT_PRODUCT_CSN: ProductCategory = '7519';

export function getProductCategoryLabel(csn: string): string {
    return productCategories.find(c => c.csn === csn)?.label ?? productCategories[0].label;
}

export function filterProductItems(csn: string, searchTitle?: string | null): ProductItem[] {
    let items = productItems.filter(item => item.category === csn);

    if (searchTitle?.trim()) {
        const query = searchTitle.trim().toLowerCase();
        items = items.filter(item => item.title.toLowerCase().includes(query));
    }

    return items;
}

export function getProductTotal(csn: string, searchTitle?: string | null): number {
    return filterProductItems(csn, searchTitle).length;
}

export function getProductTotalPages(csn: string, searchTitle?: string | null): number {
    return Math.max(1, Math.ceil(getProductTotal(csn, searchTitle) / PRODUCT_PER_PAGE));
}

export function getProductPageItems(
    csn: string,
    page: number,
    searchTitle?: string | null,
): ProductItem[] {
    const filtered = filterProductItems(csn, searchTitle);
    const start = (page - 1) * PRODUCT_PER_PAGE;

    return filtered.slice(start, start + PRODUCT_PER_PAGE);
}

export function productViewHref(sn: string, upSn: string): string {
    return `/product_view?new_sn=${sn}&up_sn=${upSn}&lang=TS`;
}

export function productCategoryHref(csn: string, upSn: string): string {
    return `/product?new_csn=${csn}&up_sn=${upSn}`;
}
