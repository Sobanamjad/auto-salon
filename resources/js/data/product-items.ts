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

const peanutBadge =
    '<p><a href="https://www.peanut.com.tw/product_view.php?id=55256" target="_blank" rel="noopener noreferrer">' +
    '<img style="float: left;" src="/asd_files/1783926018_0.png" alt="" width="200" /></a></p>';

const ichingBadge66482 =
    '<p><a href="https://shop.iching.com.tw/product_view.php?id=66482&cat=7246" target="_blank" rel="noopener noreferrer">' +
    '<img style="float: left;" src="/asd_files/1783926018_0.png" alt="" width="200" /></a></p>';

const ichingBadge66486 =
    '<p><a href="https://shop.iching.com.tw/product_view.php?id=66486&cat=7246" target="_blank" rel="noopener noreferrer">' +
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
    {
        sn: '28068',
        title: '室翲香白色小粒萘丸450g',
        img: '/asd_files/s2026072214170190.jpg',
        imgW: 784,
        imgH: 1024,
        category: '7518',
        descriptionHtml:
            '怡慶萘丸，採用高純度精萘製造，產品多樣，<br />' +
            '從傳統式的白色小萘丸、彩色萘丸，到各種不同形狀的萘丸<br />' +
            '適用於衣櫥、抽屜、浴廁、貯藏室等空間，是居家不可或缺的好幫手。<br />' +
            '1. 規格：450g(錠劑) / 包<br />' +
            '2. 保存期限：兩年<br />' +
            '3. 保存期限：2 年<br />' +
            '<br />' +
            ichingBadge66482,
    },
    {
        sn: '28067',
        title: '室翲香大粒萘丸量販包1000g',
        img: '/asd_files/s2026072214163040.jpg',
        imgW: 1024,
        imgH: 1024,
        category: '7518',
        descriptionHtml:
            '量販包夾鍊設計, 經濟實惠, 便利好用。<br />' +
            '怡慶萘丸，採用高純度精萘製造，產品多樣，<br />' +
            '從傳統式的白色小萘丸、彩色萘丸，到各種不同形狀的萘丸<br />' +
            '適用於衣櫥、抽屜、浴廁、貯藏室等空間，是居家不可或缺的好幫手<br />' +
            '1. 規格：1000g(錠劑) / 包<br />' +
            '2. 箱裝入數：20 包<br />' +
            '3. 保存期限：2 年<br />' +
            '<br />' +
            ichingBadge66486,
    },
    {
        sn: '28069',
        title: '花菓酥禮盒 | 綜合花果酥禮盒',
        img: '/asd_files/s2026072214172740.jpg',
        imgW: 928,
        imgH: 1024,
        category: '7517',
        descriptionHtml:
            '• 綜合花菓酥禮盒含花菓酥5種口味：仁平、芝麻、花生粉、椰子、海苔<br />' +
            '• 綜合花菓酥禮盒採台灣本產9號花生製作<br />' +
            '• 麥芽、花生、脆餅完美結合，酥脆不黏牙<br />' +
            '• 綜合花菓酥禮盒機器全自動包裝，產品安全、衛生、美觀<br />' +
            '• 綜合花菓酥禮盒採嚴選食材、天然原料，請放心食用<br />' +
            '• 純素可用<br />' +
            '• 產品成份：9號花生、麵粉、黑芝麻、海苔、椰子、麥芽、砂糖、玉米粉、杏仁、白芝麻<br />' +
            '• 保存期限：2個月<br />' +
            '• 產品規格：盒裝<br />' +
            '<br />' +
            peanutBadge,
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
