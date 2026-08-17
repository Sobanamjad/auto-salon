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
    line?: string;
    email?: string;
    address?: string;
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
        line: 'posu80',
        email: 'service@posu.com.tw',
        address: '台南市永康區中華路425號',
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
