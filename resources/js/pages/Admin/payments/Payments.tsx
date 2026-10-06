import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    FaPlus, FaEdit, FaTrash, FaMoneyBillWave,
    FaChevronLeft, FaChevronRight, FaCheck,
    FaSearch, FaFileAlt
} from 'react-icons/fa';

interface PaymentItem {
    id: number;
    member_id: number;
    member_no: string;
    member_name: string;
    period: string;
    amount: number;
    paid_amount: number;
    due_date: string | null;
    paid_date: string | null;
    payment_method: string | null;
    receipt_no: string | null;
    status: 'unpaid' | 'paid' | 'overdue' | 'exempted';
    remark: string | null;
}

interface StatusInfo {
    label: string;
    color: string;
}

interface Stats {
    total: number;
    paid: number;
    unpaid: number;
    overdue: number;
    total_amount: number;
    paid_amount: number;
}

interface Props {
    title?: string;
    data: {
        data: PaymentItem[];
        current_page: number;
        last_page: number;
        total: number;
        per_page: number;
    };
    stats: Stats;
    periods: string[];
    statuses: Record<string, StatusInfo>;
    methods: string[];
    filters: { period?: string; status?: string; search?: string };
}

export default function Payments({
    title = '繳費作業',
    data,
    stats,
    periods = [],
    statuses = {},
    filters = {},
}: Props) {
    const [search, setSearch]   = useState(filters.search  ?? '');
    const [period, setPeriod]   = useState(filters.period  ?? '');
    const [status, setStatus]   = useState(filters.status  ?? '');
    const [showBatch, setShowBatch] = useState(false);
    const [batchPeriod, setBatchPeriod] = useState(new Date().getFullYear().toString());
    const [batchAmount, setBatchAmount] = useState('');
    const [batchDue, setBatchDue]       = useState('');

    const handleSearch = () => {
        router.get('/admin/payments', { sel_title: search, sel_period: period, sel_status: status, this_page: 1 });
    };

    const handleReset = () => {
        setSearch(''); setPeriod(''); setStatus('');
        router.get('/admin/payments', { this_page: 1 });
    };

    const handlePageChange = (page: number) => {
        router.get('/admin/payments', { sel_title: search, sel_period: period, sel_status: status, this_page: page });
    };

    const handleDelete = (id: number, name: string) => {
        if (confirm(`確定要刪除 ${name} 的繳費記錄嗎？`)) {
            router.delete(`/admin/payments/${id}`);
        }
    };

    const handleMarkPaid = (id: number, name: string) => {
        if (confirm(`確定標記 ${name} 為已繳費？`)) {
            router.get(`/admin/payments/${id}/mark-paid`);
        }
    };

    const handleBatchCreate = (e: React.FormEvent) => {
        e.preventDefault();

        if (confirm(`確定為所有啟用會員建立 ${batchPeriod} 期繳費記錄？`)) {
            router.post('/admin/payments/batch-create', {
                period: batchPeriod,
                amount: batchAmount,
                due_date: batchDue,
            });
        }
    };

    const paidRate = stats.total > 0 ? Math.round((stats.paid / stats.total) * 100) : 0;

    return (
        <>
            <Head title={title} />

            <div className="bg-white rounded-xl shadow-sm p-6 text-gray-900">
                {/* Header */}
                <div className="border-b border-gray-200 pb-4 mb-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <FaMoneyBillWave className="text-green-500" /> {title}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">管理會員繳費記錄</p>
                        </div>
                        <Link href="/admin/payment-reports" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                            <FaFileAlt size={12} /> 查看報表
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
                        <div className="text-xs text-gray-500">總筆數</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-green-600">{stats.paid}</div>
                        <div className="text-xs text-gray-500">已繳費 ({paidRate}%)</div>
                    </div>
                    <div className="bg-red-50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-red-600">{stats.unpaid}</div>
                        <div className="text-xs text-gray-500">未繳費</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-blue-600">
                            ${Number(stats.paid_amount).toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">已收金額</div>
                    </div>
                </div>

                {/* Batch Create Panel */}
                <div className="mb-4">
                    <button
                        onClick={() => setShowBatch(!showBatch)}
                        className="text-sm text-purple-600 hover:underline flex items-center gap-1"
                    >
                        ⚡ 批次建立繳費記錄
                    </button>
                    {showBatch && (
                        <form onSubmit={handleBatchCreate} className="mt-2 p-4 bg-purple-50 rounded-lg border border-purple-200 flex flex-wrap gap-3 items-end">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">期別 *</label>
                                <input type="text" value={batchPeriod} onChange={(e) => setBatchPeriod(e.target.value)}
                                    className="border rounded px-2 py-1 text-sm w-24" placeholder="2026" required />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">金額 *</label>
                                <input type="number" value={batchAmount} onChange={(e) => setBatchAmount(e.target.value)}
                                    className="border rounded px-2 py-1 text-sm w-28" placeholder="1000" required />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">截止日</label>
                                <input type="date" value={batchDue} onChange={(e) => setBatchDue(e.target.value)}
                                    className="border rounded px-2 py-1 text-sm" />
                            </div>
                            <button type="submit" className="bg-purple-600 text-white px-4 py-1.5 rounded text-sm hover:bg-purple-700">
                                批次建立
                            </button>
                            <p className="text-xs text-gray-500 w-full">* 只為目前無記錄的啟用會員建立，不重複建立</p>
                        </form>
                    )}
                </div>

                {/* Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Period */}
                        <select value={period} onChange={(e) => setPeriod(e.target.value)}
                            className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
                            <option value="">全部期別</option>
                            {periods.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>

                        {/* Status */}
                        <select value={status} onChange={(e) => setStatus(e.target.value)}
                            className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
                            <option value="">全部狀態</option>
                            {Object.entries(statuses).map(([key, val]) => (
                                <option key={key} value={key}>{val.label}</option>
                            ))}
                        </select>

                        {/* Search */}
                        <div className="relative">
                            <input type="text" placeholder="姓名/會員編號..."
                                value={search} onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                className="border rounded-lg px-3 py-2 pl-9 text-sm w-40 focus:ring-2 focus:ring-blue-500" />
                            <FaSearch className="absolute left-3 top-3 text-gray-400" size={13} />
                        </div>

                        <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">查詢</button>
                        <button onClick={handleReset} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-400">全部</button>
                    </div>

                    <Link href="/admin/payments/create"
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm">
                        <FaPlus /> 新增記錄
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-10">No.</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-16">狀態</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-16">期別</th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">會員</th>
                                <th className="px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase w-20">應繳</th>
                                <th className="px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase w-20">實繳</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-28">截止/繳費日</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-20">方式</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-24">收據號碼</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-24">管理</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.data.length === 0 ? (
                                <tr>
                                    <td colSpan={10} className="px-3 py-8 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <FaMoneyBillWave size={32} className="text-gray-300" />
                                            <p>暫無繳費記錄</p>
                                            <p className="text-xs text-gray-400">可使用「批次建立」功能一次為所有會員建立記錄</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                data.data.map((item, index) => {
                                    const statusInfo = statuses[item.status] ?? { label: item.status, color: 'bg-gray-100 text-gray-600' };

                                    return (
                                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-2 py-2 text-center text-sm">
                                                {(data.current_page - 1) * data.per_page + index + 1}.
                                            </td>
                                            <td className="px-2 py-2 text-center">
                                                <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusInfo.color}`}>
                                                    {statusInfo.label}
                                                </span>
                                            </td>
                                            <td className="px-2 py-2 text-center text-sm font-medium">{item.period}</td>
                                            <td className="px-2 py-2 text-sm">
                                                <div className="font-medium">{item.member_name}</div>
                                                {item.member_no && <div className="text-xs text-gray-400">{item.member_no}</div>}
                                            </td>
                                            <td className="px-2 py-2 text-right text-sm">
                                                ${Number(item.amount).toLocaleString()}
                                            </td>
                                            <td className="px-2 py-2 text-right text-sm font-medium text-green-600">
                                                {item.paid_amount > 0 ? `$${Number(item.paid_amount).toLocaleString()}` : '-'}
                                            </td>
                                            <td className="px-2 py-2 text-center text-xs">
                                                <div className="text-gray-500">{item.due_date ?? '-'}</div>
                                                {item.paid_date && <div className="text-green-600 font-medium">{item.paid_date}</div>}
                                            </td>
                                            <td className="px-2 py-2 text-center text-xs">{item.payment_method ?? '-'}</td>
                                            <td className="px-2 py-2 text-center text-xs">{item.receipt_no ?? '-'}</td>
                                            <td className="px-2 py-2">
                                                <div className="flex flex-col items-center gap-0.5 text-xs">
                                                    {item.status === 'unpaid' && (
                                                        <>
                                                            <button onClick={() => handleMarkPaid(item.id, item.member_name)}
                                                                className="text-green-600 hover:text-green-800 flex items-center gap-0.5">
                                                                <FaCheck size={11} /> 標記繳費
                                                            </button>
                                                            <div className="border-t border-dashed border-gray-300 w-full" />
                                                        </>
                                                    )}
                                                    <Link href={`/admin/payments/${item.id}/edit`}
                                                        className="text-blue-600 hover:text-blue-800 flex items-center gap-0.5">
                                                        <FaEdit size={11} /> 編輯
                                                    </Link>
                                                    <div className="border-t border-dashed border-gray-300 w-full" />
                                                    <button onClick={() => handleDelete(item.id, item.member_name)}
                                                        className="text-red-600 hover:text-red-800 flex items-center gap-0.5">
                                                        <FaTrash size={11} /> 刪除
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                        <tfoot className="bg-gray-50">
                            <tr>
                                <td colSpan={10} className="px-3 py-2 text-center text-xs text-gray-500">
                                    {data.total > 0 ? `共 ${data.total} 筆 - 第 ${data.current_page} / ${data.last_page} 頁` : '沒有資料'}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Pagination */}
                {data.last_page > 1 && (
                    <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-gray-600">共 {data.total} 筆 - 第 {data.current_page} / {data.last_page} 頁</div>
                        <div className="flex gap-2">
                            <button onClick={() => handlePageChange(1)} disabled={data.current_page === 1} className="px-3 py-1 border rounded text-sm hover:bg-gray-50 disabled:opacity-50">首頁</button>
                            <button onClick={() => handlePageChange(data.current_page - 1)} disabled={data.current_page === 1} className="px-3 py-1 border rounded text-sm hover:bg-gray-50 disabled:opacity-50"><FaChevronLeft size={12} /></button>
                            <span className="px-3 py-1 border rounded text-sm bg-blue-600 text-white">{data.current_page}</span>
                            <button onClick={() => handlePageChange(data.current_page + 1)} disabled={data.current_page === data.last_page} className="px-3 py-1 border rounded text-sm hover:bg-gray-50 disabled:opacity-50"><FaChevronRight size={12} /></button>
                            <button onClick={() => handlePageChange(data.last_page)} disabled={data.current_page === data.last_page} className="px-3 py-1 border rounded text-sm hover:bg-gray-50 disabled:opacity-50">末頁</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
