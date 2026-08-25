import { Head, Link, useForm } from '@inertiajs/react';
import { 
    FaArrowLeft, FaSave, FaTimes, FaPencilAlt, 
    FaImage, FaVideo, FaMapMarkedAlt, FaHome, 
    FaSort, FaCalendar, FaTag, FaSearch
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
    brief: string;
    content: string;
    keyword: string;
    video: string;
    map: string;
    note: string;
    has_photo: boolean;
    platform_category: string;
    join_platform: boolean;
    views: number;
}

interface Props {
    article: Article;
    title: string;
}

export default function ColumnArticleEdit({ article, title }: Props) {
    const { data, setData, put, processing, errors } = useForm({
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
        platform_category: article.platform_category || '',
        join_platform: article.join_platform || false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/column-articles/${article.id}`, {
            onSuccess: () => {
                window.location.href = '/admin/column-articles';
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
            }
        });
    };

    return (
        <>
            <Head title={title} />
            
            <div className="bg-white rounded-xl shadow-sm p-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Link 
                            href="/admin/column-articles"
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <FaArrowLeft size={20} />
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <FaPencilAlt className="text-blue-500" /> {title}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">編輯專欄文章 #{article.id}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/admin/column-articles"
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                            <FaTimes /> 取消返回
                        </Link>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Date & Settings */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaCalendar className="inline mr-1" /> 發表日期
                                </label>
                                <input
                                    type="date"
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
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaTag className="inline mr-1" /> 分類
                                </label>
                                <select
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                >
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
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            摘要區
                        </label>
                        <textarea
                            value={data.brief}
                            onChange={(e) => setData('brief', e.target.value)}
                            rows={3}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                            placeholder="AI 友善摘要區..."
                        />
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
                            <FaSearch className="inline mr-1" /> 相關字
                        </label>
                        <input
                            type="text"
                            value={data.keyword}
                            onChange={(e) => setData('keyword', e.target.value)}
                            maxLength={10}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                            placeholder="與文章有關之文字，限定10個字"
                        />
                        <p className="text-xs text-gray-500 mt-1">與文章有關之文字，限定10個字</p>
                    </div>

                    {/* Photo */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={data.has_photo}
                                onChange={(e) => setData('has_photo', e.target.checked)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <FaImage className="text-gray-500" />
                            <span className="text-sm text-gray-700">有相片</span>
                        </label>
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

                    {/* Platform Marketing Section */}
                    <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-purple-300">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaTag className="text-purple-500" /> 免費平台串聯行銷
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            (生活達人誌、行銷順風車、合作社團、合作發展協會、合作網站、合作村里等...)
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    申請加入
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            checked={data.join_platform === true}
                                            onChange={() => setData('join_platform', true)}
                                            className="w-4 h-4 text-pink-500"
                                        />
                                        <span className="text-pink-500">申請加入</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            checked={data.join_platform === false}
                                            onChange={() => setData('join_platform', false)}
                                            className="w-4 h-4 text-blue-500"
                                        />
                                        <span className="text-blue-500">不加入平台</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    平台分類
                                </label>
                                <select
                                    value={data.platform_category}
                                    onChange={(e) => setData('platform_category', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                >
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
                                <p className="text-xs text-gray-500 mt-1">
                                    選取 【優惠】 分類，也同時曝光在合作媒體上。但內容需要有優惠。
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Note */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            備註
                        </label>
                        <textarea
                            value={data.note}
                            onChange={(e) => setData('note', e.target.value)}
                            rows={3}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                            placeholder="請輸入備註..."
                        />
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                        <Link
                            href="/admin/column-articles"
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            取消返回
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FaSave /> {processing ? '儲存中...' : '儲存更新'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}