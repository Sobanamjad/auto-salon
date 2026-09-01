// resources/js/pages/Admin/slider/SliderForm.tsx
import { Head, Link, useForm } from '@inertiajs/react';
import { FaArrowLeft, FaSave, FaTimes, FaImage, FaUpload } from 'react-icons/fa';
import { useRef, useState, useEffect } from 'react';

interface Slider {
    id?: number;
    language: string;
    title: string;
    image: string;
    image_alt: string;
    link: string;
    sort_order: number;
    is_active: boolean;
    width: number;
    height: number;
    video_url: string;
    description: string;
}

interface Props {
    title?: string;
    slider: Slider | null;
}

export default function SliderForm({ title = '相片輪播', slider }: Props) {
    const isEdit = !!slider;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data, setData, post, put, processing, errors } = useForm<{
        language: string;
        title: string;
        image: File | null;
        image_alt: string;
        link: string;
        sort_order: number;
        is_active: boolean;
        width: number;
        height: number;
        video_url: string;
        description: string;
    }>({
        language: slider?.language || 'TS',
        title: slider?.title || '',
        image: null,
        image_alt: slider?.image_alt || '',
        link: slider?.link || '',
        sort_order: slider?.sort_order || 0,
        is_active: slider?.is_active ?? true,
        width: slider?.width || 1920,
        height: slider?.height || 700,
        video_url: slider?.video_url || '',
        description: slider?.description || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
                if (value instanceof File) {
                    formData.append(key, value);
                } else if (typeof value === 'boolean') {
                    formData.append(key, value ? '1' : '0');
                } else {
                    formData.append(key, String(value));
                }
            }
        });

        if (isEdit && slider?.id) {
            put(`/admin/slider/${slider.id}`, {
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' },
            });
        } else {
            post('/admin/slider', {
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' },
            });
        }
    };

    const languageOptions = [
        { value: 'TS', label: '繁中' },
        { value: 'EN', label: '英文' },
        { value: 'JP', label: '日文' },
    ];

    // Create preview URL when file is selected
    useEffect(() => {
        if (data.image instanceof File) {
            const url = URL.createObjectURL(data.image);
            setImagePreview(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setImagePreview(null);
        }
    }, [data.image]);

    return (
        <>
            <Head title={title} />
            
            <div className="bg-white rounded-xl shadow-sm p-6 text-gray-900">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Link 
                            href="/admin/slider"
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <FaArrowLeft size={20} />
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <FaImage className="text-blue-500" /> {title}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                {isEdit ? '編輯輪播圖片' : '新增輪播圖片'}
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Language */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                語系 <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={data.language}
                                onChange={(e) => setData('language', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            >
                                {languageOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                            {errors.language && (
                                <div className="text-red-500 text-xs mt-1">{errors.language}</div>
                            )}
                        </div>

                        {/* Sort Order */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                排序
                            </label>
                            <input
                                type="number"
                                value={data.sort_order}
                                onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.sort_order && (
                                <div className="text-red-500 text-xs mt-1">{errors.sort_order}</div>
                            )}
                        </div>

                        {/* Title */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                主題
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="例如: 輪撥1920*700"
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.title && (
                                <div className="text-red-500 text-xs mt-1">{errors.title}</div>
                            )}
                        </div>

                        {/* Image */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                相片 {!isEdit && <span className="text-red-500">*</span>}
                            </label>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        setData('image', e.target.files[0]);
                                    }
                                }}
                                className="hidden"
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full border-2 border-dashed border-gray-300 rounded-lg px-4 py-6 hover:border-blue-500 hover:bg-blue-50 transition-colors flex flex-col items-center gap-2"
                            >
                                <FaUpload size={24} className="text-gray-400" />
                                <span className="text-sm text-gray-600">
                                    {data.image ? data.image.name : '點擊選擇圖片'}
                                </span>
                                <span className="text-xs text-gray-400">支援格式: JPEG, PNG, GIF, SVG, WebP (最大 5MB)</span>
                            </button>
                            {errors.image && (
                                <div className="text-red-500 text-xs mt-1">{errors.image}</div>
                            )}
                            {/* Show preview when new file is selected */}
                            {imagePreview && (
                                <div className="mt-2">
                                    <img 
                                        src={imagePreview} 
                                        alt="Preview"
                                        className="h-40 w-auto object-cover rounded border"
                                    />
                                    <p className="text-xs text-gray-400 mt-1">預覽圖片</p>
                                </div>
                            )}
                            {/* Show existing image when editing */}
                            {isEdit && slider?.image && !imagePreview && (
                                <div className="mt-2">
                                    <img 
                                        src={slider.image_url} 
                                        alt={slider.image_alt || slider.title}
                                        className="h-20 w-auto object-cover rounded border"
                                    />
                                    <p className="text-xs text-gray-400 mt-1">目前圖片</p>
                                </div>
                            )}
                        </div>

                        {/* Image Alt */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                圖片替代文字
                            </label>
                            <input
                                type="text"
                                value={data.image_alt}
                                onChange={(e) => setData('image_alt', e.target.value)}
                                placeholder="SEO friendly description"
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.image_alt && (
                                <div className="text-red-500 text-xs mt-1">{errors.image_alt}</div>
                            )}
                        </div>

                        {/* Link */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                連結網址
                            </label>
                            <input
                                type="text"
                                value={data.link}
                                onChange={(e) => setData('link', e.target.value)}
                                placeholder="https://example.com"
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.link && (
                                <div className="text-red-500 text-xs mt-1">{errors.link}</div>
                            )}
                        </div>

                        {/* Video URL */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                影片網址
                            </label>
                            <input
                                type="text"
                                value={data.video_url}
                                onChange={(e) => setData('video_url', e.target.value)}
                                placeholder="https://www.youtube.com/watch?v=..."
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.video_url && (
                                <div className="text-red-500 text-xs mt-1">{errors.video_url}</div>
                            )}
                        </div>

                        {/* Width & Height */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                寬度
                            </label>
                            <input
                                type="number"
                                value={data.width}
                                onChange={(e) => setData('width', parseInt(e.target.value) || 1920)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.width && (
                                <div className="text-red-500 text-xs mt-1">{errors.width}</div>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                高度
                            </label>
                            <input
                                type="number"
                                value={data.height}
                                onChange={(e) => setData('height', parseInt(e.target.value) || 700)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.height && (
                                <div className="text-red-500 text-xs mt-1">{errors.height}</div>
                            )}
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                描述
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={2}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.description && (
                                <div className="text-red-500 text-xs mt-1">{errors.description}</div>
                            )}
                        </div>

                        {/* Active Status */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                狀態
                            </label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        value="1"
                                        checked={data.is_active === true}
                                        onChange={() => setData('is_active', true)}
                                        className="w-4 h-4 text-blue-600"
                                    />
                                    <span className="text-green-600">啟用</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        value="0"
                                        checked={data.is_active === false}
                                        onChange={() => setData('is_active', false)}
                                        className="w-4 h-4 text-blue-600"
                                    />
                                    <span className="text-red-600">停用</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-200">
                        <Link
                            href="/admin/slider"
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