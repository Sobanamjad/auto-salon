import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { 
    FaSearch, FaPlus, FaImage, FaFolder, FaEye, 
    FaEdit, FaTrash, FaComment, FaSort, FaFilter,
    FaChevronLeft, FaChevronRight, FaHome
} from 'react-icons/fa';

interface Album {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    cover_image: string | null;
    album_date: string | null;
    category: string;
    status: string;
    is_featured: boolean;
    sort_order: number;
    views: number;
    photo_count: number;
    comment_count: number;
    created_at: string;
    updated_at: string;
}

interface PageProps {
    albums: Album[];
    title: string;
}

export default function ActivityHighlights({ albums, title }: PageProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const handleDelete = (id: number, title: string) => {
        if (confirm(`確定要刪除: ${title} 嗎？ 包含相簿內相片一併刪除!!`)) {
            router.delete(`/admin/albums/${id}`, {
                onSuccess: () => {
                    window.location.href = '/admin/albums';
                }
            });
        }
    };

    // Get unique categories for filter
    const categories = [...new Set(albums.map(album => album.category))];

    // Filter albums based on search and category
    const filteredAlbums = albums.filter(album => {
        const matchesSearch = album.title.toLowerCase().includes(searchTerm.toLowerCase());
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
                        <FaImage className="text-blue-500" /> {title}
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
                                    placeholder="相簿標題..."
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
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-20">狀態</th>
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
                                        <div className="text-center text-xs text-gray-600">{album.is_featured ? '特色' : '一般'}</div>
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
                                    <td className="px-3 py-2 text-center text-xs">
                                        <span className={`px-2 py-1 rounded text-xs ${
                                            album.status === 'published' ? 'bg-green-100 text-green-800' :
                                            album.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                            {album.status === 'published' ? '已發布' :
                                             album.status === 'draft' ? '草稿' : '已封存'}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2 text-center text-sm">{album.category}</td>
                                    <td className="px-3 py-2 text-sm">
                                        <Link href={`/admin/albums/${album.id}/edit`} className="text-blue-600 hover:underline">
                                            {album.title}
                                        </Link>
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {album.cover_image ? (
                                            <img src={album.cover_image} alt={album.title} className="h-12 w-12 object-cover rounded border" />
                                        ) : (
                                            <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                                                <FaImage size={20} />
                                            </div>
                                        )}
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
                                                if (confirm(`確定要清除: ${album.title} 點閱人紀錄嗎？`)) {
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
                                                總共：<span className="text-gray-600">{album.comment_count}</span>
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
                                                onClick={() => handleDelete(album.id, album.title)}
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