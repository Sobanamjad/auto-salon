import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { 
    FaSearch, FaEye, FaTrash, FaNewspaper, 
    FaMapMarkerAlt, FaTag, FaChevronLeft, FaChevronRight,
    FaBullhorn, FaExclamationCircle
} from 'react-icons/fa';

interface ClubNews {
    id: number;
    title: string;
    city: string;
    district: string;
    village: string;
    source: string;
    category: string;
    views: number;
    is_excluded: boolean;
    created_at: string;
}

interface Props {
    news: ClubNews[];
    title?: string;
}

export default function ClubNews({ news = [], title = '社團新聞' }: Props) {
    const [searchTitle, setSearchTitle] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredItems = news.filter(item =>
        item.title.toLowerCase().includes(searchTitle.toLowerCase())
    );

    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleDelete = (id: number, title: string) => {
        if (confirm(`確定要刪除: ${title} 嗎？`)) {
            router.delete(`/admin/club-news/${id}`);
        }
    };

    const handleToggleExclude = (id: number) => {
        router.get(`/admin/club-news/${id}/toggle-exclude`);
    };

    return (
        <>
            <Head title={title} />
            
            <div className="bg-white rounded-xl shadow-sm p-6">
                {/* Header */}
                <div className="border-b border-gray-200 pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FaNewspaper className="text-blue-500" /> {title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">管理所有社團新聞 (70天資料)</p>
                    <div className="text-sm text-gray-600 mt-2">總新聞：{news.length} 筆</div>
                </div>

                {/* Tools Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex flex-wrap items-center gap-3">
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
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                            查詢
                        </button>
                    </div>

                    <Link
                        href="/admin/club-news/exclude"
                        className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 flex items-center gap-2 text-sm"
                    >
                        <FaExclamationCircle /> 排除的主題
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-8">No</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-24">地區</th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">主題</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-20">查看內容</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-24">行銷順風車</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-20">管理</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentItems.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-3 py-8 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <FaNewspaper size={32} className="text-gray-300" />
                                            <p>暫無新聞資料</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                currentItems.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-2 py-2 text-center text-sm">
                                            {(currentPage - 1) * itemsPerPage + index + 1}.
                                        </td>
                                        <td className="px-2 py-2 text-left text-sm">
                                            {item.city || '-'}
                                            {item.district && <div className="text-xs text-gray-500">{item.district}</div>}
                                        </td>
                                        <td className="px-2 py-2">
                                            <Link
                                                href={`/admin/club-news/${item.id}/detail`}
                                                target="_blank"
                                                className="text-blue-600 hover:underline text-sm"
                                            >
                                                {item.title}
                                            </Link>
                                            {item.source && (
                                                <div className="text-xs text-gray-400">{item.source}</div>
                                            )}
                                        </td>
                                        <td className="px-2 py-2 text-center">
                                            <Link
                                                href={`/admin/club-news/${item.id}/detail`}
                                                target="_blank"
                                                className="text-blue-600 hover:text-blue-800 flex items-center justify-center gap-1 text-sm"
                                            >
                                                <FaEye size={14} /> 詳細
                                            </Link>
                                        </td>
                                        <td className="px-2 py-2 text-center">
                                            <Link
                                                href={`/admin/club-news/${item.id}/promote`}
                                                className="text-green-600 hover:text-green-800 flex items-center justify-center gap-1 text-sm"
                                            >
                                                <FaBullhorn size={14} /> 免費行銷
                                            </Link>
                                        </td>
                                        <td className="px-2 py-2">
                                            <div className="flex flex-col items-center gap-0.5 text-xs">
                                                <button
                                                    onClick={() => handleToggleExclude(item.id)}
                                                    className={`text-${item.is_excluded ? 'green' : 'orange'}-600 hover:text-${item.is_excluded ? 'green' : 'orange'}-800 flex items-center gap-0.5`}
                                                >
                                                    <FaExclamationCircle size={12} />
                                                    {item.is_excluded ? '取消排除' : '排除'}
                                                </button>
                                                <div className="border-t border-dashed border-gray-300 w-full"></div>
                                                <button
                                                    onClick={() => handleDelete(item.id, item.title)}
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
                                <td colSpan={6} className="px-3 py-2 text-center text-xs text-gray-500">
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