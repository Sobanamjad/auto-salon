// resources/js/pages/Admin/Dashboard.tsx
import { Head, Link } from '@inertiajs/react';
import { 
    FaCalendar, FaImage, FaLeaf, FaBullhorn, FaPencilAlt, 
    FaGift, FaLaptop, FaUser, FaComments, FaSearch, 
    FaLink, FaArrowsAltV, FaUserMd, FaCoffee, FaTags, FaEdit 
} from 'react-icons/fa';

export default function Dashboard() {
    // Direct compute at render time
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Navigation items data - Chinese Traditional
    const navItems = [
        { icon: FaCalendar, label: '活動管理', href: '/admin/events' }, 
        { icon: FaImage, label: '活動花絮', href: '/admin/albums' },
        { icon: FaLeaf, label: '關於本會', href: '/admin/about' },
        { icon: FaBullhorn, label: '最新消息', href: '/admin/news' },
        { icon: FaBullhorn, label: '會員公告', href: '/admin/member-announcements' },
        { icon: FaPencilAlt, label: '專欄園地', href: '/admin/column-articles' },
        { icon: FaGift, label: '會員商品', href: '/admin/products' },
        { icon: FaLaptop, label: '理監事(組織)', href: '/admin/directors' },
        { icon: FaUser, label: '會員資訊', href: '/admin/members' },
        { icon: FaComments, label: '留言板', href: '/admin/guestbook' },
        { icon: FaSearch, label: '人才招募', href: '/admin/jobs' },
        { icon: FaLink, label: '相關連結', href: '/admin/links' },
        { icon: FaArrowsAltV, label: '本會記事', href: '/admin/timeline' },
        { icon: FaUserMd, label: '夥伴介紹', href: '/admin/partners' },
        { icon: FaBullhorn, label: '社團新聞', href: '/admin/club-news' },
        { icon: FaCoffee, label: '主題新知', href: '/admin/topics' },
        { icon: FaTags, label: '紅白帖', href: '/admin/red-white' },
        { icon: FaEdit, label: '日記簿', href: '/admin/journal' },
    ];

    return (
        <>
            <Head title="Admin Dashboard" />
            
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Navigation Panel */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="border-b border-gray-200 pb-3 mb-4">
                            <p className="text-sm text-gray-500 text-center">{currentDate}</p>
                            <h3 className="text-xl font-bold text-gray-800 text-center">
                                歡迎使用系統
                            </h3>
                        </div>

                        {/* Navigation Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                            {navItems.map((item, index) => {
                                const Icon = item.icon;
                                const isMessageBoard = item.label === '留言板';
                                
                                return (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:shadow-md border border-gray-100 hover:border-blue-200 group"
                                    >
                                        <Icon className="text-2xl text-gray-600 group-hover:text-blue-600 mb-2 transition-colors" />
                                        <span className="text-xs text-center text-gray-700 group-hover:text-blue-700 font-medium leading-tight">
                                            {isMessageBoard ? (
                                                <>
                                                    留言板 <span className="text-red-600 font-bold">(0)</span>
                                                </>
                                            ) : (
                                                item.label
                                            )}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}