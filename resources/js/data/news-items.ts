export type NewsCategory = '3604' | '3603';

export type NewsItem = {
    sn: string;
    title: string;
    date: string; // YYYY-MM-DD
    photo: string;
    photoW: number;
    photoH: number;
    excerpt?: string;
    content: string;
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
        content: `
<p><img style="display:block;margin-left:auto;margin-right:auto;" src="https://uploads.posu.tw/22/2236/1784688713_0.jpg" alt="" width="600"></p>
<p><img style="display:block;margin-left:auto;margin-right:auto;" src="https://uploads.posu.tw/22/2236/1784688730_0.jpg" alt="" width="600"></p>
<p style="text-align:center;"><img src="https://uploads.posu.tw/22/2236/1784688751_0.jpg" alt="" width="600"></p>
<p><img style="display:block;margin-left:auto;margin-right:auto;" src="https://uploads.posu.tw/22/2236/1784688766_0.jpg" alt="" width="600"></p>
<p style="text-align:center;"><img src="https://uploads.posu.tw/22/2236/1784688810_0.jpg" alt="" width="600"></p>
<p>文：同濟記者/永康會 林頌恒<br>圖：永康會 會長 林頌恒 / 秘書長 梁晏誠<br><br>
永康同濟會秉持「服務人群、造福社會」的宗旨，於10月4日晚間11點由梁晏誠秘書長帶領，在林頌恒會長的指導與支持下，啟程前往花蓮縣偏鄉地區，展開一場愛心捐贈的跨夜送暖行動。<br><br>
此次捐贈物資包含酸痛貼布、高壓水管及多項生活用品，旨在協助當地居民改善生活條件，並關懷長期從事勞動及生活不便的族群。永康會團隊歷經長途跋涉，於10月5日上午順利抵達花蓮並完成物資發放，為偏鄉地區注入一股溫暖與力量。<br><br>
林頌恒會長表示，同濟精神的核心在於「團結與服務」，能在第一時間送上協助，是永康會的榮幸，也是應盡的責任。他期盼透過這次行動，讓更多人感受到社會中源源不絕的愛與關懷。<br><br>
梁晏誠秘書長也感性指出，雖然行程緊湊、舟車勞頓，但當看到偏鄉居民露出真誠的笑容時，一切辛勞都化為值得。未來永康同濟會將持續推動公益活動，把愛心的足跡延伸到更多需要被看見的角落。<br><br>
永康同濟會自創會以來，始終以社會服務與公益行動為己任，實踐「以行動服務、以愛心關懷」的理念。以堅定的信念與持續的付出，展現同濟精神的真諦，讓世界因善意而更加美好。</p>`,
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
        content: `<p>國際同濟會臺灣總會澎嘉南區第50、51屆主席交接典禮於2025年9月15日圓滿舉行，場面盛大隆重，各地同濟會代表踴躍出席，共同見證這一歷史性時刻。</p>
<p>交接典禮在熱烈掌聲中進行，新任主席正式就任，表示將秉持同濟精神，積極推動各項公益活動與社會服務工作，為地區社會帶來更多正面影響。</p>`,
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
        content: `<p>永康同濟會的會員們熱情響應，一同前往嘉義參加阿里山同濟會的交接活動，展現出同濟會員跨地區的深厚情誼與團結精神。</p>
<p>此次活動不僅加深了兩地同濟會之間的聯繫，也讓雙方會員有機會交流服務經驗，共同討論未來合作的可能性，為推動更廣泛的公益事業奠定良好基礎。</p>`,
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
        content: `<p>國際同濟會於2024年7月30日在北台南家扶中心舉行愛心捐鞋聯合社服活動，活動圓滿成功，共集結多個同濟分會共同參與。</p>
<p>本次活動共捐出數百雙新鞋，送至有需要的弱勢家庭兒童，讓孩子們穿上合腳的鞋子，帶著滿滿的愛心踏上每一步。感謝所有參與會員的慷慨付出，讓愛心傳遞到每一個需要的角落。</p>`,
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
        content: `<p>永康會與澎嘉南區同濟會攜手合作，共同辦理以「反毒反暴力」為主題的籃球賽，透過體育活動向青少年傳遞正確的價值觀。</p>
<p>活動在熱烈的氣氛中完美落幕，參賽隊伍展現了高超的球技與良好的運動精神。主辦單位表示，希望藉由此類活動，讓青少年在健康的環境中成長，遠離毒品與暴力的誘惑。</p>`,
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
    return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function findNewsItem(sn: string | null | undefined): NewsItem | null {
    if (!sn) return null;
    return newsItems.find(item => item.sn === sn) ?? null;
}
