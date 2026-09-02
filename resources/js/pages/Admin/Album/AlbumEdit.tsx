import { Head, Link, useForm } from '@inertiajs/react';
import { FaArrowLeft, FaSave, FaTimes, FaImage, FaFolder } from 'react-icons/fa';

interface AlbumFormData {
    title: string;
    description: string;
    cover_image: string;
    album_date: string;
    category: string;
    status: string;
    is_featured: boolean;
    sort_order: number;
}

interface Album {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    cover_image: string | null;
    album_date: string | null;
    category: string;
    status: string;
    is_featured: boolean;
    sort_order: number;
    views: number;
    photo_count: number;
    comment_count: number;
    created_at: string;
    updated_at: string;
}

export default function AlbumEdit({ album }: { album: Album }) {
    const { data, setData, put, processing, errors } = useForm<AlbumFormData>({
        title: album.title,
        description: album.description || '',
        cover_image: album.cover_image || '',
        album_date: album.album_date || '',
        category: album.category,
        status: album.status,
        is_featured: album.is_featured,
        sort_order: album.sort_order,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/albums/${album.id}`, {
            onSuccess: () => {
                window.location.href = '/admin/albums';
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
            }
        });
    };

    return (
        <>
            <Head title="編輯相簿" />
            
            <div className="bg-white rounded-xl shadow-sm p-6 text-gray-900">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Link 
                            href="/admin/albums"
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <FaArrowLeft size={20} />
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <FaImage className="text-blue-500" /> 編輯相簿
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">編輯相簿 #{id}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/admin/albums"
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                            <FaTimes /> 取消
                        </Link>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Settings Section */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaFolder className="text-blue-500" /> 設定
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    狀態
                                </label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="published">已發布</option>
                                    <option value="draft">草稿</option>
                                    <option value="archived">已封存</option>
                                </select>
                            </div>

                            {/* Is Featured */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    特色相簿
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            checked={data.is_featured === true}
                                            onChange={() => setData('is_featured', true)}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-blue-600">是</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            checked={data.is_featured === false}
                                            onChange={() => setData('is_featured', false)}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-gray-600">否</span>
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

                            {/* Album Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    相簿日期
                                </label>
                                <input
                                    type="date"
                                    value={data.album_date}
                                    onChange={(e) => setData('album_date', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Title & Category */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    相簿標題 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="請輸入相簿標題"
                                    required
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                                )}
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    分類 <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="活動花絮">活動花絮</option>
                                    <option value="會員活動">會員活動</option>
                                    <option value="年度活動">年度活動</option>
                                    <option value="其他">其他</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            說明
                        </label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows={4}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                            placeholder="請輸入相簿說明..."
                        />
                    </div>

                    {/* Cover Image */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            封面相片 URL
                        </label>
                        <input
                            type="text"
                            value={data.cover_image}
                            onChange={(e) => setData('cover_image', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                            placeholder="請輸入圖片URL"
                        />
                        {data.cover_image && (
                            <div className="mt-2">
                                <p className="text-sm text-gray-600 mb-1">預覽:</p>
                                <img 
                                    src={data.cover_image} 
                                    alt="預覽" 
                                    className="h-32 w-32 object-cover rounded border"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                        <Link
                            href="/admin/albums"
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            取消返回
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FaSave /> {processing ? '儲存中...' : '送出資料'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}