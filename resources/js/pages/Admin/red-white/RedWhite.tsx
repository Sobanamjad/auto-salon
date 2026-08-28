// resources/js/pages/Admin/red-white/RedWhite.tsx
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { 
    FaSearch, FaTrash, FaNewspaper, FaCheck, FaTimes,
    FaChevronLeft, FaChevronRight, FaSort, FaUser, FaCalendar,
    FaTag, FaMoneyBill, FaStickyNote
} from 'react-icons/fa';

interface RedWhiteItem {
    id: number;
    category: string;
    person_name: string;
    event_date_start: string;
    event_date_end: string;
    attend_status: string;
    attendees: string;
    amount: number;
    remark: string;
    is_closed: boolean;
    sort_order: number;
    created_at: string;
}

interface Props {
    data: {
        data: RedWhiteItem[];
        current_page: number;
        last_page: number;
        total: number;
        per_page: number;
    };
    title?: string;
}

export default function RedWhite({ data, title = '紅白帖' }: Props) {
    const [searchName, setSearchName] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const [searchCategory, setSearchCategory] = useState('');

    const handleDelete = (id: number, name: string) => {
        if (confirm(`確定要刪除: ${name} 的紅白帖嗎？`)) {
            router.delete(`/admin/red-white/${id}`);
        }
    };

    const handleToggleClose = (id: number) => {
        router.get(`/admin/red-white/${id}/toggle-close`);
    };

    const handleSearch = () => {
        router.get('/admin/red-white', {
            sel_title: searchName,
            sel_issuedate: searchDate,
            sel_csn: searchCategory,
            this_page: 1
        });
    };

    const handlePageChange = (page: number) => {
        router.get('/admin/red-white', {
            sel_title: searchName,
            sel_issuedate: searchDate,
            sel_csn: searchCategory,
            this_page: page
        });
    };

    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            '喜事': 'bg-red-100 text-red-800',
            '喪事': 'bg-gray-100 text-gray-800',
            '會員開幕': 'bg-green-100 text-green-800',
        };
        return colors[category] || 'bg-blue-100 text-blue-800';
    };

    const getCategoryIcon = (category: string) => {
        const icons: Record<string, string> = {
            '喜事': '🎉',
            '喪事': '🕊️',
            '會員開幕': '🏪',
        };
        return icons[category] || '📋';
    };

    return (
        <>
            <Head title={title} />
            
            <div className="bg-white rounded-xl shadow-sm p-6 text-gray-900">
                {/* Header */}
                <div className="border-b border-gray-200 pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FaNewspaper className="text-pink-500" /> {title}
                        <span className="text-sm font-normal text-gray-500 ml-2">
                            [ 過期 5 天自動隱藏 ]
                        </span>
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">管理紅白帖資料</p>
                    <div className="text-sm text-gray-600 mt-2">總筆數：{data.total} 筆</div>
                </div>

                {/* Tools Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Search by Name */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="姓名..."
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                                className="border rounded-lg px-3 py-2 pl-9 text-sm w-40 focus:ring-2 focus:ring-blue-500"
                            />
                            <FaUser className="absolute left-3 top-3 text-gray-400" size={14} />
                        </div>

                        {/* Search by Date */}
                        <div className="relative">
                            <input
                                type="date"
                                value={searchDate}
                                onChange={(e) => setSearchDate(e.target.value)}
                                className="border rounded-lg px-3 py-2 pl-9 text-sm w-40 focus:ring-2 focus:ring-blue-500"
                            />
                            <FaCalendar className="absolute left-3 top-3 text-gray-400" size={14} />
                        </div>

                        {/* Search by Category */}
                        <div className="relative">
                            <select
                                value={searchCategory}
                                onChange={(e) => setSearchCategory(e.target.value)}
                                className="border rounded-lg px-3 py-2 pl-9 text-sm w-40 focus:ring-2 focus:ring-blue-500 appearance-none"
                            >
                                <option value="">全部分類</option>
                                <option value="喜事">喜事</option>
                                <option value="喪事">喪事</option>
                                <option value="會員開幕">會員開幕</option>
                            </select>
                            <FaTag className="absolute left-3 top-3 text-gray-400" size={14} />
                        </div>

                        <button
                            onClick={handleSearch}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                        >
                            查詢
                        </button>

                        <button
                            onClick={() => {
                                setSearchName('');
                                setSearchDate('');
                                setSearchCategory('');
                                router.get('/admin/red-white', { this_page: 1 });
                            }}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-400"
                        >
                            全部
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-10">No.</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-16">排序</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-24">分類</th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">當事者</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-32">活動日</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-20">出席</th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-28">出席人員</th>
                                <th className="px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase w-20">款項</th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-24">備註</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-16">結案</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-20">管理</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.data.length === 0 ? (
                                <tr>
                                    <td colSpan={11} className="px-3 py-8 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <FaNewspaper size={32} className="text-gray-300" />
                                            <p>暫無紅白帖資料</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                data.data.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-2 py-2 text-center text-sm">
                                            {(data.current_page - 1) * data.per_page + index + 1}.
                                        </td>
                                        <td className="px-2 py-2 text-center text-sm">
                                            <input
                                                type="number"
                                                value={item.sort_order}
                                                onChange={(e) => {
                                                    router.put(`/admin/red-white/${item.id}/sort`, {
                                                        sort_order: parseInt(e.target.value) || 0
                                                    });
                                                }}
                                                className="w-12 text-center border rounded px-1 py-0.5 text-sm"
                                            />
                                        </td>
                                        <td className="px-2 py-2 text-center">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(item.category)}`}>
                                                {getCategoryIcon(item.category)} {item.category || '-'}
                                            </span>
                                        </td>
                                        <td className="px-2 py-2 text-sm font-medium">
                                            {item.person_name}
                                        </td>
                                        <td className="px-2 py-2 text-center text-sm">
                                            {item.event_date_start && (
                                                <div className="text-xs">
                                                    <div>{item.event_date_start}</div>
                                                    {item.event_date_end && item.event_date_end !== item.event_date_start && (
                                                        <div className="text-gray-400">→ {item.event_date_end}</div>
                                                    )}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-2 py-2 text-center text-sm">
                                            {item.attend_status || '-'}
                                        </td>
                                        <td className="px-2 py-2 text-sm">
                                            {item.attendees || '-'}
                                        </td>
                                        <td className="px-2 py-2 text-right text-sm font-medium">
                                            {item.amount > 0 ? `$${item.amount.toLocaleString()}` : '-'}
                                        </td>
                                        <td className="px-2 py-2 text-sm text-gray-500 max-w-24 truncate">
                                            {item.remark || '-'}
                                        </td>
                                        <td className="px-2 py-2 text-center">
                                            <button
                                                onClick={() => handleToggleClose(item.id)}
                                                className={`px-2 py-1 rounded text-xs flex items-center justify-center gap-1 ${
                                                    item.is_closed
                                                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                            >
                                                {item.is_closed ? (
                                                    <><FaCheck size={10} /> 已結案</>
                                                ) : (
                                                    <><FaTimes size={10} /> 未結案</>
                                                )}
                                            </button>
                                        </td>
                                        <td className="px-2 py-2">
                                            <div className="flex flex-col items-center gap-0.5 text-xs">
                                                <button
                                                    onClick={() => handleDelete(item.id, item.person_name)}
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
                                <td colSpan={11} className="px-3 py-2 text-center text-xs text-gray-500">
                                    {data.total > 0 ? (
                                        `共 ${data.total} 筆 - 在 ${data.current_page} 頁 - 共 ${data.last_page} 頁`
                                    ) : (
                                        '沒有資料'
                                    )}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Pagination */}
                {data.last_page > 1 && (
                    <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-gray-600">
                            共 {data.total} 筆 - 在 {data.current_page} 頁 - 共 {data.last_page} 頁
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handlePageChange(1)}
                                disabled={data.current_page === 1}
                                className="px-3 py-1 border rounded text-sm hover:bg-gray-50 disabled:opacity-50"
                            >
                                首頁
                            </button>
                            <button
                                onClick={() => handlePageChange(data.current_page - 1)}
                                disabled={data.current_page === 1}
                                className="px-3 py-1 border rounded text-sm hover:bg-gray-50 disabled:opacity-50"
                            >
                                <FaChevronLeft size={12} />
                            </button>
                            <span className="px-3 py-1 border rounded text-sm bg-blue-600 text-white">
                                {data.current_page}
                            </span>
                            <button
                                onClick={() => handlePageChange(data.current_page + 1)}
                                disabled={data.current_page === data.last_page}
                                className="px-3 py-1 border rounded text-sm hover:bg-gray-50 disabled:opacity-50"
                            >
                                <FaChevronRight size={12} />
                            </button>
                            <button
                                onClick={() => handlePageChange(data.last_page)}
                                disabled={data.current_page === data.last_page}
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