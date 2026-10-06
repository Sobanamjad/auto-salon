import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { FaFileAlt, FaChartBar, FaMoneyBillWave, FaUsers } from 'react-icons/fa';

interface PaymentItem {
    id: number;
    member_name: string;
    member_no: string;
    period: string;
    amount: number;
    paid_amount: number;
    due_date: string | null;
    paid_date: string | null;
    payment_method: string | null;
    status: string;
}

interface SummaryItem {
    label: string;
    color: string;
    count: number;
    amount: number;
    paid_amount: number;
}

interface Props {
    title?: string;
    period: string;
    allPeriods: string[];
    payments: PaymentItem[];
    summary: Record<string, SummaryItem>;
    monthly: Record<string, { count: number; amount: number }>;
    statuses: Record<string, { label: string; color: string }>;
}

export default function PaymentReports({
    title = '報表統計',
    period,
    allPeriods = [],
    payments = [],
    summary = {},
    monthly = {},
    statuses = {},
}: Props) {
    const [selPeriod, setSelPeriod] = useState(period);

    const handlePeriodChange = (p: string) => {
        setSelPeriod(p);
        router.get('/admin/payment-reports', { sel_period: p });
    };

    const totalAmount     = payments.reduce((s, p) => s + Number(p.amount), 0);
    const totalPaidAmount = payments.reduce((s, p) => s + Number(p.paid_amount), 0);
    const paidCount       = payments.filter(p => p.status === 'paid').length;
    const paidRate        = payments.length > 0 ? Math.round((paidCount / payments.length) * 100) : 0;

    return (
        <>
            <Head title={title} />

            <div className="bg-white rounded-xl shadow-sm p-6 text-gray-900">
                {/* Header */}
                <div className="border-b border-gray-200 pb-4 mb-6 flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <FaChartBar className="text-blue-500" /> {title}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">繳費統計分析</p>
                    </div>
                    <a href="/admin/payments" className="text-sm text-blue-600 hover:underline">← 返回繳費作業</a>
                </div>

                {/* Period Selector */}
                <div className="flex items-center gap-3 mb-6">
                    <label className="text-sm font-medium text-gray-700">期別：</label>
                    <div className="flex gap-2 flex-wrap">
                        {allPeriods.map(p => (
                            <button key={p} onClick={() => handlePeriodChange(p)}
                                className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition ${
                                    selPeriod === p
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                                }`}>
                                {p}
                            </button>
                        ))}
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-blue-50 rounded-xl p-4 text-center">
                        <FaUsers className="mx-auto text-blue-400 mb-1" size={24} />
                        <div className="text-3xl font-bold text-blue-600">{payments.length}</div>
                        <div className="text-xs text-gray-500 mt-1">總筆數</div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4 text-center">
                        <FaMoneyBillWave className="mx-auto text-green-400 mb-1" size={24} />
                        <div className="text-3xl font-bold text-green-600">{paidCount}</div>
                        <div className="text-xs text-gray-500 mt-1">已繳費 ({paidRate}%)</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <FaFileAlt className="mx-auto text-gray-400 mb-1" size={24} />
                        <div className="text-2xl font-bold text-gray-700">${Number(totalAmount).toLocaleString()}</div>
                        <div className="text-xs text-gray-500 mt-1">應收總金額</div>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-4 text-center">
                        <FaMoneyBillWave className="mx-auto text-emerald-400 mb-1" size={24} />
                        <div className="text-2xl font-bold text-emerald-600">${Number(totalPaidAmount).toLocaleString()}</div>
                        <div className="text-xs text-gray-500 mt-1">實收總金額</div>
                    </div>
                </div>

                {/* Status Summary */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <FaChartBar className="text-blue-400" /> 狀態分析
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {Object.entries(summary).map(([key, val]) => (
                            <div key={key} className="border rounded-lg p-3">
                                <div className="flex justify-between items-center mb-2">
                                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${val.color}`}>{val.label}</span>
                                    <span className="text-lg font-bold text-gray-800">{val.count}</span>
                                </div>
                                <div className="text-xs text-gray-500">
                                    <div>應繳：${Number(val.amount).toLocaleString()}</div>
                                    {val.paid_amount > 0 && <div className="text-green-600">實繳：${Number(val.paid_amount).toLocaleString()}</div>}
                                </div>
                                {/* Progress bar */}
                                {payments.length > 0 && (
                                    <div className="mt-2 bg-gray-100 rounded-full h-1.5">
                                        <div
                                            className="bg-blue-500 h-1.5 rounded-full"
                                            style={{ width: `${Math.round((val.count / payments.length) * 100)}%` }}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Monthly Breakdown */}
                {Object.keys(monthly).length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">月份繳費分佈</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 border">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">月份</th>
                                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500">筆數</th>
                                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">實收金額</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {Object.entries(monthly).map(([month, val]) => (
                                        <tr key={month} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 text-sm font-medium">{month}</td>
                                            <td className="px-4 py-2 text-center text-sm">{val.count}</td>
                                            <td className="px-4 py-2 text-right text-sm font-medium text-green-600">
                                                ${Number(val.amount).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Full List */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">{selPeriod} 期 — 完整明細</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 border text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 w-10">No.</th>
                                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 w-16">狀態</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">會員</th>
                                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">應繳</th>
                                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">實繳</th>
                                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-500">繳費日</th>
                                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-500">方式</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {payments.length === 0 ? (
                                    <tr><td colSpan={7} className="px-3 py-6 text-center text-gray-400">此期別無資料</td></tr>
                                ) : (
                                    payments.map((p, i) => {
                                        const st = statuses[p.status] ?? { label: p.status, color: 'bg-gray-100 text-gray-600' };
                                        return (
                                            <tr key={p.id} className="hover:bg-gray-50">
                                                <td className="px-3 py-1.5 text-center text-xs">{i + 1}.</td>
                                                <td className="px-3 py-1.5 text-center">
                                                    <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${st.color}`}>{st.label}</span>
                                                </td>
                                                <td className="px-3 py-1.5">
                                                    <span className="font-medium">{p.member_name}</span>
                                                    {p.member_no && <span className="text-xs text-gray-400 ml-1">[{p.member_no}]</span>}
                                                </td>
                                                <td className="px-3 py-1.5 text-right">${Number(p.amount).toLocaleString()}</td>
                                                <td className="px-3 py-1.5 text-right text-green-600 font-medium">
                                                    {p.paid_amount > 0 ? `$${Number(p.paid_amount).toLocaleString()}` : '-'}
                                                </td>
                                                <td className="px-3 py-1.5 text-center text-xs">{p.paid_date ?? '-'}</td>
                                                <td className="px-3 py-1.5 text-center text-xs">{p.payment_method ?? '-'}</td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                            <tfoot className="bg-gray-50">
                                <tr>
                                    <td colSpan={3} className="px-3 py-2 text-sm font-medium text-right">合計</td>
                                    <td className="px-3 py-2 text-right text-sm font-bold">${Number(totalAmount).toLocaleString()}</td>
                                    <td className="px-3 py-2 text-right text-sm font-bold text-green-600">${Number(totalPaidAmount).toLocaleString()}</td>
                                    <td colSpan={2}></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
