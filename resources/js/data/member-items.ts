export type MemberCategory = '307' | '303' | '302';

export type MemberItem = {
    sn: string;
    name: string;
    company: string;
    jobTitle?: string;
    photo: string;
    photoW: number;
    photoH: number;
    website?: string;
    phones: string[];
    fax?: string;
    line?: string;
    email?: string;
    address?: string;
    intro?: string;       // HTML string for 個人介紹
    categories: MemberCategory[];
};

export const memberCategories = [
    { csn: null, label: '全部' },
    { csn: '307', label: '水電工程' },
    { csn: '303', label: '資訊科技' },
    { csn: '302', label: '製造業' },
] as const;

export const memberItems: MemberItem[] = [
    {
        sn: '1',
        name: '曾小化 [資料示意]',
        company: 'xxx科技公司',
        jobTitle: '',
        photo: '/memmer_files/s2026072311244690.jpg',
        photoW: 1024,
        photoH: 1024,
        website: 'https://www.posu.tw/',
        phones: ['062667100', '0911222333', '062667101'],
        fax: '06-3662480',
        line: 'posu80',
        email: 'service@posu.com.tw',
        address: '台南市仁德區文賢路一段862巷8號',
        intro: `<p><strong>【個人簡介】</strong></p>
<p>擁有豐富的資訊系統整合與技術管理經驗，現任職於資訊科技業資訊組長。專注於企業數位轉型、軟體開發生命週期（SDLC/SSDLC）管理、雲端架構維運與資訊安全防禦機制。</p>
<p>擅長將複雜的技術語言轉化為高效的業務解決方案，跨部門推動資訊系統的升級與優化。著重於建立高穩定度、高擴充性且兼具安全性的IT基礎設施，協助企業在數位浪潮中保持關鍵競爭力。</p>
<p><strong>【核心專長】</strong></p>
<p>✦ 企業資訊系統架構與專案管理</p>
<p>✦ 軟體開發與資安防護（SSDLC / 滲透測試 / 資安防禦）</p>
<p>✦ 雲端服務與伺服器架構維運管理</p>
<p>✦ 跨部門溝通與技術團隊帶領</p>
<p><iframe style="display:table;margin-left:auto;margin-right:auto;" title="YouTube video player" src="https://www.youtube.com/embed/eLuOQ4m4Fcc?si=e1UL5_zS6HbtKdcA" width="560" height="315" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></p>`,
        categories: ['303'],
    },
    {
        sn: '2',
        name: '王大明 [資料示意]',
        company: '臺南歸仁農會',
        jobTitle: '',
        photo: '/memmer_files/202607221414355319.png',
        photoW: 1024,
        photoH: 763,
        phones: ['06-2301234'],
        categories: ['302'],
    },
    {
        sn: '3',
        name: '李小美 [資料示意]',
        company: '微光藝宿',
        jobTitle: '',
        photo: '/memmer_files/202607221414355319.png',
        photoW: 1024,
        photoH: 763,
        phones: ['06-3334444'],
        categories: ['307'],
    },
    {
        sn: '4',
        name: '陳建國 [資料示意]',
        company: '佳和實業',
        jobTitle: '',
        photo: '/memmer_files/202607221414355319.png',
        photoW: 1024,
        photoH: 763,
        phones: ['06-5556666'],
        categories: ['302'],
    },
];

export function getMemberCategoryLabel(csn: string | null | undefined): string {
    return memberCategories.find(c => c.csn === (csn ?? null))?.label ?? '全部';
}

export function filterMemberItems(csn: string | null | undefined, searchTitle?: string | null): MemberItem[] {
    let items = memberItems;
    if (csn) {
        items = items.filter(item => item.categories.includes(csn as MemberCategory));
    }
    if (searchTitle?.trim()) {
        const query = searchTitle.trim().toLowerCase();
        items = items.filter(item =>
            item.name.toLowerCase().includes(query) ||
            item.company.toLowerCase().includes(query)
        );
    }
    return items;
}
