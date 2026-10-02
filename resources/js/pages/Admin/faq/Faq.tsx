import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { 
    FaPlus, FaEdit, FaTrash, FaQuestionCircle,
    FaChevronLeft, FaChevronRight
} from 'react-icons/fa';

interface FaqItem {
    id: number;
    category: string | null;
    question: string;
    answer_html: string;
    status: boolean;
    sort_order: number;
    views: number;
    created_at: string;
    updated_at: string;
}

interface FaqListProps {
    faqs: FaqItem[];
}

export default function Faq({ faqs: faqItems }: FaqListProps) {
    const [searchQuestion, setSearchQuestion] = useState('');
    const [searchCategory, setSearchCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredItems = faqItems.filter(item => {
        const matchQuestion = searchQuestion === '' || item.question.includes(searchQuestion);
        const matchCategory = searchCategory === '' || (item.category && item.category.includes(searchCategory));
        return matchQuestion && matchCategory;
    });

    const totalPages = Math.ceil(filteredItems.length / 10);
    const currentItems = filteredItems.slice((currentPage - 1) * 10, currentPage * 10);

    const categories = [...new Set(faqItems.filter(item => item.category).map(item => item.category as string))];

    return (
        <>
            <Head title="常見問題" />
            
            <div className="bg-white rounded-xl shadow-sm p-6 text-gray-900">
                {/* Header */}
                <div className="border-b border-gray-200 pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FaQuestionCircle className="text-blue-500" /> 常見問題
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">管理所有常見問題</p>
                </div>

                {/* Tools Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex flex-wrap items-center gap-2">
                        {/* Search by Question */}
                        <div className="flex items-center gap-1">
                            <input
                                type="text"
                                placeholder="問題"
                                value={searchQuestion}
                                onChange={(e) => setSearchQuestion(e.target.value)}
                                className="border rounded-lg px-3 py-2 text-sm w-48 focus:ring-2 focus:ring-blue-500"
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
                    </div>

                    {/* Add New Button */}
                    <Link
                        href="/admin/faq/create"
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
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-24">分類</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">問題</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-16">狀態</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-16">點閱數</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-28">管理</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentItems.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-3 py-2 text-center text-sm">
                                        {index + 1}.
                                    </td>
                                    <td className="px-3 py-2 text-center text-sm">
                                        {item.sort_order}
                                    </td>
                                    <td className="px-3 py-2 text-center text-sm">{item.category || '-'}</td>
                                    <td className="px-3 py-2">
                                        <Link
                                            href={`/admin/faq/${item.id}/edit`}
                                            className="text-blue-600 hover:underline text-sm"
                                        >
                                            {item.question}
                                        </Link>
                                    </td>
                                    <td className="px-3 py-2 text-center text-sm">
                                        <span className={`px-2 py-1 rounded text-xs ${item.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {item.status ? '顯示' : '隱藏'}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2 text-center text-sm">
                                        <span className="font-bold">{item.views}</span>
                                    </td>
                                    <td className="px-3 py-2">
                                        <div className="flex flex-col items-center gap-1 text-sm">
                                            <Link
                                                href={`/admin/faq/${item.id}/edit`}
                                                className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                            >
                                                <FaEdit size={14} /> 編輯
                                            </Link>
                                            <div className="border-t border-dashed border-gray-300 w-full"></div>
                                            <button
                                                onClick={() => {
                                                    if (confirm(`確定要刪除: ${item.question} ？`)) {
                                                        router.delete(`/admin/faq/${item.id}`);
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
                                <td colSpan={7} className="px-3 py-2 text-center text-xs text-gray-500">
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
