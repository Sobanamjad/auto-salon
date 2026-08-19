import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    HomeIcon, 
    UsersIcon, 
    SettingsIcon, 
    LogOutIcon,
    MenuIcon,
    XIcon,
    FileTextIcon,
    CalendarIcon,
    ExternalLinkIcon,
    ChevronDownIcon,
    ChevronRightIcon
} from 'lucide-react';

interface AdminLayoutProps {
    children: React.ReactNode;
}

interface MenuItem {
    text: string;
    icon?: any;
    href?: string;
    category?: string;
    subcategory?: string;
    children?: MenuItem[];
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const { props } = usePage();
    const pageTitle = (props as any).title || 'Dashboard';
    const { url } = usePage();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [expandedMenus, setExpandedMenus] = useState<{ [key: string]: boolean }>({});

    const toggleMenu = (menuId: string) => {
        setExpandedMenus(prev => ({
            ...prev,
            [menuId]: !prev[menuId]
        }));
    };

    const menuStructure: MenuItem[] = [
        {
            text: '管理者',
            category: '管理者',
            children: [
                { text: '基本設定', href: '/admin/settings', subcategory: '使用者' },
            ]
        },
        {
            text: '網頁模組',
            category: '網頁模組',
            children: [
                { text: '個人資料', href: '/admin/profile', subcategory: '個人帳號' },
                { text: '本會資料', href: '/admin/organization', subcategory: '基本資料' },
                { text: '關於本會', href: '/admin/about', subcategory: '內容管理' },
                { text: '相片輪播', href: '/admin/slider', subcategory: '輪播管理' },
                { text: '活動花絮', href: '/admin/albums', subcategory: '相簿' },
                { text: '相片留言', href: '/admin/album-comments', subcategory: '留言管理' },
                { text: '最新消息', href: '/admin/news', subcategory: '內容管理' },
                { text: '會員公告', href: '/admin/member-announcements', subcategory: '僅會員可看' },
                { text: '社團新聞', href: '/admin/club-news', subcategory: '內容管理' },
                { text: '專欄園地', href: '/admin/articles', subcategory: '內容管理' },
                { text: '主題新知', href: '/admin/topics', subcategory: '主題新知' },
                { text: '公文與表單', href: '/admin/downloads', subcategory: '下載管理' },
                { text: '常見問題', href: '/admin/faq', subcategory: '內容管理' },
                { text: '理監事(組織)', href: '/admin/directors', subcategory: '作品資料' },
                { text: '相關連結', href: '/admin/links', subcategory: '連結資料' },
                { text: '留言板', href: '/admin/guestbook', subcategory: '內容管理' },
                { text: '會員分類', href: '/admin/member-categories', subcategory: '分類管理' },
                { text: '會員資訊', href: '/admin/members', subcategory: '一般會員' },
                { text: '夥伴介紹', href: '/admin/partners', subcategory: '人物管理' },
                { text: '會員商品', href: '/admin/products', subcategory: '產品管理' },
                { text: '活動管理', href: '/admin/events', subcategory: '活動管理' },
                { text: '好友活動', href: '/admin/friend-events', subcategory: '活動管理' },
                { text: '人才招募', href: '/admin/jobs', subcategory: '招募管理' },
                { text: '本會記事', href: '/admin/timeline', subcategory: '記事管理' },
            ]
        },
        {
            text: '會員收費',
            category: '會員收費',
            children: [
                { text: '基本設定', href: '/admin/payment-settings', subcategory: '基本設定' },
                { text: '繳費作業', href: '/admin/payments', subcategory: '作業管理' },
                { text: '報表統計', href: '/admin/payment-reports', subcategory: '報表統計' },
            ]
        },
        {
            text: '記帳系統',
            category: '記帳系統',
            children: [
                { text: '日記簿', href: '/admin/journal', subcategory: '基本設定' },
                { text: '科目', href: '/admin/accounts', subcategory: '基本設定' },
            ]
        },
        {
            text: '客服系統',
            category: '客服系統',
            children: [
                { text: '紅白帖分類', href: '/admin/red-white-categories', subcategory: '分類管理' },
                { text: '紅白帖', href: '/admin/red-white', subcategory: '紅白帖管理' },
            ]
        },
    ];

