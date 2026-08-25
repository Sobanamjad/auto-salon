import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { 
    FaSearch, FaPlus, FaEdit, FaTrash, FaImage, 
    FaSort, FaEye, FaChevronLeft, FaChevronRight,
    FaInfoCircle, FaFileAlt
} from 'react-icons/fa';

interface AboutEntry {
    id: number;
    subject: string;
    language: string;
    image: string | null;
    views: number;
    created_at: string;
    updated_at: string;
    sort_order: number;
    category: string;
}

export default function AboutUsList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Sample data (replace with API data)
    const entries: AboutEntry[] = [
        {
            id: 7863,
            subject: '成立宗旨',
            language: '繁中',
            image: 'https://uploads.posu.tw/22/2226/s2026071010271530.png',
            views: 27,
            created_at: '2026-07-13',
            updated_at: '2026-07-13',
            sort_order: 1,
            category: '社團達人-社團展示'
        },
        {
            id: 7862,
            subject: '組織章程',
            language: '繁中',
            image: null,
            views: 8,
            created_at: '2026-07-13',
            updated_at: '2026-07-13',
            sort_order: 999,
            category: '社團達人-社團展示'
        }
    ];

    const filteredEntries = entries.filter(entry =>
        entry.subject.includes(searchTerm)
    );

    const totalPages = Math.ceil(filteredEntries.length / 10);
    const currentEntries = filteredEntries.slice((currentPage - 1) * 10, currentPage * 10);

    return (
        <>
            <Head title="關於本會" />
            
            <div className="bg-white rounded-xl shadow-sm p-6 text-gray-900">
                {/* Header */}
                <div className="border-b border-gray-200 pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FaInfoCircle className="text-blue-500" /> 關於本會
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">管理協會介紹內容</p>
                </div>

                {/* Tools Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Search */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="主題..."
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

                    {/* Add New Button */}
                    <Link
                        href="/admin/about/create"
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
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-10">No</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-28">排序</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-20">發佈</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">主題</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-24">相片</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-20">點閱數</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-32">填寫/異動</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-28">管理</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentEntries.map((entry, index) => (
                                <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-3 py-2 text-center text-sm">
                                        {index + 1}.
                                    </td>
                                    <td className="px-3 py-2">
                                        <div className="text-center text-xs text-gray-600">{entry.language}</div>
                                        <div className="border-t border-dashed border-gray-300 my-1"></div>
                                        <div className="flex items-center justify-center gap-1">
                                            <input
                                                type="number"
                                                defaultValue={entry.sort_order}
                                                className="w-12 border rounded px-1 py-0.5 text-xs text-center text-gray-900"
                                            />
                                            <button className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs hover:bg-blue-600">
                                                更新
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-3 py-2 text-center text-xs">{entry.language}</td>
                                    <td className="px-3 py-2">
                                        <div className="flex items-center gap-2">
                                            <FaFileAlt className="text-gray-400" size={14} />
                                            <Link 
                                                href={`/admin/about/${entry.id}/edit`}
                                                className="text-blue-600 hover:underline text-sm"
                                            >
                                                {entry.subject}
                                            </Link>
                                            <span className="text-xs text-gray-400">{entry.category}</span>
                                        </div>
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {entry.image ? (
                                            <img 
                                                src={entry.image} 
                                                alt={entry.subject} 
                                                className="h-12 w-12 object-cover rounded border mx-auto"
                                            />
                                        ) : (
                                            <span className="text-gray-400 text-xs">無相片</span>
                                        )}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        <span className="font-bold">{entry.views}</span>
                                        <button
                                            onClick={() => {
                                                if (confirm(`確定要清除: ${entry.subject} ？`)) {
                                                    // API call to reset views
                                                }
                                            }}
                                            className="text-red-500 hover:text-red-700 text-xs block"
                                        >
                                            清除
                                        </button>
                                    </td>
                                    <td className="px-3 py-2 text-center text-sm">
                                        {entry.created_at}
                                        <div className="border-t border-dashed border-gray-300 my-1"></div>
                                        {entry.updated_at}
                                    </td>
                                    <td className="px-3 py-2">
                                        <div className="flex flex-col items-center gap-1">
                                            <Link
                                                href={`/admin/about/${entry.id}/edit`}
                                                className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                                            >
                                                <FaEdit size={14} /> 編輯
                                            </Link>
                                            <div className="border-t border-dashed border-gray-300 w-full"></div>
                                            <button
                                                onClick={() => {
                                                    if (confirm(`確定要刪除: ${entry.subject} 嗎？`)) {
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
                        <tfoot className="bg-gray-50">
                            <tr>
                                <td colSpan={8} className="px-3 py-2 text-center text-xs text-gray-500">
                                    {filteredEntries.length > 0 ? (
                                        `共 ${filteredEntries.length} 筆 - 在 ${currentPage} 頁 - 共 ${totalPages} 頁`
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
                            共 {filteredEntries.length} 筆 - 在 {currentPage} 頁 - 共 {totalPages} 頁
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