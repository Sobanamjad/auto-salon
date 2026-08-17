export type AnnouncementCategory = '3' | '1' | '733' | '2';

export type AnnouncementItem = {
    sn: string;
    title: string;
    photo: string;
    photoW: number;
    photoH: number;
    status: '報名期間' | '活動結束' | '即將開始' | '進行中';
    statusIcon: string;
    link: string;
    isExternal: boolean;
    categories: AnnouncementCategory[];
};

export const announcementCategories = [
    { csn: null, label: '全部', param: null },
    { csn: '3', label: '行事曆', param: 'sel_nncsn' },
    { csn: '1', label: '總會活動', param: 'sel_nncsn' },
    { csn: '733', label: '本會活動', param: 'new_csn' },
    { csn: '2', label: '好友的活動', param: 'sel_nncsn' },
] as const;

export const announcementItems: AnnouncementItem[] = [
    {
        sn: '3905',
        title: '我要申請入會',
        photo: '/announcement_files/s2026072213350710.png',
        photoW: 1024,
        photoH: 824,
        status: '報名期間',
        statusIcon: '/announcement_files/time.png',
        link: 'https://gudate.com/2236/3905',
        isExternal: true,
        categories: ['733'],
    },
    {
        sn: '3904',
        title: '2025年度會員大會',
        photo: '/announcement_files/s2026072213350710.png',
        photoW: 1024,
        photoH: 824,
        status: '即將開始',
        statusIcon: '/announcement_files/time.png',
        link: 'https://gudate.com/2236/3904',
        isExternal: true,
        categories: ['733'],
    },
    {
        sn: '3903',
        title: '國際同濟會臺灣總會年會',
        photo: '/announcement_files/s2026072213350710.png',
        photoW: 1024,
        photoH: 824,
        status: '活動結束',
        statusIcon: '/announcement_files/time.png',
        link: 'https://gudate.com/2236/3903',
        isExternal: true,
        categories: ['1'],
    },
];

export function getAnnouncementCategoryLabel(csn: string | null | undefined, param: string | null | undefined): string {
    if (param === 'sel_nncsn') {
        const cat = announcementCategories.find(c => c.csn === csn && c.param === 'sel_nncsn');
        return cat?.label ?? '全部';
    } else if (param === 'new_csn') {
        const cat = announcementCategories.find(c => c.csn === csn && c.param === 'new_csn');
        return cat?.label ?? '全部';
    }
    return '全部';
}

export function filterAnnouncementItems(
    csn: string | null | undefined,
    param: string | null | undefined,
    searchTitle?: string | null
): AnnouncementItem[] {
    let items = announcementItems;
    
    // Filter by category
    if (csn) {
        items = items.filter(item => item.categories.includes(csn as AnnouncementCategory));
    }
    
    // Filter by search
    if (searchTitle?.trim()) {
        const query = searchTitle.trim().toLowerCase();
        items = items.filter(item => item.title.toLowerCase().includes(query));
    }
    
    return items;
}
