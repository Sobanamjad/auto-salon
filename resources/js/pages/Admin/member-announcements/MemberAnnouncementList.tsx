// recources/js/pages/Admin/member-announcements/MemberAnnouncementList.tsx
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { 
    FaSearch, FaPlus, FaEdit, FaTrash, FaEye, 
    FaImage, FaPaperclip, FaSort, FaUser,
    FaChevronLeft, FaChevronRight, FaBullhorn
} from 'react-icons/fa';

interface Announcement {
    id: number;
    subject: string;
    language: string;
    views: number;
    sort_order: number;
    has_attachment: boolean;
    has_photo: boolean;
    published_date: string;
    end_date: string;
    created_at: string;
    updated_at: string;
    target_audience: string;
    status: boolean;
}

interface Props {
    announcements: Announcement[];
    title?: string;
}

export default function MemberAnnouncementList({ announcements = [], title = '會員公告' }: Props) {
    const [searchSubject, setSearchSubject] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Filter announcements by subject
    const filteredItems = announcements.filter(item =>
        item.subject.toLowerCase().includes(searchSubject.toLowerCase())
    );

    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <>
            <Head title={title} />
            
            <div className="bg-white rounded-xl shadow-sm p-6 text-gray-900">
                {/* Header */}
                <div className="border-b border-gray-200 pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FaBullhorn className="text-blue-500" /> {title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">管理所有會員公告 (僅會員可看)</p>
                </div>

                {/* Tools Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Search */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="主題..."
                                value={searchSubject}
                                onChange={(e) => setSearchSubject(e.target.value)}
                                className="border rounded-lg px-3 py-2 pl-9 text-sm w-48 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <FaSearch className="absolute left-3 top-3 text-gray-400" size={14} />
                        </div>
                        <button 
                            onClick={() => setSearchSubject('')}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                        >
                            查詢
                        </button>
                    </div>

                    {/* Add New Button */}
                    <Link
                        href="/admin/member-announcements/create"
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
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-24">可閱讀者</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">主題</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-20">附件</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-20">相片</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-16">點閱數</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-32">發佈/截止</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-28">管理</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentItems.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="px-3 py-8 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <FaBullhorn size={32} className="text-gray-300" />
                                            <p>暫無會員公告資料</p>
                                            <Link
                                                href="/admin/member-announcements/create"
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
                                        <td className="px-3 py-2 text-center text-sm">
                                            {(currentPage - 1) * itemsPerPage + index + 1}.
                                        </td>
                                        <td className="px-3 py-2">
                                            <div className="text-center text-xs text-gray-500">{item.language || '繁中'}</div>
                                            <div className="border-t border-dashed border-gray-300 my-1"></div>
                                            <div className="flex items-center justify-center gap-1">
                                                <input
                                                    type="number"
                                                    defaultValue={item.sort_order || 999}
                                                    className="w-12 border rounded px-1 py-0.5 text-xs text-center"
                                                />
                                                <button className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs hover:bg-blue-600">
                                                    修改
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-3 py-2 text-center">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                <FaUser className="mr-1" size={10} /> {item.target_audience || '會員'}
                                            </span>
                                        </td>
                                        <td className="px-3 py-2">
                                            <Link
                                                href={`/admin/member-announcements/${item.id}/edit`}
                                                className="text-blue-600 hover:underline text-sm"
                                            >
                                                {item.subject}
                                            </Link>
                                        </td>
                                        <td className="px-3 py-2 text-center">
                                            {item.has_attachment ? (
                                                <FaPaperclip className="text-blue-500 mx-auto" title="有附件" />
                                            ) : (
                                                <span className="text-gray-300 text-xs">無</span>
                                            )}
                                        </td>
                                        <td className="px-3 py-2 text-center">
                                            {item.has_photo ? (
                                                <FaImage className="text-green-500 mx-auto" title="有相片" />
                                            ) : (
                                                <span className="text-gray-300 text-xs">無</span>
                                            )}
                                        </td>
                                        <td className="px-3 py-2 text-center">
                                            <span className="font-bold">{item.views || 0}</span>
                                            <button
                                                onClick={() => {
                                                    if (confirm(`確定要清除: ${item.subject} 點閱人紀錄嗎？`)) {
                                                        // API call to reset views
                                                    }
                                                }}
                                                className="text-red-500 hover:text-red-700 text-xs block"
                                            >
                                                清除
                                            </button>
                                        </td>
                                        <td className="px-3 py-2 text-center text-sm">
                                            {item.published_date || item.created_at?.split('T')[0] || '-'}
                                            <div className="border-t border-dashed border-gray-300 my-1"></div>
                                            {item.end_date || '2200-12-31'}
                                        </td>
                                        <td className="px-3 py-2">
                                            <div className="flex flex-col items-center gap-1 text-sm">
                                                <Link
                                                    href={`/admin/member-announcements/${item.id}/edit`}
                                                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                                >
                                                    <FaEdit size={14} /> 編輯
                                                </Link>
                                                <div className="border-t border-dashed border-gray-300 w-full"></div>
                                                <Link
                                                    href={`/admin/member-announcements/${item.id}/preview`}
                                                    target="_blank"
                                                    className="text-green-600 hover:text-green-800 flex items-center gap-1"
                                                >
                                                    <FaEye size={14} /> 預覽
                                                </Link>
                                                <div className="border-t border-dashed border-gray-300 w-full"></div>
                                                <button
                                                    onClick={() => {
                                                        if (confirm(`確定要刪除: ${item.subject} 嗎？`)) {
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
                                ))
                            )}
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