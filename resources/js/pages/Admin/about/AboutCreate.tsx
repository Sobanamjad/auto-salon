import { Head, Link, useForm } from '@inertiajs/react';
import { FaArrowLeft, FaSave, FaTimes, FaInfoCircle, FaImage, FaTag, FaGlobe, FaHome } from 'react-icons/fa';

interface AboutFormData {
    language: string;
    status: boolean;
    show_on_home: boolean;
    sort_order: number;
    category: string;
    subject: string;
    brief: string;
    content: string;
    image: File | null;
    video: string;
    note: string;
    issuedate: string;
    enddate: string;
}

export default function AboutCreate() {
    const { data, setData, post, processing, errors } = useForm<AboutFormData>({
        language: 'TS',
        status: true,
        show_on_home: true,
        sort_order: 999,
        category: '',
        subject: '',
        brief: '',
        content: '',
        image: null,
        video: '',
        note: '',
        issuedate: new Date().toISOString().split('T')[0],
        enddate: '2200-12-31'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/about', {
            onSuccess: () => {
                window.location.href = '/admin/about';
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
            }
        });
    };

    return (
        <>
            <Head title="關於本會 - 新增資料" />
            
            <div className="bg-white rounded-xl shadow-sm p-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Link 
                            href="/admin/about"
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <FaArrowLeft size={20} />
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <FaInfoCircle className="text-blue-500" /> 關於本會 - 新增資料
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">建立新的介紹內容</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/admin/about"
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                            <FaTimes /> 取消返回
                        </Link>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Settings Section */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaTag className="text-blue-500" /> 設定
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Language */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaGlobe className="inline mr-1" /> 語言
                                </label>
                                <select
                                    value={data.language}
                                    onChange={(e) => setData('language', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="TS">繁中</option>
                                    <option value="EN">英文</option>
                                    <option value="JP">日文</option>
                                </select>
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    狀態
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            checked={data.status === true}
                                            onChange={() => setData('status', true)}
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <span className="text-blue-600">發布</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            checked={data.status === false}
                                            onChange={() => setData('status', false)}
                                            className="w-4 h-4 text-red-600"
                                        />
                                        <span className="text-red-600">隱藏</span>
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

                            {/* Sort Order */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    排序
                                </label>
                                <input
                                    type="number"
                                    value={data.sort_order}
                                    onChange={(e) => setData('sort_order', parseInt(e.target.value) || 999)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Date Range & Category */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Issue Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    發表日期：
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="date"
                                        value={data.issuedate}
                                        onChange={(e) => setData('issuedate', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    />
                                    <span>~</span>
                                    <input
                                        type="date"
                                        value={data.enddate}
                                        onChange={(e) => setData('enddate', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    分類項目
                                </label>
                                <select
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">請選擇分類</option>
                                    <option value="社團達人-社團展示">社團達人-社團展示</option>
                                    <option value="成立宗旨">成立宗旨</option>
                                    <option value="組織章程">組織章程</option>
                                    <option value="協會歷史">協會歷史</option>
                                    <option value="使命與願景">使命與願景</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Subject & Brief */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        {/* Subject */}
                        <div className="mb-4">
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

                        {/* Brief */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                簡述：
                            </label>
                            <textarea
                                value={data.brief}
                                onChange={(e) => setData('brief', e.target.value)}
                                rows={6}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                placeholder="請輸入簡述..."
                            />
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

                    {/* Image */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <FaImage className="inline mr-1 text-blue-500" /> 相片
                        </label>
                        <div className="flex items-center gap-4">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setData('image', file);
                                    }
                                }}
                                className="text-sm text-gray-500"
                            />
                            <button
                                type="button"
                                onClick={() => setData('image', null)}
                                className="text-red-500 hover:text-red-700 text-sm"
                            >
                                移除相片
                            </button>
                        </div>
                        {data.image && (
                            <p className="text-sm text-green-600 mt-2">
                                ✅ 已選擇: {data.image.name}
                            </p>
                        )}
                    </div>

                    {/* Video */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            影音
                        </label>
                        <textarea
                            value={data.video}
                            onChange={(e) => setData('video', e.target.value)}
                            rows={4}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                            placeholder="請輸入影音代碼..."
                            cols="90"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                            <a 
                                href="https://mypaper.52go.tw/17web_gudate/96/14506/" 
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
                            備註：
                        </label>
                        <textarea
                            value={data.note}
                            onChange={(e) => setData('note', e.target.value)}
                            rows={4}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                            placeholder="請輸入備註..."
                            cols="40"
                        />
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                        <Link
                            href="/admin/about"
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            取消返回
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FaSave /> {processing ? '儲存中...' : '新增資料'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
