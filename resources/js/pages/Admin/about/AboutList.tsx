import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { 
    FaSearch, FaPlus, FaInfoCircle, FaEye, 
    FaEdit, FaTrash, FaSort, FaFilter,
    FaChevronLeft, FaChevronRight, FaHome
} from 'react-icons/fa';

interface About {
    id: number;
    language: string;
    status: boolean;
    show_on_home: boolean;
    sort_order: number;
    category: string | null;
    subject: string;
    content: string;
    image: string | null;
    note: string | null;
    created_at: string;
    updated_at: string;
}

interface PageProps {
    abouts: About[];
    title: string;
}

export default function AboutList({ abouts, title }: PageProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const handleDelete = (id: number, subject: string) => {
        if (confirm(`確定要刪除: ${subject} 嗎？`)) {
            router.delete(`/admin/about/${id}`, {
                onSuccess: () => {
                    window.location.href = '/admin/about';
                }
            });
        }
    };

    // Get unique categories for filter
    const categories = [...new Set(abouts.map(about => about.category).filter(Boolean))];

    // Filter abouts based on search and category
    const filteredAbouts = abouts.filter(about => {
        const matchesSearch = about.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             about.content.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === '' || about.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const totalPages = Math.ceil(filteredAbouts.length / 10);
    const currentAbouts = filteredAbouts.slice((currentPage - 1) * 10, currentPage * 10);

    const getLanguageLabel = (lang: string) => {
        switch(lang) {
            case 'TS': return '繁中';
            case 'EN': return '英文';
            case 'JP': return '日文';
            default: return lang;
        }
    };

    return (
        <>
            <Head title="關於本會" />
            
            <div className="bg-white rounded-xl shadow-sm p-6">
                {/* Header */}
                <div className="border-b border-gray-200 pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FaInfoCircle className="text-blue-500" /> {title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">管理關於本會內容</p>
                </div>

                {/* Tools Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Search */}
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="主題或內容..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="border rounded-lg px-3 py-2 pl-9 text-sm w-48 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
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
                                className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
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
                        href="/admin/about/create"
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm"
                    >
                        <FaPlus /> 新增資料
                    </Link>
                </div>

                {/* About Table */}
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
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-20">語言</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-20">狀態</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-20">首頁</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-24">分類</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">主題</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-24">相片</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-28">管理</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentAbouts.map((about, index) => (
                                <tr key={about.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-3 py-2 text-center text-sm">
                                        <FaHome className="inline text-gray-400" />
                                        <div className="text-xs text-gray-500">{index + 1}.</div>
                                    </td>
                                    <td className="px-3 py-2">
                                        <div className="flex items-center justify-center gap-1">
                                            <input
                                                type="number"
                                                defaultValue={about.sort_order}
                                                className="w-12 border rounded px-1 py-0.5 text-xs text-center text-gray-900"
                                            />
                                            <button className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs hover:bg-blue-600">
                                                更新
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-3 py-2 text-center text-sm">{getLanguageLabel(about.language)}</td>
                                    <td className="px-3 py-2 text-center text-xs">
                                        <span className={`px-2 py-1 rounded text-xs ${
                                            about.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {about.status ? '發布' : '隱藏'}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2 text-center text-xs">
                                        <span className={`px-2 py-1 rounded text-xs ${
                                            about.show_on_home ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {about.show_on_home ? '顯示' : '不顯示'}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2 text-center text-sm">{about.category || '-'}</td>
                                    <td className="px-3 py-2 text-sm">
                                        <Link href={`/admin/about/${about.id}/edit`} className="text-blue-600 hover:underline">
                                            {about.subject}
                                        </Link>
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {about.image ? (
                                            <img src={about.image} alt={about.subject} className="h-12 w-12 object-cover rounded border" />
                                        ) : (
                                            <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                                                <FaInfoCircle size={20} />
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-3 py-2">
                                        <div className="flex flex-col items-center gap-1">
                                            <Link
                                                href={`/admin/about/${about.id}/edit`}
                                                className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                                            >
                                                <FaEdit size={14} /> 編輯
                                            </Link>
                                            <div className="border-t border-dashed border-gray-300 w-full"></div>
                                            <button
                                                onClick={() => handleDelete(about.id, about.subject)}
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
                            共 {filteredAbouts.length} 筆 - 在 {currentPage} 頁 - 共 {totalPages} 頁
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
