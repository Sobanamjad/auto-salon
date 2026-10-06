import { Head, Link, useForm } from '@inertiajs/react';
import { FaArrowLeft, FaSave, FaTimes, FaHeart } from 'react-icons/fa';

interface RedWhiteItem {
    id?: number;
    category: string;
    person_name: string;
    event_date_start: string;
    event_date_end: string;
    attend_status: string;
    attendees: string;
    amount: number | string;
    remark: string;
    is_closed: boolean;
    sort_order: number | string;
}

interface Category {
    id: number;
    name: string;
    color: string;
    icon: string;
}

interface Props {
    title?: string;
    item: RedWhiteItem | null;
    categories: Category[];
}

const ATTEND_OPTIONS = ['已出席', '未出席', '委託代理', '請假', ''];

export default function RedWhiteForm({ title = '紅白帖', item, categories = [] }: Props) {
    const isEdit = !!item;

    const { data, setData, post, put, processing, errors } = useForm<RedWhiteItem>({
        category:          item?.category          ?? '',
        person_name:       item?.person_name       ?? '',
        event_date_start:  item?.event_date_start  ?? '',
        event_date_end:    item?.event_date_end    ?? '',
        attend_status:     item?.attend_status     ?? '',
        attendees:         item?.attendees         ?? '',
        amount:            item?.amount            ?? 0,
        remark:            item?.remark            ?? '',
        is_closed:         item?.is_closed         ?? false,
        sort_order:        item?.sort_order        ?? 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit && item?.id) {
            put(`/admin/red-white/${item.id}`);
        } else {
            post('/admin/red-white');
        }
    };

    const categoryOptions = categories.length > 0
        ? categories
        : [
            { id: 1, name: '喜事',    color: '', icon: '🎉' },
            { id: 2, name: '喪事',    color: '', icon: '🕊️' },
            { id: 3, name: '會員開幕', color: '', icon: '🏪' },
          ];

    return (
        <>
            <Head title={title} />

            <div className="bg-white rounded-xl shadow-sm p-6 text-gray-900">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Link href="/admin/red-white" className="text-gray-500 hover:text-gray-700 transition-colors">
                            <FaArrowLeft size={20} />
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <FaHeart className="text-pink-500" /> {title}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                {isEdit ? '編輯紅白帖資料' : '新增紅白帖資料'}
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">

                    {/* Row 1: Category + Person Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                分類 <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">請選擇分類</option>
                                {categoryOptions.map(c => (
                                    <option key={c.id} value={c.name}>
                                        {c.icon} {c.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                當事者姓名 <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.person_name}
                                onChange={(e) => setData('person_name', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                placeholder="請輸入姓名"
                                required
                            />
                            {errors.person_name && <p className="text-red-500 text-xs mt-1">{errors.person_name}</p>}
                        </div>
                    </div>

                    {/* Row 2: Event Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">活動日 (起)</label>
                            <input
                                type="date"
                                value={data.event_date_start}
                                onChange={(e) => setData('event_date_start', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.event_date_start && <p className="text-red-500 text-xs mt-1">{errors.event_date_start}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">活動日 (迄)</label>
                            <input
                                type="date"
                                value={data.event_date_end}
                                onChange={(e) => setData('event_date_end', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.event_date_end && <p className="text-red-500 text-xs mt-1">{errors.event_date_end}</p>}
                        </div>
                    </div>

                    {/* Row 3: Attend Status + Attendees */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">出席狀況</label>
                            <select
                                value={data.attend_status}
                                onChange={(e) => setData('attend_status', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            >
                                {ATTEND_OPTIONS.map(opt => (
                                    <option key={opt} value={opt}>{opt || '請選擇'}</option>
                                ))}
                            </select>
                            {errors.attend_status && <p className="text-red-500 text-xs mt-1">{errors.attend_status}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">出席人員</label>
                            <input
                                type="text"
                                value={data.attendees}
                                onChange={(e) => setData('attendees', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                placeholder="出席人員姓名"
                            />
                            {errors.attendees && <p className="text-red-500 text-xs mt-1">{errors.attendees}</p>}
                        </div>
                    </div>

                    {/* Row 4: Amount + Sort Order */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">款項 (NT$)</label>
                            <input
                                type="number"
                                min="0"
                                step="1"
                                value={data.amount}
                                onChange={(e) => setData('amount', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                placeholder="0"
                            />
                            {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">排序</label>
                            <input
                                type="number"
                                min="0"
                                value={data.sort_order}
                                onChange={(e) => setData('sort_order', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.sort_order && <p className="text-red-500 text-xs mt-1">{errors.sort_order}</p>}
                        </div>
                    </div>

                    {/* Row 5: Remark */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">備註</label>
                        <textarea
                            value={data.remark}
                            onChange={(e) => setData('remark', e.target.value)}
                            rows={3}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            placeholder="備註說明..."
                        />
                        {errors.remark && <p className="text-red-500 text-xs mt-1">{errors.remark}</p>}
                    </div>

                    {/* Row 6: Is Closed */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">結案狀態</label>
                        <div className="flex gap-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    checked={!data.is_closed}
                                    onChange={() => setData('is_closed', false)}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <span className="text-gray-700">未結案</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    checked={data.is_closed}
                                    onChange={() => setData('is_closed', true)}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <span className="text-green-600 font-medium">已結案</span>
                            </label>
                        </div>
                        {errors.is_closed && <p className="text-red-500 text-xs mt-1">{errors.is_closed}</p>}
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-200">
                        <Link
                            href="/admin/red-white"
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
