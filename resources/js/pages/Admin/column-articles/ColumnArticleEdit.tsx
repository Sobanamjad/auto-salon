import { Head, Link, useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import {
    FaArrowLeft, FaSave, FaTimes, FaPencilAlt,
    FaImage, FaVideo, FaMapMarkedAlt, FaHome,
    FaSort, FaCalendar, FaTag, FaSearch, FaTimesCircle, FaTrash,
} from 'react-icons/fa';

interface Article {
    id: number;
    language: string;
    status: boolean;
    show_on_home: boolean;
    sort_order: number;
    published_date: string;
    end_date: string;
    category: string;
    subject: string;
    brief: string | null;
    content: string;
    keyword: string | null;
    video: string | null;
    map: string | null;
    note: string | null;
    has_photo: boolean;
    img: string | null;
    img_w: number | null;
    img_h: number | null;
    platform_category: string | null;
    join_platform: boolean;
    views: number;
}

interface Props {
    article: Article;
    title: string;
}

export default function ColumnArticleEdit({ article, title }: Props) {
    const { data, setData, post, processing, errors } = useForm<{
        _method: string;
        language: string;
        status: boolean;
        show_on_home: boolean;
        sort_order: number;
        published_date: string;
        end_date: string;
        category: string;
        subject: string;
        brief: string;
        content: string;
        keyword: string;
        video: string;
        map: string;
        note: string;
        has_photo: boolean;
        image: File | null;
        remove_image: boolean;
        platform_category: string;
        join_platform: boolean;
    }>({
        _method: 'PUT',
        language: article.language || 'TS',
        status: article.status ?? false,
        show_on_home: article.show_on_home ?? false,
        sort_order: article.sort_order || 999,
        published_date: article.published_date || new Date().toISOString().split('T')[0],
        end_date: article.end_date || '2200-12-31',
        category: article.category || '',
        subject: article.subject || '',
        brief: article.brief || '',
        content: article.content || '',
        keyword: article.keyword || '',
        video: article.video || '',
        map: article.map || '',
        note: article.note || '',
        has_photo: article.has_photo || false,
        image: null,
        remove_image: false,
        platform_category: article.platform_category || '',
        join_platform: article.join_platform || false,
    });

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [newPreviewUrl, setNewPreviewUrl] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setData('image', file);
        setData('remove_image', false);
        setNewPreviewUrl(file ? URL.createObjectURL(file) : null);
    };

    const handleRemoveNewFile = () => {
        setData('image', null);
        setNewPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleRemoveExisting = () => {
        setData('remove_image', true);
        setData('has_photo', false);
    };

    const handleUndoRemove = () => {
        setData('remove_image', false);
        setData('has_photo', true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/admin/column-articles/${article.id}`, {
            forceFormData: true,
            onSuccess: () => { window.location.href = '/admin/column-articles'; },
            onError: (errs) => { console.error('Validation errors:', errs); },
        });
    };

    const existingImg  = article.img;
    const showNew      = newPreviewUrl !== null;
    const showExisting = existingImg && !data.remove_image && !newPreviewUrl;
    const showRemoved  = existingImg && data.remove_image && !newPreviewUrl;

    return (
        <>
            <Head title={title} />

            <div className="bg-white rounded-xl shadow-sm p-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Link href="/admin/column-articles" className="text-gray-500 hover:text-gray-700 transition-colors">
                            <FaArrowLeft size={20} />
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <FaPencilAlt className="text-blue-500" /> {title}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">編輯專欄文章 #{article.id}</p>
                        </div>
                    </div>
                    <Link href="/admin/column-articles" className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                        <FaTimes /> 取消返回
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Date & Settings */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaCalendar className="inline mr-1" /> 發表日期
                                </label>
                                <input type="date" value={data.published_date}
                                    onChange={(e) => setData('published_date', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">截止日期</label>
                                <input type="date" value={data.end_date}
                                    onChange={(e) => setData('end_date', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaSort className="inline mr-1" /> 排序
                                </label>
                                <input type="number" value={data.sort_order}
                                    onChange={(e) => setData('sort_order', parseInt(e.target.value) || 999)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
                                <p className="text-xs text-gray-500 mt-1">數字小排在前</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">是否發佈</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input type="radio" checked={data.status === true} onChange={() => setData('status', true)} className="w-4 h-4 text-blue-600" />
                                        <span className="text-blue-600">發佈</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="radio" checked={data.status === false} onChange={() => setData('status', false)} className="w-4 h-4 text-red-600" />
                                        <span className="text-red-600">不發佈</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaHome className="inline mr-1" /> 首頁
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input type="radio" checked={data.show_on_home === true} onChange={() => setData('show_on_home', true)} className="w-4 h-4 text-blue-600" />
                                        <span className="text-blue-600">顯示</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="radio" checked={data.show_on_home === false} onChange={() => setData('show_on_home', false)} className="w-4 h-4 text-red-600" />
                                        <span className="text-red-600">不顯示</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaTag className="inline mr-1" /> 分類
                                </label>
                                <select value={data.category} onChange={(e) => setData('category', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500">
                                    <option value="">選擇分類</option>
                                    <option value="社團達人-社團展示">社團達人-社團展示</option>
                                    <option value="會友專欄">會友專欄</option>
                                    <option value="會友動態">會友動態</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Subject */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">主題 <span className="text-red-500">*</span></label>
                        <input type="text" value={data.subject} onChange={(e) => setData('subject', e.target.value)}
                            className={`w-full border rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 ${errors.subject ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="請輸入主題" required />
                        {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                    </div>

                    {/* Brief */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">摘要區</label>
                        <textarea value={data.brief} onChange={(e) => setData('brief', e.target.value)}
                            rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                            placeholder="AI 友善摘要區..." />
                    </div>

                    {/* Content */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">內容 <span className="text-red-500">*</span></label>
                        <textarea value={data.content} onChange={(e) => setData('content', e.target.value)}
                            rows={12} className={`w-full border rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 ${errors.content ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="請輸入詳細內容..." required />
                        {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
                        <p className="text-xs text-gray-500 mt-2">
                            <a href="https://mypaper.52go.tw/17web/96/50461/" target="_blank" className="text-blue-600 hover:underline">上傳圖片說明</a>
                        </p>
                    </div>

                    {/* Keyword */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <FaSearch className="inline mr-1" /> 相關字
                        </label>
                        <input type="text" value={data.keyword} onChange={(e) => setData('keyword', e.target.value)}
                            maxLength={10} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                            placeholder="與文章有關之文字，限定10個字" />
                        <p className="text-xs text-gray-500 mt-1">與文章有關之文字，限定10個字</p>
                    </div>

                    {/* Image Upload */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            <FaImage className="inline mr-1 text-green-500" /> 封面圖片
                        </label>
                        <div className="flex items-start gap-4">
                            {/* Preview area */}
                            <div className="shrink-0">
                                {showNew && (
                                    <div className="relative">
                                        <img src={newPreviewUrl!} alt="新圖預覽" className="w-32 h-32 object-cover rounded-lg border-2 border-blue-400" />
                                        <span className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-1 rounded">新圖</span>
                                        <button type="button" onClick={handleRemoveNewFile}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600">
                                            <FaTimesCircle size={16} />
                                        </button>
                                    </div>
                                )}
                                {showExisting && (
                                    <div className="relative">
                                        <img src={existingImg!} alt="現有圖片" className="w-32 h-32 object-cover rounded-lg border border-gray-300" />
                                        <span className="absolute top-1 left-1 bg-gray-600 text-white text-xs px-1 rounded">現有</span>
                                        <button type="button" onClick={handleRemoveExisting}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600">
                                            <FaTrash size={14} />
                                        </button>
                                    </div>
                                )}
                                {showRemoved && (
                                    <div className="w-32 h-32 border-2 border-dashed border-red-300 rounded-lg flex flex-col items-center justify-center text-red-400 gap-1">
                                        <FaTrash size={20} />
                                        <span className="text-xs">將刪除</span>
                                        <button type="button" onClick={handleUndoRemove} className="text-xs text-blue-600 hover:underline mt-1">復原</button>
                                    </div>
                                )}
                                {!showNew && !showExisting && !showRemoved && (
                                    <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400">
                                        <FaImage size={24} />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1">
                                <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/jpg,image/gif"
                                    onChange={handleFileChange}
                                    className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                                <p className="text-xs text-gray-500 mt-2">選擇新圖片將取代現有圖片。支援 JPEG、PNG、GIF，最大 5MB。</p>
                                {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Video */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <FaVideo className="inline mr-1 text-purple-500" /> 影音
                        </label>
                        <textarea value={data.video} onChange={(e) => setData('video', e.target.value)}
                            rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                            placeholder="請輸入影音嵌入代碼..." />
                        <p className="text-xs text-gray-500 mt-1">
                            <a href="https://mypaper.52go.tw/17web_gudate/96/14506/" target="_blank" className="text-blue-600 hover:underline">教學</a>
                        </p>
                    </div>

                    {/* Google Map */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <FaMapMarkedAlt className="inline mr-1 text-red-500" /> Google Map
                        </label>
                        <textarea value={data.map} onChange={(e) => setData('map', e.target.value)}
                            rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                            placeholder="請輸入 Google Map 嵌入代碼..." />
                        <p className="text-xs text-gray-500 mt-1">
                            <a href="https://mypaper.52go.tw/17web/124/15020/" target="_blank" className="text-blue-600 hover:underline">教學</a>
                        </p>
                    </div>

                    {/* Platform Marketing */}
                    <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-purple-300">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaTag className="text-purple-500" /> 免費平台串聯行銷
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">(生活達人誌、行銷順風車、合作社團、合作發展協會、合作網站、合作村里等...)</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">申請加入</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input type="radio" checked={data.join_platform === true} onChange={() => setData('join_platform', true)} className="w-4 h-4 text-pink-500" />
                                        <span className="text-pink-500">申請加入</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="radio" checked={data.join_platform === false} onChange={() => setData('join_platform', false)} className="w-4 h-4 text-blue-500" />
                                        <span className="text-blue-500">不加入平台</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">平台分類</label>
                                <select value={data.platform_category} onChange={(e) => setData('platform_category', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500">
                                    <option value="">選擇平台分類</option>
                                    <option value="食之優惠">[美味食光] 食之優惠</option>
                                    <option value="吃咖情報">[美味食光] 吃咖情報</option>
                                    <option value="服飾穿搭">[妝乎水水] 服飾穿搭</option>
                                    <option value="美髮">[妝乎水水] 美髮</option>
                                    <option value="旅遊商圈">[旅遊樂點] 旅遊商圈</option>
                                    <option value="人文熱點">[旅遊樂點] 人文熱點</option>
                                    <option value="3C新訊">[專業主題] 3C新訊</option>
                                    <option value="AI 新知">[專業主題] AI 新知</option>
                                </select>
                                <p className="text-xs text-gray-500 mt-1">選取 【優惠】 分類，也同時曝光在合作媒體上。但內容需要有優惠。</p>
                            </div>
                        </div>
                    </div>

                    {/* Note */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">備註</label>
                        <textarea value={data.note} onChange={(e) => setData('note', e.target.value)}
                            rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                            placeholder="請輸入備註..." />
                    </div>

                    {/* Submit */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                        <Link href="/admin/column-articles" className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                            取消返回
                        </Link>
                        <button type="submit" disabled={processing}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50">
                            <FaSave /> {processing ? '儲存中...' : '儲存更新'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
