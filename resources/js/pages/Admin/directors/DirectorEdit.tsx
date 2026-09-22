import { Head, Link, useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import {
    FaArrowLeft, FaSave, FaTimes, FaUsers,
    FaImage, FaVideo, FaHome, FaSort, FaCalendar,
    FaTag, FaUser, FaUserTie, FaTimesCircle, FaTrash,
} from 'react-icons/fa';

interface Director {
    id: number;
    sn?: string;
    language: string;
    status: boolean;
    show_on_home: boolean;
    sort_order: number;
    published_date: string;
    end_date: string;
    category: string;
    title: string;
    name: string;
    brief: string | null;
    content: string | null;
    video: string | null;
    note: string | null;
    has_photo: boolean;
    img: string | null;
    img_w: number | null;
    img_h: number | null;
}

interface Props {
    director: Director;
    title: string;
}

export default function DirectorEdit({ director, title }: Props) {
    const { data, setData, post, processing, errors } = useForm<{
        _method: string;
        language: string;
        status: boolean;
        show_on_home: boolean;
        sort_order: number;
        published_date: string;
        end_date: string;
        category: string;
        title: string;
        name: string;
        brief: string;
        content: string;
        video: string;
        note: string;
        has_photo: boolean;
        image: File | null;
        remove_image: boolean;
    }>({
        _method: 'PUT',
        language: director.language || 'TS',
        status: director.status ?? true,
        show_on_home: director.show_on_home ?? false,
        sort_order: director.sort_order || 999,
        published_date: director.published_date || new Date().toISOString().split('T')[0],
        end_date: director.end_date || '2200-12-31',
        category: director.category || '',
        title: director.title || '',
        name: director.name || '',
        brief: director.brief || '',
        content: director.content || '',
        video: director.video || '',
        note: director.note || '',
        has_photo: director.has_photo || false,
        image: null,
        remove_image: false,
    });

    const fileInputRef = useRef<HTMLInputElement>(null);
    // Track a new file chosen by user for preview
    const [newPreviewUrl, setNewPreviewUrl] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setData('image', file);
        setData('remove_image', false);
        setData('has_photo', file !== null || (director.has_photo && !data.remove_image));
        if (file) {
            setNewPreviewUrl(URL.createObjectURL(file));
        } else {
            setNewPreviewUrl(null);
        }
    };

    const handleRemoveNewFile = () => {
        setData('image', null);
        setNewPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleRemoveExistingImage = () => {
        setData('remove_image', true);
        setData('has_photo', false);
    };

    const handleUndoRemove = () => {
        setData('remove_image', false);
        setData('has_photo', true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Use post with _method:PUT so multipart/form-data works
        post(`/admin/directors/${director.id}`, {
            forceFormData: true,
            onSuccess: () => {
                window.location.href = '/admin/directors';
            },
            onError: (errs) => {
                console.error('Validation errors:', errs);
            },
        });
    };

    // What image to show in the preview area
    const existingImg = director.img;
    const showExisting = existingImg && !data.remove_image && !newPreviewUrl;
    const showNew      = newPreviewUrl !== null;
    const showRemoved  = existingImg && data.remove_image && !newPreviewUrl;

    return (
        <>
            <Head title={title} />

            <div className="bg-white rounded-xl shadow-sm p-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/admin/directors"
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <FaArrowLeft size={20} />
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <FaUsers className="text-blue-500" /> {title}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">編輯理監事 #{director.id}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/admin/directors"
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                            <FaTimes /> 取消返回
                        </Link>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Date & Settings */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                                    <option value="現任會長">現任會長</option>
                                    <option value="理監事">理監事</option>
                                    <option value="會務幹部">會務幹部</option>
                                    <option value="會務顧問">會務顧問</option>
                                    <option value="歷屆會長">歷屆會長</option>
                                </select>
                                {errors.category && (
                                    <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    語言
                                </label>
                                <select
                                    value={data.language}
                                    onChange={(e) => setData('language', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="TS">繁體中文</option>
                                    <option value="EN">English</option>
                                    <option value="JP">日本語</option>
                                </select>
                                {errors.language && (
                                    <p className="text-red-500 text-sm mt-1">{errors.language}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Title & Name */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaUserTie className="inline mr-1" /> 職稱 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className={`w-full border rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 ${
                                        errors.title ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="請輸入職稱"
                                    required
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaUser className="inline mr-1" /> 姓名
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className={`w-full border rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 ${
                                        errors.name ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="請輸入姓名 (可留空)"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Brief */}
                    <div className="bg-gray-50 rounded-lg p-4">
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

                    {/* Content */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            內容
                        </label>
                        <textarea
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            rows={10}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                            placeholder="請輸入詳細內容..."
                        />
                        <p className="text-xs text-gray-500 mt-2">
                            <a
                                href="https://mypaper.52go.tw/17web/96/50461/"
                                target="_blank"
                                className="text-blue-600 hover:underline"
                            >
                                上傳圖片說明
                            </a>
                        </p>
                    </div>

                    {/* Photo Upload */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            <FaImage className="inline mr-1 text-green-500" /> 相片
                        </label>

                        <div className="flex items-start gap-4">
                            {/* Image preview area */}
                            <div className="shrink-0">
                                {showNew && (
                                    <div className="relative">
                                        <img
                                            src={newPreviewUrl!}
                                            alt="新圖預覽"
                                            className="w-32 h-40 object-cover rounded-lg border-2 border-blue-400"
                                        />
                                        <span className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-1 rounded">新圖</span>
                                        <button
                                            type="button"
                                            onClick={handleRemoveNewFile}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                                            title="取消新圖片"
                                        >
                                            <FaTimesCircle size={16} />
                                        </button>
                                    </div>
                                )}
                                {showExisting && (
                                    <div className="relative">
                                        <img
                                            src={existingImg!}
                                            alt="現有圖片"
                                            className="w-32 h-40 object-cover rounded-lg border border-gray-300"
                                        />
                                        <span className="absolute top-1 left-1 bg-gray-600 text-white text-xs px-1 rounded">現有</span>
                                        <button
                                            type="button"
                                            onClick={handleRemoveExistingImage}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                                            title="刪除現有圖片"
                                        >
                                            <FaTrash size={14} />
                                        </button>
                                    </div>
                                )}
                                {showRemoved && (
                                    <div className="w-32 h-40 border-2 border-dashed border-red-300 rounded-lg flex flex-col items-center justify-center text-red-400 gap-1">
                                        <FaTrash size={20} />
                                        <span className="text-xs">將刪除</span>
                                        <button
                                            type="button"
                                            onClick={handleUndoRemove}
                                            className="text-xs text-blue-600 hover:underline mt-1"
                                        >
                                            復原
                                        </button>
                                    </div>
                                )}
                                {!showNew && !showExisting && !showRemoved && (
                                    <div className="w-32 h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400">
                                        <FaImage size={24} />
                                    </div>
                                )}
                            </div>

                            {/* File input */}
                            <div className="flex-1">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/jpeg,image/png,image/jpg,image/gif"
                                    onChange={handleFileChange}
                                    className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                    選擇新圖片將取代現有圖片。支援 JPEG、PNG、GIF，最大 5MB。
                                </p>
                                {errors.image && (
                                    <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                                )}
                            </div>
                        </div>
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

                    {/* Submit */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                        <Link
                            href="/admin/directors"
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            取消返回
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                            <FaSave /> {processing ? '儲存中...' : '儲存更新'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
