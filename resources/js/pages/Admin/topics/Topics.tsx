// resources/js/pages/Admin/topics/Topics.tsx
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { 
    FaSearch, FaEye, FaTrash, FaNewspaper, 
    FaMapMarkerAlt, FaTag, FaChevronLeft, FaChevronRight,
    FaBullhorn, FaFilter, FaList
} from 'react-icons/fa';

interface Topic {
    id: number;
    city: string;
    district: string;
    category: string;
    title: string;
    views: number;
    is_active: boolean;
    created_at: string;
}

interface Props {
    topics: {
        data: Topic[];
        current_page: number;
        last_page: number;
        total: number;
        per_page: number;
    };
    title?: string;
    categories: { id: string; name: string }[];
}

export default function Topics({ topics, title = '專業主題新知', categories }: Props) {
    const [searchTitle, setSearchTitle] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(topics.current_page || 1);

    const handleDelete = (id: number, title: string) => {
        if (confirm(`確定要刪除: ${title} 嗎？`)) {
            router.delete(`/admin/topics/${id}`);
        }
    };

    const handleSearch = () => {
        router.get('/admin/topics', {
            sel_title: searchTitle,
            sel_sn: selectedCategory,
            this_page: 1
        });
    };

    const handlePageChange = (page: number) => {
        router.get('/admin/topics', {
            sel_title: searchTitle,
            sel_sn: selectedCategory,
            this_page: page
        });
    };

    return (
        <>
            <Head title={title} />
            
            <div className="bg-white rounded-xl shadow-sm p-6 text-gray-900">
                {/* Header */}
                <div className="border-b border-gray-200 pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FaNewspaper className="text-blue-500" /> {title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">管理所有專業主題新知</p>
                    <div className="text-sm text-gray-600 mt-2">總主題：{topics.total} 筆</div>
                </div>

                {/* Tools Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Search by Title */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="主題..."
                                value={searchTitle}
                                onChange={(e) => setSearchTitle(e.target.value)}
                                className="border rounded-lg px-3 py-2 pl-9 text-sm w-48 focus:ring-2 focus:ring-blue-500"
                            />
                            <FaSearch className="absolute left-3 top-3 text-gray-400" size={14} />
                        </div>

                        {/* Filter by Category */}
                        <div className="relative">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="border rounded-lg px-3 py-2 pl-9 text-sm w-48 focus:ring-2 focus:ring-blue-500 appearance-none"
                            >
                                <option value="">所有分類</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            <FaFilter className="absolute left-3 top-3 text-gray-400" size={14} />
                        </div>

                        <button
                            onClick={handleSearch}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                        >
                            查詢
                        </button>

                        <button
                            onClick={() => {
                                setSearchTitle('');
                                setSelectedCategory('');
                                router.get('/admin/topics', { this_page: 1 });
                            }}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-400"
                        >
                            全部
                        </button>
                    </div>

                    <Link
                        href="/admin/topics/select"
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm"
                    >
                        <FaList /> 主題選擇
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-12">No.</th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-32">地區</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-28">分類</th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">主題</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-20">查看內容</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-24">行銷順風車</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-20">管理</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {topics.data.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-3 py-8 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <FaNewspaper size={32} className="text-gray-300" />
                                            <p>暫無主題資料</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                topics.data.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors cursor-pointer"
                                        onClick={() => router.get(`/admin/topics/${item.id}`)}>
                                        <td className="px-2 py-2 text-center text-sm">
                                            {(topics.current_page - 1) * topics.per_page + index + 1}.
                                        </td>
                                        <td className="px-2 py-2 text-left text-sm">
                                            {item.city || '-'}
                                            {item.district && <div className="text-xs text-gray-500">{item.district}</div>}
                                        </td>
                                        <td className="px-2 py-2 text-center text-sm">
                                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                                                {item.category || '-'}
                                            </span>
                                        </td>
                                        <td className="px-2 py-2 text-sm">
                                            {item.title}
                                        </td>
                                        <td className="px-2 py-2 text-center">
                                            <Link
                                                href={`/admin/topics/${item.id}`}
                                                className="text-blue-600 hover:text-blue-800 flex items-center justify-center gap-1 text-sm"
                                            >
                                                <FaEye size={14} /> 詳細
                                            </Link>
                                        </td>
                                        <td className="px-2 py-2 text-center">
                                            <a
                                                href={`../../tools/public/posu_ad.php?new_type=2&new_sn=${item.id}`}
                                                target="_blank"
                                                className="text-green-600 hover:text-green-800 flex items-center justify-center gap-1 text-sm"
                                            >
                                                <FaBullhorn size={14} /> 免費行銷
                                            </a>
                                        </td>
                                        <td className="px-2 py-2">
                                            <div className="flex flex-col items-center gap-0.5 text-xs">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        router.get(`/admin/topics/${item.id}/toggle-active`);
                                                    }}
                                                    className={`${item.is_active ? 'text-green-600' : 'text-gray-400'} hover:${item.is_active ? 'text-green-800' : 'text-gray-600'} flex items-center gap-0.5`}
                                                >
                                                    {item.is_active ? '啟用' : '停用'}
                                                </button>
                                                <div className="border-t border-dashed border-gray-300 w-full"></div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(item.id, item.title);
                                                    }}
                                                    className="text-red-600 hover:text-red-800 flex items-center gap-0.5"
                                                >
                                                    <FaTrash size={12} /> 刪除
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                        <tfoot className="bg-gray-50">
                            <tr>
                                <td colSpan={7} className="px-3 py-2 text-center text-xs text-gray-500">
                                    {topics.total > 0 ? (
                                        `共 ${topics.total} 筆 - 在 ${topics.current_page} 頁 - 共 ${topics.last_page} 頁`
                                    ) : (
                                        '沒有資料'
                                    )}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Pagination */}
                {topics.last_page > 1 && (
                    <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-gray-600">
                            共 {topics.total} 筆 - 在 {topics.current_page} 頁 - 共 {topics.last_page} 頁
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handlePageChange(1)}
                                disabled={topics.current_page === 1}
                                className="px-3 py-1 border rounded text-sm hover:bg-gray-50 disabled:opacity-50"
                            >
                                首頁
                            </button>
                            <button
                                onClick={() => handlePageChange(topics.current_page - 1)}
                                disabled={topics.current_page === 1}
                                className="px-3 py-1 border rounded text-sm hover:bg-gray-50 disabled:opacity-50"
                            >
                                <FaChevronLeft size={12} />
                            </button>
                            <span className="px-3 py-1 border rounded text-sm bg-blue-600 text-white">
                                {topics.current_page}
                            </span>
                            <button
                                onClick={() => handlePageChange(topics.current_page + 1)}
                                disabled={topics.current_page === topics.last_page}
                                className="px-3 py-1 border rounded text-sm hover:bg-gray-50 disabled:opacity-50"
                            >
                                <FaChevronRight size={12} />
                            </button>
                            <button
                                onClick={() => handlePageChange(topics.last_page)}
                                disabled={topics.current_page === topics.last_page}
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