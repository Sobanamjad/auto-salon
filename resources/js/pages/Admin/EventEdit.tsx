import { Head, Link, useForm } from '@inertiajs/react';
import { FaArrowLeft, FaSave, FaTimes, FaCalendar, FaMapMarkerAlt, FaUsers, FaInfoCircle, FaTag } from 'react-icons/fa';

interface EventItem {
    id: number;
    title: string;
    category: string;
    status: string;
    date_start: string;
    date_end: string;
    signup_start: string;
    signup_end: string;
    is_open: boolean;
    content: string;
    max_attendees: number;
    location: string;
    is_featured: boolean;
    sort_order: number;
}

interface Props {
    title?: string;
    event: EventItem;
}

interface EventFormData {
    title: string;
    category: string;
    status: string;
    date_start: string;
    date_end: string;
    signup_start: string;
    signup_end: string;
    is_open: boolean;
    content: string;
    max_attendees: number;
    location: string;
    is_featured: boolean;
    sort_order: number;
}

export default function EventEdit({ title = '編輯活動', event }: Props) {
    const { data, setData, put, processing, errors } = useForm<EventFormData>({
        title:         event.title         ?? '',
        category:      event.category      ?? '本會活動',
        status:        event.status        ?? '開放報名',
        date_start:    event.date_start    ?? '',
        date_end:      event.date_end      ?? '',
        signup_start:  event.signup_start  ?? '',
        signup_end:    event.signup_end    ?? '',
        is_open:       event.is_open       ?? true,
        content:       event.content       ?? '',
        max_attendees: event.max_attendees ?? 0,
        location:      event.location      ?? '',
        is_featured:   event.is_featured   ?? false,
        sort_order:    event.sort_order    ?? 999,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/events/${event.id}`);
    };

    return (
        <>
            <Head title={title} />

            <div className="bg-white rounded-xl shadow-sm p-6 text-gray-900">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Link href="/admin/events" className="text-gray-500 hover:text-gray-700 transition-colors">
                            <FaArrowLeft size={20} />
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                            <p className="text-sm text-gray-500 mt-1">ID: {event.id}</p>
                        </div>
                    </div>
                    <Link href="/admin/events" className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                        <FaTimes /> 取消
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Basic Info */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaInfoCircle className="text-blue-500" /> 基本資訊
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* Title */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">活動標題 <span className="text-red-500">*</span></label>
                                <input type="text" value={data.title} onChange={(e) => setData('title', e.target.value)}
                                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="請輸入活動標題" required />
                                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">活動分類 <span className="text-red-500">*</span></label>
                                <select value={data.category} onChange={(e) => setData('category', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                                    <option value="本會活動">本會活動</option>
                                    <option value="好友活動">好友活動</option>
                                    <option value="其他">其他</option>
                                </select>
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">活動狀態 <span className="text-red-500">*</span></label>
                                <select value={data.status} onChange={(e) => setData('status', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                                    <option value="開放報名">開放報名</option>
                                    <option value="停止報名">停止報名</option>
                                    <option value="已截止">已截止</option>
                                </select>
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1"><FaMapMarkerAlt className="inline mr-1 text-red-500" /> 活動地點</label>
                                <input type="text" value={data.location} onChange={(e) => setData('location', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                    placeholder="請輸入活動地點" />
                            </div>

                            {/* Max Attendees */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1"><FaUsers className="inline mr-1 text-blue-500" /> 最大參加人數</label>
                                <input type="number" min="0" value={data.max_attendees}
                                    onChange={(e) => setData('max_attendees', parseInt(e.target.value) || 0)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                    placeholder="0 = 不限" />
                            </div>

                            {/* Sort Order */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">排序</label>
                                <input type="number" min="0" value={data.sort_order}
                                    onChange={(e) => setData('sort_order', parseInt(e.target.value) || 999)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" />
                            </div>

                            {/* Flags */}
                            <div className="md:col-span-2 flex gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={data.is_open} onChange={(e) => setData('is_open', e.target.checked)}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
                                    <span className="text-sm font-medium text-gray-700">開放報名</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={data.is_featured} onChange={(e) => setData('is_featured', e.target.checked)}
                                        className="w-4 h-4 text-yellow-500 border-gray-300 rounded" />
                                    <span className="text-sm font-medium text-gray-700">⭐ 精選活動</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaCalendar className="text-blue-500" /> 日期設定
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">活動開始日期 <span className="text-red-500">*</span></label>
                                <input type="date" value={data.date_start} onChange={(e) => setData('date_start', e.target.value)}
                                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 ${errors.date_start ? 'border-red-500' : 'border-gray-300'}`} required />
                                {errors.date_start && <p className="text-red-500 text-sm mt-1">{errors.date_start}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">活動結束日期 <span className="text-red-500">*</span></label>
                                <input type="date" value={data.date_end} onChange={(e) => setData('date_end', e.target.value)}
                                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 ${errors.date_end ? 'border-red-500' : 'border-gray-300'}`} required />
                                {errors.date_end && <p className="text-red-500 text-sm mt-1">{errors.date_end}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">報名開始日期</label>
                                <input type="date" value={data.signup_start} onChange={(e) => setData('signup_start', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">報名結束日期</label>
                                <input type="date" value={data.signup_end} onChange={(e) => setData('signup_end', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaTag className="text-blue-500" /> 活動內容
                        </h3>
                        <textarea
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            rows={10}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            placeholder="請輸入活動內容 (支援 HTML)"
                        />
                        <p className="text-xs text-gray-400 mt-1">支援 HTML 標籤</p>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-200">
                        <Link href="/admin/events" className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                            <FaTimes /> 取消返回
                        </Link>
                        <button type="submit" disabled={processing}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50">
                            <FaSave /> {processing ? '處理中...' : '更新活動'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
