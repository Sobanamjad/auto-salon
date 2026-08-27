import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { 
    FaSearch, FaPlus, FaEdit, FaTrash, FaEye, 
    FaImage, FaSort, FaChevronLeft, FaChevronRight, 
    FaComments, FaUser, FaEnvelope, FaPhone, FaMobile,
    FaBuilding, FaGlobe, FaCalendar, FaCheck, FaTimes
} from 'react-icons/fa';

interface Guestbook {
    id: number;
    question: string;
    language: string;
    views: number;
    sort_order: number;
    has_photo: boolean;
    status: boolean;
    published_date: string;
    end_date: string;
    created_at: string;
    updated_at: string;
    category: string;
    asker_name: string;
    asker_email: string;
    asker_phone: string;
    asker_mobile: string;
    asker_company: string;
    asker_country: string;
    question_date: string;
    answer_date: string;
    brief: string;
    answer: string;
}

interface Props {
    guestbooks: Guestbook[];
    title?: string;
}

export default function Guestbook({ guestbooks = [], title = '留言板' }: Props) {
    const [searchQuestion, setSearchQuestion] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredItems = guestbooks.filter(item =>
        item.question.toLowerCase().includes(searchQuestion.toLowerCase()) ||
        item.asker_name?.toLowerCase().includes(searchQuestion.toLowerCase())
    );

    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleDelete = (id: number, question: string) => {
        if (confirm(`確定要刪除: ${question} 嗎？`)) {
            router.delete(`/admin/guestbook/${id}`);
        }
    };

    const handleToggleStatus = (id: number) => {
        router.get(`/admin/guestbook/${id}/toggle-status`);
    };

    const handleResetViews = (id: number, question: string) => {
        if (confirm(`確定要清除: ${question} 點閱人紀錄嗎？`)) {
            router.get(`/admin/guestbook/${id}/reset-views`);
        }
    };

    const handleSortUpdate = (id: number, sortOrder: number) => {
        router.put(`/admin/guestbook/${id}/sort`, { sort_order: sortOrder });
    };

    return (
        <>
            <Head title={title} />
            
            <div className="bg-white rounded-xl shadow-sm p-6">
                {/* Header */}
                <div className="border-b border-gray-200 pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FaComments className="text-blue-500" /> {title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">管理所有留言</p>
                    <div className="text-sm text-gray-600 mt-2">總留言：{guestbooks.length} 筆</div>
                </div>

                {/* Tools Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="問題/姓名..."
                                value={searchQuestion}
                                onChange={(e) => setSearchQuestion(e.target.value)}
                                className="border rounded-lg px-3 py-2 pl-9 text-sm w-48 focus:ring-2 focus:ring-blue-500"
                            />
                            <FaSearch className="absolute left-3 top-3 text-gray-400" size={14} />
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                            查詢
                        </button>
                    </div>

                    <Link
                        href="/admin/guestbook/create"
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
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-8">No</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-16">狀態</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-28">排序</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-24">發佈者</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-24">分類</th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">問題</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-16">相片</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-16">點閱數</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-32">發佈/截止</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-28">管理</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentItems.length === 0 ? (
                                <tr>
                                    <td colSpan={10} className="px-3 py-8 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <FaComments size={32} className="text-gray-300" />
                                            <p>暫無留言資料</p>
                                            <Link
                                                href="/admin/guestbook/create"
                                                className="text-blue-600 hover:underline text-sm"
                                            >
                                                點此新增
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                currentItems.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-2 py-2 text-center text-sm">
                                            {(currentPage - 1) * itemsPerPage + index + 1}.
                                        </td>
                                        <td className="px-2 py-2 text-center">
                                            <button onClick={() => handleToggleStatus(item.id)}>
                                                {item.status ? (
                                                    <FaCheck className="text-green-500 mx-auto" title="已發佈" />
                                                ) : (
                                                    <FaTimes className="text-red-500 mx-auto" title="未發佈" />
                                                )}
                                            </button>
                                        </td>
                                        <td className="px-2 py-2">
                                            <div className="text-center text-xs text-gray-500">{item.language || '繁中'}</div>
                                            <div className="border-t border-dashed border-gray-300 my-1"></div>
                                            <div className="flex items-center justify-center gap-1">
                                                <input
                                                    type="number"
                                                    defaultValue={item.sort_order || 999}
                                                    className="w-12 border rounded px-1 py-0.5 text-xs text-center"
                                                    id={`sort_${item.id}`}
                                                />
                                                <button 
                                                    onClick={() => {
                                                        const input = document.getElementById(`sort_${item.id}`) as HTMLInputElement;
                                                        handleSortUpdate(item.id, parseInt(input.value) || 999);
                                                    }}
                                                    className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs hover:bg-blue-600"
                                                >
                                                    更新
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-2 py-2 text-center text-xs">社團達人</td>
                                        <td className="px-2 py-2 text-center text-sm">{item.category || '-'}</td>
                                        <td className="px-2 py-2">
                                            <Link
                                                href={`/admin/guestbook/${item.id}/edit`}
                                                className="text-blue-600 hover:underline text-sm"
                                            >
                                                <div className="font-medium">{item.question}</div>
                                                {item.asker_name && (
                                                    <div className="text-xs text-gray-500">
                                                        <FaUser className="inline mr-1" size={10} />
                                                        {item.asker_name}
                                                        {item.asker_company && ` (${item.asker_company})`}
                                                    </div>
                                                )}
                                            </Link>
                                        </td>
                                        <td className="px-2 py-2 text-center">
                                            {item.has_photo ? (
                                                <FaImage className="text-green-500 mx-auto" title="有相片" />
                                            ) : (
                                                <span className="text-gray-300 text-xs">無</span>
                                            )}
                                        </td>
                                        <td className="px-2 py-2 text-center">
                                            <span className="font-bold">{item.views || 0}</span>
                                            <button
                                                onClick={() => handleResetViews(item.id, item.question)}
                                                className="text-red-500 hover:text-red-700 text-xs block"
                                            >
                                                清除
                                            </button>
                                        </td>
                                        <td className="px-2 py-2 text-center text-sm">
                                            {item.published_date || item.created_at?.split('T')[0] || '-'}
                                            <div className="border-t border-dashed border-gray-300 my-1"></div>
                                            {item.end_date || '2200-12-31'}
                                        </td>
                                        <td className="px-2 py-2">
                                            <div className="flex flex-col items-center gap-0.5 text-xs">
                                                <Link
                                                    href={`/admin/guestbook/${item.id}/edit`}
                                                    className="text-blue-600 hover:text-blue-800 flex items-center gap-0.5"
                                                >
                                                    <FaEdit size={12} /> 編輯
                                                </Link>
                                                <div className="border-t border-dashed border-gray-300 w-full"></div>
                                                <button
                                                    onClick={() => handleDelete(item.id, item.question)}
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
                                <td colSpan={10} className="px-3 py-2 text-center text-xs text-gray-500">
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