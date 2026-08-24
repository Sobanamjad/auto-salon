import { Head, Link } from '@inertiajs/react';
import { 
    FaCalendar, FaImage, FaLeaf, FaBullhorn, FaPencilAlt, 
    FaGift, FaLaptop, FaUser, FaComments, FaSearch, 
    FaLink, FaArrowsAltV, FaUserMd, FaCoffee, FaTags, FaEdit 
} from 'react-icons/fa';

export default function Dashboard() {
    // Navigation items data - Chinese Traditional
    const navItems = [
        { icon: FaCalendar, label: '活動管理', href: '/admin/events' }, 
        { icon: FaImage, label: '活動花絮', href: '/albums/public/ad_cate.php?right_sn=260725' },
        { icon: FaLeaf, label: '關於本會', href: '/about/public/ad_about.php?right_sn=260723' },
        { icon: FaBullhorn, label: '最新消息', href: '/news/public/ad_news.php?right_sn=260727' },
        { icon: FaBullhorn, label: '會員公告', href: '/news/public/ad_news_in.php?right_sn=260728' },
        { icon: FaPencilAlt, label: '專欄園地', href: '/article/public/ad_article.php?right_sn=260730' },
        { icon: FaGift, label: '會員商品', href: '/product/public/ad_pd.php?right_sn=260740' },
        { icon: FaLaptop, label: '理監事(組織)', href: '/work/public/ad_work.php?right_sn=260734' },
        { icon: FaUser, label: '會員資訊', href: '/member/public/ad_member.php?right_sn=260738' },
        { icon: FaComments, label: '留言板', href: '/qa/public/ad_qa1.php?right_sn=260736' },
        { icon: FaSearch, label: '人才招募', href: '/job/public/ad_job.php?right_sn=260743' },
        { icon: FaLink, label: '相關連結', href: '/link/public/ad_link.php?right_sn=260735' },
        { icon: FaArrowsAltV, label: '本會記事', href: '/timeline/public/ad_timeline.php?right_sn=260744' },
        { icon: FaUserMd, label: '夥伴介紹', href: '/member/people/ad_people.php?right_sn=260739' },
        { icon: FaBullhorn, label: '社團新聞', href: '/news/public/ad_uninews.php?right_sn=260729' },
        { icon: FaCoffee, label: '主題新知', href: '/article/public/ad_article_local.php?right_sn=260731' },
        { icon: FaTags, label: '紅白帖', href: '/vote/public/ad_red_white.php?right_sn=260751' },
        { icon: FaEdit, label: '日記簿', href: '/account/money/ad_rd.php?right_sn=260748' },
    ];

    return (
        <>
            <Head title="Admin Dashboard" />
            
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Navigation Panel */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="border-b border-gray-200 pb-3 mb-4">
                            <p className="text-sm text-gray-500 text-center">2026-08-20</p>
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