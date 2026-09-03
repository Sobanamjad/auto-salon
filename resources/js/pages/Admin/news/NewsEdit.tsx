import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { 
    FaArrowLeft, FaSave, FaTimes, FaBullhorn, FaImage, 
    FaVideo, FaMapMarkedAlt, FaTag, FaHome, FaSort,
    FaCalendar, FaFileAlt
} from 'react-icons/fa';

interface NewsFormData {
    published_date: string;
    end_date: string;
    status: boolean;
    show_on_home: boolean;
    show_marquee: boolean;
    sort_order: number;
    category: string;
    subject: string;
    brief: string;
    content: string;
    keyword: string;
    video: string;
    map: string;
    note: string;
    photo: File | null;
}

interface NewsEditProps {
    news: {
        id: number;
        published_date: string;
        end_date: string;
        status: boolean;
        show_on_home: boolean;
        show_marquee: boolean;
        sort_order: number;
        category: string;
        photo: string | null;
        subject: string;
        brief: string | null;
        content: string;
        keyword: string | null;
        video: string | null;
        map: string | null;
        note: string | null;
    };
}

export default function NewsEdit({ news }: NewsEditProps) {
    const { data, setData, put, processing, errors } = useForm<NewsFormData>({
        published_date: news.published_date ? news.published_date.slice(0, 16) : new Date().toISOString().slice(0, 16),
        end_date: news.end_date || '2200-12-31',
        status: news.status,
        show_on_home: news.show_on_home,
        show_marquee: news.show_marquee,
        sort_order: news.sort_order,
        category: news.category,
        subject: news.subject,
        brief: news.brief || '',
        content: news.content,
        keyword: news.keyword || '',
        video: news.video || '',
        map: news.map || '',
        note: news.note || '',
        photo: null
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        
        // Add all form fields
        Object.keys(data).forEach(key => {
            if (key === 'photo' && data.photo instanceof File) {
                formData.append('photo', data.photo);
            } else if (key !== 'photo') {
                formData.append(key, String(data[key as keyof NewsFormData]));
            }
        });

        put(`/admin/news/${news.id}`, {
            data: formData,
            forceFormData: true,
            onSuccess: () => {
                window.location.href = '/admin/news';
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
            }
        });
    };

    return (
        <>
            <Head title="最新消息 - 編輯資料" />
            
            <div className="bg-white rounded-xl shadow-sm p-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Link 
                            href="/admin/news"
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <FaArrowLeft size={20} />
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <FaBullhorn className="text-blue-500" /> 最新消息 - 編輯資料
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">編輯消息內容</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/admin/news"
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                            <FaTimes /> 取消返回
                        </Link>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Date Section */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaCalendar className="text-blue-500" /> 日期設定
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    發表日期
                                </label>
                                <input
                                    type="datetime-local"
                                    value={data.published_date}
                                    onChange={(e) => setData('published_date', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    截止日期
                                </label>
                                <input
                                    type="date"
                                    value={data.end_date}
                                    onChange={(e) => setData('end_date', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Settings Section */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaTag className="text-blue-500" /> 設定
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    是否發佈
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            checked={data.status === true}
                                            onChange={() => setData('status', true)}
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <span className="text-blue-600">發佈</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            checked={data.status === false}
                                            onChange={() => setData('status', false)}
                                            className="w-4 h-4 text-red-600"
                                        />
                                        <span className="text-red-600">不發佈</span>
                                    </label>
                                </div>
                            </div>

                            {/* Show on Home */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaHome className="inline mr-1" /> 首頁
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            checked={data.show_on_home === true}
                                            onChange={() => setData('show_on_home', true)}
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <span className="text-blue-600">顯示</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            checked={data.show_on_home === false}
                                            onChange={() => setData('show_on_home', false)}
                                            className="w-4 h-4 text-red-600"
                                        />
                                        <span className="text-red-600">不顯示</span>
                                    </label>
                                </div>
                            </div>

                            {/* Show on Marquee */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaBullhorn className="inline mr-1" /> 跑馬燈
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            checked={data.show_marquee === true}
                                            onChange={() => setData('show_marquee', true)}
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <span className="text-blue-600">顯示</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            checked={data.show_marquee === false}
                                            onChange={() => setData('show_marquee', false)}
                                            className="w-4 h-4 text-red-600"
                                        />
                                        <span className="text-red-600">不顯示</span>
                                    </label>
                                </div>
                            </div>

                            {/* Sort Order */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaSort className="inline mr-1" /> 排序
                                </label>
                                <input
                                    type="number"
                                    value={data.sort_order}
                                    onChange={(e) => setData('sort_order', parseInt(e.target.value) || 999)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                />
                                <p className="text-xs text-gray-500 mt-1">數字小排在前</p>
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    分類
                                </label>
                                <select
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="3595">最新公告</option>
                                    <option value="3594">會務活動</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Subject & Brief */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    主題 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.subject}
                                    onChange={(e) => setData('subject', e.target.value)}
                                    className={`w-full border rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 ${
                                        errors.subject ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="請輸入主題"
                                    required
                                />
                                {errors.subject && (
                                    <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    簡述
                                </label>
                                <textarea
                                    value={data.brief}
                                    onChange={(e) => setData('brief', e.target.value)}
                                    rows={3}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="請輸入簡述..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            內容 <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            rows={12}
                            className={`w-full border rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 ${
                                errors.content ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="請輸入詳細內容..."
                            required
                        />
                        {errors.content && (
                            <p className="text-red-500 text-sm mt-1">{errors.content}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-2">
                            <i className="icon-book"></i> 
                            <a 
                                href="https://mypaper.52go.tw/17web/96/50461/" 
                                target="_blank"
                                className="text-blue-600 hover:underline ml-1"
                            >
                                上傳圖片說明
                            </a>
                        </p>
                    </div>

                    {/* Keyword */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            相關字
                        </label>
                        <input
                            type="text"
                            value={data.keyword}
                            onChange={(e) => setData('keyword', e.target.value)}
                            maxLength={10}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                            placeholder="與該公告有關之文字，限定10個字"
                        />
                        <p className="text-xs text-gray-500 mt-1">與該公告有關之文字，限定10個字</p>
                    </div>

                    {/* Photo */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <FaImage className="inline mr-1 text-blue-500" /> 相片
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                setData('photo', file);
                            }}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                        />
                        {news.photo && (
                            <div className="mt-2">
                                <p className="text-xs text-gray-500 mb-1">目前相片:</p>
                                <img 
                                    src={news.photo.indexOf('/news_files/') === 0 ? news.photo : `/storage/${news.photo}`} 
                                    alt="Current photo" 
                                    className="h-20 w-auto object-cover rounded"
                                />
                            </div>
                        )}
                        <p className="text-xs text-gray-500 mt-1">支援 JPG, PNG, GIF 格式，最大 10MB</p>
                    </div>

                    {/* Video */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <FaVideo className="inline mr-1 text-purple-500" /> 影音
                        </label>
                        <textarea
                            value={data.video}
                            onChange={(e) => setData('video', e.target.value)}
                            rows={3}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                            placeholder="請輸入影音嵌入代碼..."
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            <a 
                                href="https://mypaper.52go.tw/17web_gudate/96/14506/" 
                                target="_blank"
                                className="text-blue-600 hover:underline"
                            >
                                教學
                            </a>
                        </p>
                    </div>

                    {/* Google Map */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <FaMapMarkedAlt className="inline mr-1 text-red-500" /> Google Map
                        </label>
                        <textarea
                            value={data.map}
                            onChange={(e) => setData('map', e.target.value)}
                            rows={3}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                            placeholder="請輸入 Google Map 嵌入代碼..."
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            <a 
                                href="https://mypaper.52go.tw/17web/124/15020/" 
                                target="_blank"
                                className="text-blue-600 hover:underline"
                            >
                                教學
                            </a>
                        </p>
                    </div>

                    {/* Note */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            備註
                        </label>
                        <textarea
                            value={data.note}
                            onChange={(e) => setData('note', e.target.value)}
                            rows={4}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                            placeholder="請輸入備註..."
                        />
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                        <Link
                            href="/admin/news"
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            取消返回
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FaSave /> {processing ? '儲存中...' : '更新資料'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
