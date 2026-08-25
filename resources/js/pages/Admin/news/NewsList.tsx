import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { 
    FaSearch, FaPlus, FaEdit, FaTrash, FaEye, 
    FaHome, FaBullhorn, FaEnvelope, FaSort,
    FaChevronLeft, FaChevheelonRight,
    FaCalendar, FaTag, FaUser
} from 'react-icons/fa';

interface NewsItem {
    id: number;
    title: string;
    category: string;
    language: string;
    views: number;
    show_on_home: boolean;
    show_marquee: boolean;
    sort_order: number;
    published_at: string;
    end_date: string;
    created_at: string;
    updated_at: string;
}

export default function NewsList() {
    const [searchId, setSearchId] = useState('');
    const [searchTitle, setSearchTitle] = useState('');
    const [searchCategory, setSearchCategory] = useState('');
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Sample data (replace with API data)
    const newsItems: NewsItem[] = [
        {
            id: 135520,
            title: '2026年7月1日聯誼餐敘',
            category: '會務活動',
            language: '繁中',
            views: 8,
            show_on_home: true,
            show_marquee: true,
            sort_order: 999,
            published_at: '2026-07-13 17:06',
            end_date: '2200-12-31',
            created_at: '2026-07-13',
            updated_at: '2026-07-13'
        },
        {
            id: 135519,
            title: '2026年度捐血接力暨聯合捐血活動',
            category: '最新公告',
            language: '繁中',
            views: 7,
            show_on_home: true,
            show_marquee: true,
            sort_order: 999,
            published_at: '2026-07-13 17:06',
            end_date: '2200-12-31',
            created_at: '2026-07-13',
            updated_at: '2026-07-13'
        },
        {
            id: 135518,
            title: '會員服務',
            category: '會務活動',
            language: '繁中',
            views: 7,
            show_on_home: true,
            show_marquee: true,
            sort_order: 999,
            published_at: '2026-07-13 17:06',
            end_date: '2200-12-31',
            created_at: '2026-07-13',
            updated_at: '2026-07-13'
        },
        {
            id: 135517,
            title: '2025-2027年度糖尿病篩檢社會服務',
            category: '最新公告',
            language: '繁中',
            views: 7,
            show_on_home: true,
            show_marquee: true,
            sort_order: 999,
            published_at: '2026-07-13 17:06',
            end_date: '2200-12-31',
            created_at: '2026-07-13',
            updated_at: '2026-07-13'
        }
    ];

    const filteredItems = newsItems.filter(item => {
        const matchId = searchId === '' || item.id.toString().includes(searchId);
        const matchTitle = searchTitle === '' || item.title.includes(searchTitle);
        const matchCategory = searchCategory === '' || item.category === searchCategory;
        return matchId && matchTitle && matchCategory;
    });

    const totalPages = Math.ceil(filteredItems.length / 10);
    const currentItems = filteredItems.slice((currentPage - 1) * 10, currentPage * 10);

    const categories = [...new Set(newsItems.map(item => item.category))];

    return (
        <>
            <Head title="最新消息" />
            
            <div className="bg-white rounded-xl shadow-sm p-6 text-gray-900">
                {/* Header */}
                <div className="border-b border-gray-200 pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FaBullhorn className="text-blue-500" /> 最新消息
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">管理所有最新消息</p>
                </div>

                {/* Tools Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex flex-wrap items-center gap-2">
                        {/* All Button */}
                        <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm">
                            全
                        </button>

                        {/* Homepage Filter */}
                        <button className="bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-lg text-sm flex items-center gap-1">
                            <FaHome /> 首頁
                        </button>

                        {/* Marquee Filter */}
                        <button className="bg-yellow-100 hover:bg-yellow-200 px-4 py-2 rounded-lg text-sm flex items-center gap-1">
                            <FaBullhorn /> 跑馬燈
                        </button>

                        {/* Search by ID */}
                        <div className="flex items-center gap-1">
                            <input
                                type="number"
                                placeholder="編號"
                                value={searchId}
                                onChange={(e) => setSearchId(e.target.value)}
                                className="border rounded-lg px-3 py-2 text-sm w-20 focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700">
                                查詢
                            </button>
                        </div>

                        {/* Search by Title */}
                        <div className="flex items-center gap-1">
                            <input
                                type="text"
                                placeholder="主題"
                                value={searchTitle}
                                onChange={(e) => setSearchTitle(e.target.value)}
                                className="border rounded-lg px-3 py-2 text-sm w-32 focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700">
                                查詢
                            </button>
                        </div>

                        {/* Category Filter */}
                        <select
                            value={searchCategory}
                            onChange={(e) => setSearchCategory(e.target.value)}
                            className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">所有分類</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>

                        {/* Date Range */}
                        <div className="flex items-center gap-1">
                            <input
                                type="date"
                                value={dateStart}
                                onChange={(e) => setDateStart(e.target.value)}
                                className="border rounded-lg px-2 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="text-gray-400">~</span>
                            <input
                                type="date"
                                value={dateEnd}
                                onChange={(e) => setDateEnd(e.target.value)}
                                className="border rounded-lg px-2 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700">
                                查詢
                            </button>
                        </div>
                    </div>

                    {/* Add New Button */}
                    <Link
                        href="/admin/news/create"
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm"
                    >
                        <FaPlus /> 新增資料
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-24">首頁/跑馬燈</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-10">No</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-28">排序</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-16">發佈</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-24">分類</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">主題</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-16">點閱數</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-32">發佈/截止</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-28">管理</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentItems.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-3 py-2">
                                        <div className="flex flex-col items-center gap-1">
                                            <Link
                                                href={`/admin/news/${item.id}/toggle-home`}
                                                className={`text-sm ${item.show_on_home ? 'text-blue-600' : 'text-gray-400'}`}
                                            >
                                                <FaHome className="inline" /> 首頁
                                            </Link>
                                            <div className="border-t border-dashed border-gray-300 w-full"></div>
                                            <Link
                                                href={`/admin/news/${item.id}/toggle-marquee`}
                                                className={`text-sm ${item.show_marquee ? 'text-blue-600' : 'text-gray-400'}`}
                                            >
                                                <FaBullhorn className="inline" /> 跑馬燈
                                            </Link>
                                        </div>
                                    </td>
                                    <td className="px-3 py-2 text-center text-sm">
                                        {index + 1}.
                                    </td>
                                    <td className="px-3 py-2">
                                        <div className="text-center text-xs text-gray-600">{item.language}</div>
                                        <div className="border-t border-dashed border-gray-300 my-1"></div>
                                        <div className="flex items-center justify-center gap-1">
                                            <input
                                                type="number"
                                                defaultValue={item.sort_order}
                                                className="w-12 border rounded px-1 py-0.5 text-xs text-center"
                                            />
                                            <button className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs hover:bg-blue-600">
                                                修改
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-3 py-2 text-center text-xs">{item.language}</td>
                                    <td className="px-3 py-2 text-center text-sm">{item.category}</td>
                                    <td className="px-3 py-2">
                                        <Link
                                            href={`/admin/news/${item.id}/edit`}
                                            className="text-blue-600 hover:underline text-sm"
                                        >
                                            {item.title}
                                        </Link>
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        <span className="font-bold">{item.views}</span>
                                        <button
                                            onClick={() => {
                                                if (confirm(`確定要清除: ${item.title} ？`)) {
                                                    // API call to reset views
                                                }
                                            }}
                                            className="text-red-500 hover:text-red-700 text-xs block"
                                        >
                                            清除
                                        </button>
                                    </td>
                                    <td className="px-3 py-2 text-center text-sm">
                                        {item.published_at}
                                        <div className="border-t border-dashed border-gray-300 my-1"></div>
                                        {item.end_date}
                                    </td>
                                    <td className="px-3 py-2">
                                        <div className="flex flex-col items-center gap-1 text-sm">
                                            <Link
                                                href={`/admin/news/${item.id}/edit`}
                                                className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                            >
                                                <FaEdit size={14} /> 編輯
                                            </Link>
                                            <div className="border-t border-dashed border-gray-300 w-full"></div>
                                            <Link
                                                href={`/admin/news/${item.id}/preview`}
                                                target="_blank"
                                                className="text-green-600 hover:text-green-800 flex items-center gap-1"
                                            >
                                                <FaEye size={14} /> 預覽
                                            </Link>
                                            <div className="border-t border-dashed border-gray-300 w-full"></div>
                                            <Link
                                                href={`/admin/news/${item.id}/sms`}
                                                target="_blank"
                                                className="text-purple-600 hover:text-purple-800 flex items-center gap-1"
                                            >
                                                <FaEnvelope size={14} /> 發簡訊
                                            </Link>
                                            <div className="border-t border-dashed border-gray-300 w-full"></div>
                                            <button
                                                onClick={() => {
                                                    if (confirm(`確定要刪除: ${item.title} ？`)) {
                                                        // API call to delete
                                                    }
                                                }}
                                                className="text-red-600 hover:text-red-800 flex items-center gap-1"
                                            >
                                                <FaTrash size={14} /> 刪除
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-gray-50">
                            <tr>
                                <td colSpan={9} className="px-3 py-2 text-center text-xs text-gray-500">
                                    {filteredItems.length > 0 ? (
                                        `共 ${filteredItems.length} 筆 - 在 ${currentPage} 頁 - 共 ${totalPages} 頁`
                                    ) : (
                                        '沒有資料'
                                    )}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-gray-600">
                            共 {filteredItems.length} 筆 - 在 {currentPage} 頁 - 共 {totalPages} 頁
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage(1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1 border rounded text-sm hover:bg-gray-50 disabled:opacity-50"
                            >
                                首頁
                            </button>
                            <button
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1 border rounded text-sm hover:bg-gray-50 disabled:opacity-50"
                            >
                                <FaChevronLeft size={12} />
                            </button>
                            <span className="px-3 py-1 border rounded text-sm bg-blue-600 text-white">
                                {currentPage}
                            </span>
                            <button
                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 border rounded text-sm hover:bg-gray-50 disabled:opacity-50"
                            >
                                <FaChevronRight size={12} />
                            </button>
                            <button
                                onClick={() => setCurrentPage(totalPages)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 border rounded text-sm hover:bg-gray-50 disabled:opacity-50"
                            >
                                末頁
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}