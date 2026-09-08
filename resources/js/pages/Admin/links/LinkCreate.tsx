import { Head, Link, useForm } from '@inertiajs/react';
import { 
    FaArrowLeft, FaSave, FaTimes, FaLink, 
    FaImage, FaHome, FaSort, FaTag, FaFileAlt,
    FaGlobe, FaCheck, FaUpload
} from 'react-icons/fa';
import { useState } from 'react';

export default function LinkCreate() {
    const { data, setData, post, processing, errors } = useForm({
        language: 'TS',
        status: true,
        show_on_home: false,
        show_on_sidebar: true,
        sort_order: 999,
        category: '',
        title: '',
        url: '',
        content: '',
        note: '',
        has_photo: false,
        img: '',
        img_w: 1024,
        img_h: 1024,
    });

    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setUploadProgress(0);

        const formData = new FormData();
        formData.append('image', file);

        try {
            const xhr = new XMLHttpRequest();
            
            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable) {
                    const progress = Math.round((e.loaded / e.total) * 100);
                    setUploadProgress(progress);
                }
            });

            xhr.addEventListener('load', () => {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    if (response.success) {
                        setData('img', response.path);
                        setData('img_w', response.width);
                        setData('img_h', response.height);
                        setData('has_photo', true);
                    }
                }
                setUploading(false);
                setUploadProgress(0);
            });

            xhr.addEventListener('error', () => {
                console.error('Upload failed');
                setUploading(false);
                setUploadProgress(0);
            });

            xhr.open('POST', '/admin/links/upload-image');
            xhr.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '');
            xhr.send(formData);
        } catch (error) {
            console.error('Upload error:', error);
            setUploading(false);
            setUploadProgress(0);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/links', {
            onSuccess: () => {
                window.location.href = '/admin/links';
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
            }
        });
    };

    return (
        <>
            <Head title="新增連結" />
            
            <div className="bg-white rounded-xl shadow-sm p-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Link 
                            href="/admin/links"
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <FaArrowLeft size={20} />
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <FaLink className="text-blue-500" /> 新增連結
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">建立新的相關連結</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/admin/links"
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                            <FaTimes /> 取消返回
                        </Link>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Settings */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                                    <FaGlobe className="inline mr-1" /> 顯示在兩側
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            checked={data.show_on_sidebar === true}
                                            onChange={() => setData('show_on_sidebar', true)}
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <span className="text-blue-600">是</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            checked={data.show_on_sidebar === false}
                                            onChange={() => setData('show_on_sidebar', false)}
                                            className="w-4 h-4 text-red-600"
                                        />
                                        <span className="text-red-600">否</span>
                                    </label>
                                </div>
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
                                    <FaTag className="inline mr-1" /> 分類
                                </label>
                                <select
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">選擇分類</option>
                                    <option value="899">本會相關</option>
                                    <option value="900">政府單位</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Title & URL */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    主題 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className={`w-full border rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 ${
                                        errors.title ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="請輸入主題"
                                    required
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    連結網址
                                </label>
                                <input
                                    type="text"
                                    value={data.url}
                                    onChange={(e) => setData('url', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="https://example.com"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            說明
                        </label>
                        <textarea
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            rows={6}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                            placeholder="請輸入說明內容..."
                        />
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

                    {/* Photo */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="flex items-center gap-2 cursor-pointer mb-3">
                            <input
                                type="checkbox"
                                checked={data.has_photo}
                                onChange={(e) => setData('has_photo', e.target.checked)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <FaImage className="text-gray-500" />
                            <span className="text-sm text-gray-700">有相片</span>
                        </label>
                        
                        {data.has_photo && (
                            <div className="space-y-4 mt-3">
                                {/* File Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        <FaUpload className="inline mr-1" /> 上傳圖片
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        disabled={uploading}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                                    />
                                    {uploading && (
                                        <div className="mt-2">
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div 
                                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${uploadProgress}%` }}
                                                ></div>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">上傳中... {uploadProgress}%</p>
                                        </div>
                                    )}
                                </div>

                                {/* Manual Image Path */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            圖片路徑
                                        </label>
                                        <input
                                            type="text"
                                            value={data.img}
                                            onChange={(e) => setData('img', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                            placeholder="/storage/images/links/image.png"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            圖片寬度
                                        </label>
                                        <input
                                            type="number"
                                            value={data.img_w}
                                            onChange={(e) => setData('img_w', parseInt(e.target.value) || 1024)}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                            placeholder="1024"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            圖片高度
                                        </label>
                                        <input
                                            type="number"
                                            value={data.img_h}
                                            onChange={(e) => setData('img_h', parseInt(e.target.value) || 1024)}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                            placeholder="1024"
                                        />
                                    </div>
                                </div>

                                {/* Image Preview */}
                                {data.img && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            圖片預覽
                                        </label>
                                        <img
                                            src={data.img}
                                            alt="Preview"
                                            className="max-w-xs h-auto border border-gray-300 rounded-lg"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Note */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <FaFileAlt className="inline mr-1" /> 備註
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
                            href="/admin/links"
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            取消返回
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                            <FaSave /> {processing ? '儲存中...' : '送出資料'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}