    const isActive = (href: string) => {
        if (href === '/admin') return url === href;
        return url.startsWith(href);
    };

    const handleLogout = () => {
        if (confirm('Are you sure you want to logout?')) {
            window.location.href = '/admin/logout';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } w-52 bg-white border-r border-gray-200 shadow-lg overflow-y-auto`}>
                {/* Top Navigation */}
                <div className="p-3 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                        <Link href="/admin/dashboard" className="flex items-center space-x-2">
                            <img src="/asd_files/202607211337474254.png" alt="Logo" className="w-6 h-6 object-contain" />
                            <span className="text-sm font-bold text-gray-800">管理系統</span>
                        </Link>
                        <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 rounded hover:bg-gray-100">
                            <XIcon className="w-4 h-4" />
                        </button>
                    </div>
                    
                    <div className="space-y-2 text-xs">
                        <button 
                            onClick={handleLogout}
                            className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                        >
                            <LogOutIcon className="w-3 h-3" />
                            <span>登出</span>
                        </button>
                        <div className="flex items-center space-x-2">
                            <Link href="/admin/dashboard" className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                                <HomeIcon className="w-3 h-3" />
                                <span>系統</span>
                            </Link>
                            <Link href="/" target="_blank" className="flex items-center space-x-1 text-gray-700 hover:text-gray-900" title="前台">
                                <ExternalLinkIcon className="w-3 h-3" />
                                <span>前台</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Menu Sections */}
                <div className="p-2">
                    <div className="text-xs font-medium text-gray-500 mb-2">社團達人展示</div>
                    <hr className="border-gray-300 mb-2" />
                    
                    {menuStructure.map((section, sectionIndex) => {
                        const sectionId = `section-${sectionIndex}`;
                        const isExpanded = expandedMenus[sectionId];
                        
                        return (
                            <div key={sectionIndex} className="mb-2">
                                <button
                                    onClick={() => toggleMenu(sectionId)}
                                    className="w-full flex items-center space-x-2 px-2 py-1 text-xs text-gray-700 hover:bg-gray-100 rounded transition"
                                >
                                    <div className="w-4 h-4 bg-gray-200 rounded flex items-center justify-center">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                    </div>
                                    <span className="font-medium">{section.text}</span>
                                    {isExpanded ? (
                                        <ChevronDownIcon className="w-3 h-3 ml-auto" />
                                    ) : (
                                        <ChevronRightIcon className="w-3 h-3 ml-auto" />
                                    )}
                                </button>
                                
                                {isExpanded && section.children && (
                                    <div className="ml-4 mt-1 space-y-1">
                                        {section.children.map((item, itemIndex) => (
                                            <div key={itemIndex}>
                                                <Link
                                                    href={item.href || '#'}
                                                    className={`flex items-center space-x-2 px-2 py-1 text-xs rounded transition ${
                                                        isActive(item.href || '') 
                                                            ? 'bg-blue-50 text-blue-600' 
                                                            : 'text-gray-700 hover:bg-gray-100'
                                                    }`}
                                                >
                                                    <div className="w-3 h-3 flex items-center justify-center">
                                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                                                    </div>
                                                    <span>{item.text}</span>
                                                </Link>
                                                {item.subcategory && (
                                                    <div className="ml-5 text-xs text-gray-400 mt-0.5">
                                                        {item.subcategory}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Contact Info */}
                <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-200 bg-white">
                    <hr className="border-gray-300 mb-2" />
                    <Link href="//posu.tw" target="_blank" className="text-xs text-gray-700 hover:text-gray-900">
                        博識高科技
                    </Link>
                    <div className="text-xs text-gray-500 mt-1">
                        06-2667100<br />
                        LINE:posu80
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-52' : 'ml-0'}`}>
                <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
                    <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center space-x-3">
                            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-gray-100 transition">
                                <MenuIcon className="w-4 h-4 text-gray-600" />
                            </button>
                            <h1 className="text-lg font-bold text-gray-800">{pageTitle}</h1>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className="text-xs text-gray-600">Welcome, Admin</span>
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">A</div>
                        </div>
                    </div>
                </header>

                <main className="p-4">{children}</main>
            </div>

            {sidebarOpen && <div className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />}
        </div>
    );
}