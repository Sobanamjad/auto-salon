import { Head, Link, useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import {
    FaArrowLeft, FaSave, FaTimes, FaGift,
    FaImage, FaVideo, FaHome, FaSort, FaCalendar,
    FaTag, FaBox, FaDollarSign, FaHashtag
} from 'react-icons/fa';

// Category options — CSN codes must match the public /product route filter
const CATEGORIES = [
    { value: '7519', label: '保養飾品' },
    { value: '7518', label: '居家用品' },
    { value: '7517', label: '吃吃喝喝' },
];

interface Product {
    id: number;
    language: string;
    status: boolean;
    show_on_home: boolean;
    sort_order: number;
    published_date: string;
    end_date: string;
    category: string;
    product_no: string;
    img: string | null;
    name: string;
    brief: string;
    content: string;
    video: string;
    note: string;
    has_photo: boolean;
    price: string;
    currency: string;
    stock: number;
}

interface Props {
    product: Product;
    title?: string;
}

export default function ProductEdit({ product }: Props) {
    const fileRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(product.img ?? null);

    const { data, setData, post, processing, errors } = useForm<{
        _method: string;
        language: string;
        status: boolean;
        show_on_home: boolean;
        sort_order: number;
        published_date: string;
        end_date: string;
        category: string;
        product_no: string;
        img: File | null;
        name: string;
        brief: string;
        content: string;
        video: string;
        note: string;
        has_photo: boolean;
        price: string;
        currency: string;
        stock: number;
    }>({
        _method: 'PUT',
        language: product.language ?? 'TS',
        status: product.status ?? true,
        show_on_home: product.show_on_home ?? false,
        sort_order: product.sort_order ?? 999,
        published_date: product.published_date ?? new Date().toISOString().split('T')[0],
        end_date: product.end_date ?? '2200-12-31',
        category: product.category ?? '7519',
        product_no: product.product_no ?? '',
        img: null,
        name: product.name ?? '',
        brief: product.brief ?? '',
        content: product.content ?? '',
        video: product.video ?? '',
        note: product.note ?? '',
        has_photo: product.has_photo ?? false,
        price: product.price ?? '',
        currency: product.currency ?? 'NT',
        stock: product.stock ?? 0,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setData('img', file);

        if (file) {
            setPreview(URL.createObjectURL(file));
        } else {
            // Revert to existing image
            setPreview(product.img ?? null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Use POST with _method=PUT for multipart form data (Laravel method spoofing)
        post(`/admin/products/${product.id}`, {
            forceFormData: true,
            onError: (errs) => console.error('Validation errors:', errs),
        });
    };

    return (
        <>
            <Head title="編輯商品" />

            <div className="bg-white rounded-xl shadow-sm p-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Link href="/admin/products" className="text-gray-500 hover:text-gray-700 transition-colors">
                            <FaArrowLeft size={20} />
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <FaGift className="text-blue-500" /> 編輯商品
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">修改商品資料 #{product.id}</p>
                        </div>
                    </div>
                    <Link
                        href="/admin/products"
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                        <FaTimes /> 取消返回
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">截止日期</label>
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
                                <select
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">選擇分類</option>
                                    {CATEGORIES.map(c => (
                                        <option key={c.value} value={c.value}>{c.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Product Number & Name */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaHashtag className="inline mr-1" /> 編號
                                </label>
                                <input
                                    type="text"
                                    value={data.product_no}
                                    onChange={(e) => setData('product_no', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="請輸入商品編號"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    品名 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className={`w-full border rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="請輸入品名"
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <FaImage className="inline mr-1 text-gray-500" /> 商品圖片
                        </label>
                        {preview && (
                            <div className="mb-3">
                                <p className="text-xs text-gray-500 mb-1">目前圖片：</p>
                                <img src={preview} alt="目前圖片" className="max-h-48 rounded-lg border border-gray-200 object-contain" />
                            </div>
                        )}
                        <input
                            ref={fileRef}
                            type="file"
                            accept="image/jpeg,image/png,image/gif,image/webp"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {errors.img && <p className="text-red-500 text-sm mt-1">{errors.img}</p>}
                        <p className="text-xs text-gray-400 mt-1">若不更換圖片請留空。支援 JPG / PNG / GIF / WEBP，最大 4MB</p>
                    </div>

                    {/* Brief */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">簡述</label>
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">內容</label>
                        <textarea
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            rows={10}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                            placeholder="請輸入詳細內容..."
                        />
                    </div>

                    {/* Video */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <FaVideo className="inline mr-1 text-purple-500" /> 影片
                        </label>
                        <textarea
                            value={data.video}
                            onChange={(e) => setData('video', e.target.value)}
                            rows={2}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                            placeholder="請輸入影片嵌入代碼..."
                        />
                    </div>

                    {/* Price & Stock */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaDollarSign className="inline mr-1" /> 價格
                                </label>
                                <input
                                    type="text"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="NT$399"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">貨幣</label>
                                <select
                                    value={data.currency}
                                    onChange={(e) => setData('currency', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="NT">NT$</option>
                                    <option value="USD">US$</option>
                                    <option value="RMB">RMB</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaBox className="inline mr-1" /> 庫存
                                </label>
                                <input
                                    type="number"
                                    value={data.stock}
                                    onChange={(e) => setData('stock', parseInt(e.target.value) || 0)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Note */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">備註</label>
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
                            href="/admin/products"
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            取消返回
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                            <FaSave /> {processing ? '儲存中...' : '儲存更新'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
