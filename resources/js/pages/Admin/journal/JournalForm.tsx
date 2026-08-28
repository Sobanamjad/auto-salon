// resources/js/pages/Admin/journal/JournalForm.tsx
import { Head, Link, router, useForm } from '@inertiajs/react';
import { FaArrowLeft, FaSave, FaTimes, FaFileAlt } from 'react-icons/fa';

interface JournalItem {
    id?: number;
    account_subject: string;
    serial_no: string;
    invoice_no: string;
    invoice_date: string;
    transaction_date: string;
    customer_name: string;
    customer_vat: string;
    amount: number | string;
    type: 'income' | 'expense';
    summary: string;
    is_invoice_encrypted: boolean;
    invoice_password: string;
    remark: string;
}

interface Props {
    title?: string;
    journal: JournalItem | null;
    accountSubjects: { id: string; name: string }[];
    serialNo: string;
}

export default function JournalForm({ title = '會計日記簿', journal, accountSubjects, serialNo }: Props) {
    const isEdit = !!journal;

    const { data, setData, post, put, processing, errors } = useForm<JournalItem>({
        account_subject: journal?.account_subject || '',
        serial_no: journal?.serial_no || serialNo,
        invoice_no: journal?.invoice_no || '',
        invoice_date: journal?.invoice_date || '',
        transaction_date: journal?.transaction_date || new Date().toISOString().split('T')[0],
        customer_name: journal?.customer_name || '',
        customer_vat: journal?.customer_vat || '',
        amount: journal?.amount || '',
        type: journal?.type || 'income',
        summary: journal?.summary || '',
        is_invoice_encrypted: journal?.is_invoice_encrypted || false,
        invoice_password: journal?.invoice_password || serialNo,
        remark: journal?.remark || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit && journal?.id) {
            put(`/admin/journal/${journal.id}`);
        } else {
            post('/admin/journal');
        }
    };

    return (
        <>
            <Head title={title} />
            
            <div className="bg-white rounded-xl shadow-sm p-6 text-gray-900">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Link 
                            href="/admin/journal"
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <FaArrowLeft size={20} />
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <FaFileAlt className="text-blue-500" /> {title}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                {isEdit ? '編輯日記簿資料' : '新增日記簿資料'}
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Row 1: Account Subject + Serial No */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">科目編號</label>
                            <select
                                value={data.account_subject}
                                onChange={(e) => setData('account_subject', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">請選擇</option>
                                {accountSubjects.map(subject => (
                                    <option key={subject.id} value={subject.name}>
                                        {subject.id} {subject.name}
                                    </option>
                                ))}
                            </select>
                            {errors.account_subject && (
                                <div className="text-red-500 text-xs mt-1">{errors.account_subject}</div>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">單號 <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                value={data.serial_no}
                                onChange={(e) => setData('serial_no', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 bg-gray-50"
                                readOnly
                            />
                            {errors.serial_no && (
                                <div className="text-red-500 text-xs mt-1">{errors.serial_no}</div>
                            )}
                        </div>
                    </div>

                    {/* Row 2: Invoice No + Invoice Date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">發票號碼</label>
                            <input
                                type="text"
                                value={data.invoice_no}
                                onChange={(e) => setData('invoice_no', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.invoice_no && (
                                <div className="text-red-500 text-xs mt-1">{errors.invoice_no}</div>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">發票日期</label>
                            <input
                                type="date"
                                value={data.invoice_date}
                                onChange={(e) => setData('invoice_date', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.invoice_date && (
                                <div className="text-red-500 text-xs mt-1">{errors.invoice_date}</div>
                            )}
                        </div>
                    </div>

                    {/* Row 3: Transaction Date */}
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                        <div className="max-w-md">
                            <label className="block text-sm font-medium text-gray-700 mb-1">交易日 <span className="text-red-500">*</span></label>
                            <input
                                type="date"
                                value={data.transaction_date}
                                onChange={(e) => setData('transaction_date', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.transaction_date && (
                                <div className="text-red-500 text-xs mt-1">{errors.transaction_date}</div>
                            )}
                        </div>
                    </div>

                    {/* Row 4: Customer Name + Customer VAT */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">客戶名稱</label>
                            <input
                                type="text"
                                value={data.customer_name}
                                onChange={(e) => setData('customer_name', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.customer_name && (
                                <div className="text-red-500 text-xs mt-1">{errors.customer_name}</div>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">客戶統編</label>
                            <input
                                type="text"
                                value={data.customer_vat}
                                onChange={(e) => setData('customer_vat', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.customer_vat && (
                                <div className="text-red-500 text-xs mt-1">{errors.customer_vat}</div>
                            )}
                        </div>
                    </div>

                    {/* Row 5: Amount + Type */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">金額 <span className="text-red-500">*</span></label>
                            <input
                                type="number"
                                step="0.01"
                                value={data.amount}
                                onChange={(e) => setData('amount', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.amount && (
                                <div className="text-red-500 text-xs mt-1">{errors.amount}</div>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">種類 <span className="text-red-500">*</span></label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        value="income"
                                        checked={data.type === 'income'}
                                        onChange={(e) => setData('type', e.target.value as 'income')}
                                        className="w-4 h-4 text-blue-600"
                                    />
                                    <span className="text-red-600 font-medium">收入</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        value="expense"
                                        checked={data.type === 'expense'}
                                        onChange={(e) => setData('type', e.target.value as 'expense')}
                                        className="w-4 h-4 text-blue-600"
                                    />
                                    <span className="text-green-600 font-medium">支出</span>
                                </label>
                            </div>
                            {errors.type && (
                                <div className="text-red-500 text-xs mt-1">{errors.type}</div>
                            )}
                        </div>
                    </div>

                    {/* Row 6: Summary */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">摘要</label>
                        <textarea
                            value={data.summary}
                            onChange={(e) => setData('summary', e.target.value)}
                            rows={3}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.summary && (
                            <div className="text-red-500 text-xs mt-1">{errors.summary}</div>
                        )}
                    </div>

                    {/* Row 7: Receipt Encryption + Password */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">收據加密</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        value="0"
                                        checked={!data.is_invoice_encrypted}
                                        onChange={() => setData('is_invoice_encrypted', false)}
                                        className="w-4 h-4 text-blue-600"
                                    />
                                    <span className="text-blue-600">不加密</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        value="1"
                                        checked={data.is_invoice_encrypted}
                                        onChange={() => setData('is_invoice_encrypted', true)}
                                        className="w-4 h-4 text-blue-600"
                                    />
                                    <span className="text-red-600">加密碼</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">收據密碼</label>
                            <input
                                type="text"
                                value={data.invoice_password}
                                onChange={(e) => setData('invoice_password', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                disabled={!data.is_invoice_encrypted}
                            />
                            {errors.invoice_password && (
                                <div className="text-red-500 text-xs mt-1">{errors.invoice_password}</div>
                            )}
                        </div>
                    </div>

                    {/* Row 8: Remark */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">備註</label>
                        <textarea
                            value={data.remark}
                            onChange={(e) => setData('remark', e.target.value)}
                            rows={2}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.remark && (
                            <div className="text-red-500 text-xs mt-1">{errors.remark}</div>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-200">
                        <Link
                            href="/admin/journal"
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                            <FaTimes /> 取消返回
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                            <FaSave /> {processing ? '處理中...' : (isEdit ? '更新資料' : '送出資料')}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}