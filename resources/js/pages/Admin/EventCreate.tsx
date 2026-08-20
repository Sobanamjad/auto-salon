import { Head, Link, useForm } from '@inertiajs/react';
import { FaArrowLeft, FaSave, FaTimes, FaCalendar, FaTag, FaInfoCircle } from 'react-icons/fa';

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
}

export default function EventCreate() {
    // Inertia useForm hook for better form handling
    const { data, setData, post, processing, errors } = useForm<EventFormData>({
        title: '',
        category: '本會活動',
        status: '開放報名',
        date_start: '',
        date_end: '',
        signup_start: '',
        signup_end: '',
        is_open: true,
        content: '',
        max_attendees: 0,
        location: ''
    });

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/events', {
            onSuccess: () => {
                // Redirect to event list after success
                window.location.href = '/admin/events';
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
            }
        });
    };

    return (
        <>
            <Head title="新增活動" />
            
            <div className="bg-white rounded-xl shadow-sm p-6">
                {/* Header with Back Button */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Link 
                            href="/admin/events"
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <FaArrowLeft size={20} />
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">新增活動</h2>
                            <p className="text-sm text-gray-500 mt-1">建立新的活動</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/admin/events"
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                            <FaTimes /> 取消
                        </Link>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information Section */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaInfoCircle className="text-blue-500" /> 基本資訊
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* 活動標題 */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    活動標題 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className={`w-full border rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.title ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="請輸入活動標題"
                                    required
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                                )}
                            </div>

                            {/* 活動分類 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    活動分類 <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="本會活動">本會活動</option>
                                    <option value="好友活動">好友活動</option>
                                    <option value="其他">其他</option>
                                </select>
                            </div>

                            {/* 活動狀態 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    活動狀態 <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="開放報名">開放報名</option>
                                    <option value="停止報名">停止報名</option>
                                    <option value="已截止">已截止</option>
                                </select>
                            </div>

                            {/* 活動地點 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    活動地點
                                </label>
                                <input
                                    type="text"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="請輸入活動地點"
                                />
                            </div>

                            {/* 最大參加人數 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    最大參加人數
                                </label>
                                <input
                                    type="number"
                                    value={data.max_attendees}
                                    onChange={(e) => setData('max_attendees', parseInt(e.target.value) || 0)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="0 = 不限"
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Date Section */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaCalendar className="text-blue-500" /> 日期設定
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* 活動開始日期 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    活動開始日期 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={data.date_start}
                                    onChange={(e) => setData('date_start', e.target.value)}
                                    className={`w-full border rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.date_start ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    required
                                />
                                {errors.date_start && (
                                    <p className="text-red-500 text-sm mt-1">{errors.date_start}</p>
                                )}
                            </div>

                            {/* 活動結束日期 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    活動結束日期 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={data.date_end}
                                    onChange={(e) => setData('date_end', e.target.value)}
                                    className={`w-full border rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.date_end ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    required
                                />
                                {errors.date_end && (
                                    <p className="text-red-500 text-sm mt-1">{errors.date_end}</p>
                                )}
                            </div>

                            {/* 報名開始日期 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    報名開始日期
                                </label>
                                <input
                                    type="date"
                                    value={data.signup_start}
                                    onChange={(e) => setData('signup_start', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* 報名結束日期 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    報名結束日期
                                </label>
                                <input
                                    type="date"
                                    value={data.signup_end}
                                    onChange={(e) => setData('signup_end', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* 開放報名 */}
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={data.is_open}
                                    onChange={(e) => setData('is_open', e.target.checked)}
                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label className="text-sm font-medium text-gray-700">
                                    開放報名
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaTag className="text-blue-500" /> 活動內容
                        </h3>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                活動詳細內容
                            </label>
                            <textarea
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                rows={8}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="請輸入活動詳細內容，支援 HTML 格式..."
                            />
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                        <Link
                            href="/admin/events"
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            取消
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FaSave /> {processing ? '儲存中...' : '新增活動'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}