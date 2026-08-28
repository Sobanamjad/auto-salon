// resources/js/pages/Admin/journal/Journal.tsx
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { 
    FaSearch, FaTrash, FaNewspaper, FaEdit, FaFileAlt,
    FaChevronLeft, FaChevronRight, FaCalendar, FaUser, 
    FaMoneyBill, FaTag, FaStickyNote, FaEye
} from 'react-icons/fa';

interface JournalItem {
    id: number;
    account_subject: string;
    serial_no: string;
    invoice_no: string;
    invoice_date: string;
    transaction_date: string;
    customer_name: string;
    customer_vat: string;
    amount: number;
    type: 'income' | 'expense';
    summary: string;
    is_invoice_encrypted: boolean;
    invoice_password: string;
    remark: string;
    created_at: string;
}

interface Props {
    data: {
        data: JournalItem[];
        current_page: number;
        last_page: number;
        total: number;
        per_page: number;
    };
    totalBalance: number;
    title?: string;
    accountSubjects: { id: string; name: string }[];
}

export default function Journal({ data, totalBalance, title = '會計日記簿', accountSubjects }: Props) {
    const [searchDateStart, setSearchDateStart] = useState('');
    const [searchDateEnd, setSearchDateEnd] = useState('');
    const [searchCustomer, setSearchCustomer] = useState('');
    const [searchSerial, setSearchSerial] = useState('');
    const [searchInvoice, setSearchInvoice] = useState('');

    const handleDelete = (id: number, serial: string) => {
        if (confirm(`確定要刪除: ${serial} 嗎？`)) {
            router.delete(`/admin/journal/${id}`);
        }
    };

    const handleSearch = () => {
        router.get('/admin/journal', {
            sel_start: searchDateStart,
            sel_stop: searchDateEnd,
            sel_title: searchCustomer,
            sel_serial: searchSerial,
            sel_invoice: searchInvoice,
            this_page: 1
        });
    };

    const handlePageChange = (page: number) => {
        router.get('/admin/journal', {
            sel_start: searchDateStart,
            sel_stop: searchDateEnd,
            sel_title: searchCustomer,
            sel_serial: searchSerial,
            sel_invoice: searchInvoice,
            this_page: page
        });
    };

    return (
        <>
            <Head title={title} />
            
            <div className="bg-white rounded-xl shadow-sm p-6 text-gray-900">
                {/* Header */}
                <div className="border-b border-gray-200 pb-4 mb-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <FaNewspaper className="text-blue-500" /> {title}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">僅顯示最近6個月資料，其餘請用查詢</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-sm text-gray-600">
                                總盈餘：<span className={`font-bold text-lg ${totalBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    ${totalBalance.toLocaleString()}
                                </span>
                            </div>
                            <Link
                                href="/admin/journal/report"
                                className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                            >
                                <FaFileAlt /> 報表
                            </Link>
                        </div>
                    </div>
                    <div className="text-sm text-gray-600 mt-2">總筆數：{data.total} 筆</div>
                </div>

                {/* Tools Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Date Range */}
                        <div className="flex items-center gap-2">
                            <input
                                type="date"
                                value={searchDateStart}
                                onChange={(e) => setSearchDateStart(e.target.value)}
                                className="border rounded-lg px-3 py-2 text-sm w-40 focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="text-gray-400">~</span>
                            <input
                                type="date"
                                value={searchDateEnd}
                                onChange={(e) => setSearchDateEnd(e.target.value)}
                                className="border rounded-lg px-3 py-2 text-sm w-40 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Customer */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="客戶..."
                                value={searchCustomer}
                                onChange={(e) => setSearchCustomer(e.target.value)}
                                className="border rounded-lg px-3 py-2 pl-9 text-sm w-32 focus:ring-2 focus:ring-blue-500"
                            />
                            <FaUser className="absolute left-3 top-3 text-gray-400" size={14} />
                        </div>

                        {/* Serial No */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="序號..."
                                value={searchSerial}
                                onChange={(e) => setSearchSerial(e.target.value)}
                                className="border rounded-lg px-3 py-2 pl-9 text-sm w-32 focus:ring-2 focus:ring-blue-500"
                            />
                            <FaTag className="absolute left-3 top-3 text-gray-400" size={14} />
                        </div>

                        {/* Invoice No */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="發票號碼..."
                                value={searchInvoice}
                                onChange={(e) => setSearchInvoice(e.target.value)}
                                className="border rounded-lg px-3 py-2 pl-9 text-sm w-32 focus:ring-2 focus:ring-blue-500"
                            />
                            <FaFileAlt className="absolute left-3 top-3 text-gray-400" size={14} />
                        </div>

                        <button
                            onClick={handleSearch}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                        >
                            查詢
                        </button>

                        <button
                            onClick={() => {
                                setSearchDateStart('');
                                setSearchDateEnd('');
                                setSearchCustomer('');
                                setSearchSerial('');
                                setSearchInvoice('');
                                router.get('/admin/journal', { this_page: 1 });
                            }}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-400"
                        >
                            全部
                        </button>
                    </div>

                    <Link
                        href="/admin/journal/create"
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm"
                    >
                        <FaEdit /> 新增資料
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-10">No.</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-32">序號 / 訂單編號</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-24">會計科目</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-24">發票日/號碼</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-24">交易日</th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-24">客戶</th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">摘要</th>
                                <th className="px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase w-20">收入</th>
                                <th className="px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase w-20">支出</th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-24">備註</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-20">填寫/異動</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-20">管理</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.data.length === 0 ? (
                                <tr>
                                    <td colSpan={12} className="px-3 py-8 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <FaNewspaper size={32} className="text-gray-300" />
                                            <p>暫無日記簿資料</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                data.data.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-2 py-2 text-center text-sm">
                                            {(data.current_page - 1) * data.per_page + index + 1}.
                                        </td>
                                        <td className="px-2 py-2 text-center text-sm font-medium">
                                            {item.serial_no}
                                        </td>
                                        <td className="px-2 py-2 text-center text-sm">
                                            {item.account_subject || '-'}
                                        </td>
                                        <td className="px-2 py-2 text-center text-sm">
                                            <div>{item.invoice_no || '-'}</div>
                                            <div className="text-xs text-gray-400">{item.invoice_date || ''}</div>
                                        </td>
                                        <td className="px-2 py-2 text-center text-sm">
                                            {item.transaction_date}
                                        </td>
                                        <td className="px-2 py-2 text-sm">
                                            <div>{item.customer_name || '-'}</div>
                                            {item.customer_vat && (
                                                <div className="text-xs text-gray-400">統編: {item.customer_vat}</div>
                                            )}
                                        </td>
                                        <td className="px-2 py-2 text-sm">
                                            {item.summary || '-'}
                                        </td>
                                        <td className="px-2 py-2 text-right text-sm font-medium text-green-600">
                                            {item.type === 'income' ? `$${item.amount.toLocaleString()}` : '-'}
                                        </td>
                                        <td className="px-2 py-2 text-right text-sm font-medium text-red-600">
                                            {item.type === 'expense' ? `$${item.amount.toLocaleString()}` : '-'}
                                        </td>
                                        <td className="px-2 py-2 text-sm text-gray-500 max-w-24 truncate">
                                            {item.remark || '-'}
                                        </td>
                                        <td className="px-2 py-2 text-center text-xs text-gray-400">
                                            <div>{item.created_at ? new Date(item.created_at).toLocaleDateString() : '-'}</div>
                                        </td>
                                        <td className="px-2 py-2">
                                            <div className="flex flex-col items-center gap-0.5 text-xs">
                                                <Link
                                                    href={`/admin/journal/${item.id}/edit`}
                                                    className="text-blue-600 hover:text-blue-800 flex items-center gap-0.5"
                                                >
                                                    <FaEdit size={12} /> 編輯
                                                </Link>
                                                <div className="border-t border-dashed border-gray-300 w-full"></div>
                                                <button
                                                    onClick={() => handleDelete(item.id, item.serial_no)}
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
                                <td colSpan={12} className="px-3 py-2 text-center text-xs text-gray-500">
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