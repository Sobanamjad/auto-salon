import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { 
    FaSearch, FaPlus, FaImage, FaFolder, FaEye, 
    FaEdit, FaTrash, FaComment, FaSort, FaFilter,
    FaChevronLeft, FaChevronRight, FaHome
} from 'react-icons/fa';

interface Album {
    id: number;
    name: string;
    category: string;
    language: string;
    thumbnail: string;
    photo_count: number;
    views: number;
    comments_unread: number;
    comments_total: number;
    sort_order: number;
    published: boolean;
}

export default function ActivityHighlights() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Sample album data (replace with API data)
    const albums: Album[] = [
        {
            id: 7030,
            name: '第11屆第二次月例餐會',
            category: '2025年',
            language: '繁中',
            thumbnail: 'https://uploads.posu.tw/22/2226/s202607141001346.png',
            photo_count: 3,
            views: 7,
            comments_unread: 0,
            comments_total: 0,
            sort_order: 999,
            published: true
        },
        {
            id: 7029,
            name: '第11屆 第一次月例餐會',
            category: '2025年',
            language: '繁中',
            thumbnail: 'https://uploads.posu.tw/22/2226/s202607141000465.png',
            photo_count: 3,
            views: 2,
            comments_unread: 0,
            comments_total: 0,
            sort_order: 999,
            published: true
        },
        {
            id: 7028,
            name: '慶祝母親節',
            category: '2026年',
            language: '繁中',
            thumbnail: 'https://uploads.posu.tw/22/2226/s202607141000138.png',
            photo_count: 2,
            views: 4,
            comments_unread: 0,
            comments_total: 0,
            sort_order: 999,
            published: true
        },
        {
            id: 7027,
            name: '本會聚餐',
            category: '2026年',
            language: '繁中',
            thumbnail: 'https://uploads.posu.tw/22/2226/s202607140959456.png',
            photo_count: 2,
            views: 4,
            comments_unread: 0,
            comments_total: 0,
            sort_order: 999,
            published: true
        }
    ];

    // Get unique categories for filter
    const categories = [...new Set(albums.map(album => album.category))];

    // Filter albums based on search and category
    const filteredAlbums = albums.filter(album => {
        const matchesSearch = album.name.includes(searchTerm);
        const matchesCategory = selectedCategory === '' || album.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const totalPages = Math.ceil(filteredAlbums.length / 10);
    const currentAlbums = filteredAlbums.slice((currentPage - 1) * 10, currentPage * 10);

    return (
        <>
            <Head title="活動花絮" />
            
            <div className="bg-white rounded-xl shadow-sm p-6">
                {/* Header */}
                <div className="border-b border-gray-200 pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FaImage className="text-blue-500" /> 活動花絮
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">管理活動相簿</p>
                </div>

                {/* Tools Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Search */}
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="相簿名稱..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="border rounded-lg px-3 py-2 pl-9 text-sm w-48 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <FaSearch className="absolute left-3 top-3 text-gray-400" size={14} />
                            </div>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                                查詢
                            </button>
                        </div>

                        {/* Category Filter */}
                        <div className="flex items-center gap-2">
                            <FaFilter className="text-gray-500" />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">分類選擇</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Add New Button */}
                    <Link
                        href="/admin/albums/create"
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm"
                    >
                        <FaPlus /> 新增資料
                    </Link>
                </div>

                {/* Album Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-10">No</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-20">
                                    <div className="flex items-center justify-center gap-1">
                                        <FaSort className="cursor-pointer" />
                                        排序
                                    </div>
                                </th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-20">發佈</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-24">分類</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">相簿名稱</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-24">代表圖</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-20">相片數</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-24">進入相簿</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-20">點閱數</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-28">留言</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-28">管理</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentAlbums.map((album, index) => (
                                <tr key={album.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-3 py-2 text-center text-sm">
                                        <FaHome className="inline text-gray-400" />
                                        <div className="text-xs text-gray-500">{index + 1}.</div>
                                    </td>
                                    <td className="px-3 py-2">
                                        <div className="text-center text-xs text-gray-600">{album.language}</div>
                                        <div className="border-t border-dashed border-gray-300 my-1"></div>
                                        <div className="flex items-center justify-center gap-1">
                                            <input
                                                type="number"
                                                defaultValue={album.sort_order}
                                                className="w-12 border rounded px-1 py-0.5 text-xs text-center text-gray-900"
                                            />
                                            <button className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs hover:bg-blue-600">
                                                更新
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-3 py-2 text-center text-xs">{album.language}</td>
                                    <td className="px-3 py-2 text-center text-sm">{album.category}</td>
                                    <td className="px-3 py-2 text-sm">
                                        <Link href={`/admin/albums/${album.id}`} className="text-blue-600 hover:underline">
                                            {album.name}
                                        </Link>
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        <img src={album.thumbnail} alt={album.name} className="h-12 w-12 object-cover rounded border" />
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        <span className="text-red-600 font-bold">{album.photo_count}</span>
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        <Link
                                            href={`/admin/albums/${album.id}/photos`}
                                            className="text-blue-600 hover:underline text-sm"
                                        >
                                            進入此相簿
                                        </Link>
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        <span className="text-red-600 font-bold">{album.views}</span>
                                        <button
                                            onClick={() => {
                                                if (confirm(`確定要清除: ${album.name} 點閱人紀錄嗎？`)) {
                                                    // API call to reset views
                                                }
                                            }}
                                            className="text-red-500 hover:text-red-700 text-xs block"
                                        >
                                            清除
                                        </button>
                                    </td>
                                    <td className="px-3 py-2">
                                        <div className="text-center text-sm">
                                            <Link
                                                href={`/admin/albums/${album.id}/comments`}
                                                className="text-blue-600 hover:underline"
                                            >
                                                留言
                                            </Link>
                                            <div className="border-t border-dashed border-gray-300 my-1"></div>
                                            <Link
                                                href={`/admin/albums/${album.id}/comments/unread`}
                                                className="text-sm"
                                            >
                                                未讀：<span className="text-red-500">{album.comments_unread}</span>
                                                <br />
                                                總共：<span className="text-gray-600">{album.comments_total}</span>
                                            </Link>
                                        </div>
                                    </td>
                                    <td className="px-3 py-2">
                                        <div className="flex flex-col items-center gap-1">
                                            <Link
                                                href={`/admin/albums/${album.id}/edit`}
                                                className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                                            >
                                                <FaEdit size={14} /> 編輯
                                            </Link>
                                            <div className="border-t border-dashed border-gray-300 w-full"></div>
                                            <button
                                                onClick={() => {
                                                    if (confirm(`確定要刪除: ${album.name} 嗎？ 包含相簿內相片一併刪除!!`)) {
                                                        // API call to delete
                                                    }
                                                }}
                                                className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1"
                                            >
                                                <FaTrash size={14} /> 刪除
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-gray-600">
                            共 {filteredAlbums.length} 筆 - 在 {currentPage} 頁 - 共 {totalPages} 頁
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage(1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1 border rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                首頁
                            </button>
                            <button
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1 border rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FaChevronLeft size={12} />
                            </button>
                            <span className="px-3 py-1 border rounded text-sm bg-blue-600 text-white">
                                {currentPage}
                            </span>
                            <button
                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 border rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FaChevronRight size={12} />
                            </button>
                            <button
                                onClick={() => setCurrentPage(totalPages)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 border rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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