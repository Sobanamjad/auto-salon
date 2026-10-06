import { Head, Link, useForm } from '@inertiajs/react';
import { FaArrowLeft, FaSave, FaTimes, FaMoneyBillWave } from 'react-icons/fa';

interface PaymentItem {
    id?: number;
    member_id: number | string;
    period: string;
    amount: number | string;
    paid_amount: number | string;
    due_date: string;
    paid_date: string;
    payment_method: string;
    receipt_no: string;
    status: string;
    remark: string;
}

interface Member {
    id: number;
    member_no: string;
    name: string;
}

interface StatusInfo { label: string; color: string; }

interface Props {
    title?: string;
    item: PaymentItem | null;
    members: Member[];
    statuses: Record<string, StatusInfo>;
    methods: string[];
}

export default function PaymentForm({ title = '繳費記錄', item, members = [], statuses = {}, methods = [] }: Props) {
    const isEdit = !!item;

    const { data, setData, post, put, processing, errors } = useForm<PaymentItem>({
        member_id:      item?.member_id      ?? '',
        period:         item?.period         ?? new Date().getFullYear().toString(),
        amount:         item?.amount         ?? '',
        paid_amount:    item?.paid_amount    ?? 0,
        due_date:       item?.due_date       ?? '',
        paid_date:      item?.paid_date      ?? '',
        payment_method: item?.payment_method ?? '',
        receipt_no:     item?.receipt_no     ?? '',
        status:         item?.status         ?? 'unpaid',
        remark:         item?.remark         ?? '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit && item?.id) {
            put(`/admin/payments/${item.id}`);
        } else {
            post('/admin/payments');
        }
    };

    return (
        <>
            <Head title={title} />
            <div className="bg-white rounded-xl shadow-sm p-6 text-gray-900">
                <div className="flex items-center gap-3 border-b border-gray-200 pb-4 mb-6">
                    <Link href="/admin/payments" className="text-gray-500 hover:text-gray-700">
                        <FaArrowLeft size={20} />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <FaMoneyBillWave className="text-green-500" /> {title}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">{isEdit ? '編輯繳費記錄' : '新增繳費記錄'}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">

                    {/* Member + Period */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">會員 <span className="text-red-500">*</span></label>
                            <select value={data.member_id} onChange={(e) => setData('member_id', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" required>
                                <option value="">請選擇會員</option>
                                {members.map(m => (
                                    <option key={m.id} value={m.id}>{m.member_no ? `[${m.member_no}] ` : ''}{m.name}</option>
                                ))}
                            </select>
                            {errors.member_id && <p className="text-red-500 text-xs mt-1">{errors.member_id}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">期別 <span className="text-red-500">*</span></label>
                            <input type="text" value={data.period} onChange={(e) => setData('period', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                placeholder="例：2026" required />
                            {errors.period && <p className="text-red-500 text-xs mt-1">{errors.period}</p>}
                        </div>
                    </div>

                    {/* Amount + Paid Amount */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">應繳金額 <span className="text-red-500">*</span></label>
                            <input type="number" min="0" step="1" value={data.amount} onChange={(e) => setData('amount', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" placeholder="0" required />
                            {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">實繳金額</label>
                            <input type="number" min="0" step="1" value={data.paid_amount} onChange={(e) => setData('paid_amount', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" placeholder="0" />
                            {errors.paid_amount && <p className="text-red-500 text-xs mt-1">{errors.paid_amount}</p>}
                        </div>
                    </div>

                    {/* Due Date + Paid Date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">繳費截止日</label>
                            <input type="date" value={data.due_date} onChange={(e) => setData('due_date', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">實際繳費日</label>
                            <input type="date" value={data.paid_date} onChange={(e) => setData('paid_date', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>

                    {/* Method + Receipt */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">繳費方式</label>
                            <select value={data.payment_method} onChange={(e) => setData('payment_method', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                                <option value="">請選擇</option>
                                {methods.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">收據號碼</label>
                            <input type="text" value={data.receipt_no} onChange={(e) => setData('receipt_no', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" placeholder="收據編號" />
                        </div>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">繳費狀態 <span className="text-red-500">*</span></label>
                        <div className="flex flex-wrap gap-4">
                            {Object.entries(statuses).map(([key, val]) => (
                                <label key={key} className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" value={key} checked={data.status === key}
                                        onChange={(e) => setData('status', e.target.value)} className="w-4 h-4" />
                                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${val.color}`}>{val.label}</span>
                                </label>
                            ))}
                        </div>
                        {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
                    </div>

                    {/* Remark */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">備註</label>
                        <textarea value={data.remark} onChange={(e) => setData('remark', e.target.value)}
                            rows={2} className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" />
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-200">
                        <Link href="/admin/payments" className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                            <FaTimes /> 取消返回
                        </Link>
                        <button type="submit" disabled={processing}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50">
                            <FaSave /> {processing ? '處理中...' : (isEdit ? '更新資料' : '送出資料')}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
