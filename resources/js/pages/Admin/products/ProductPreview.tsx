import { Head, Link } from '@inertiajs/react';
import { FaArrowLeft, FaEdit, FaTag, FaHashtag, FaDollarSign, FaBox, FaCalendar, FaEye } from 'react-icons/fa';

interface Product {
    id: number;
    product_no: string | null;
    name: string;
    brief: string | null;
    content: string | null;
    img: string | null;
    img_w: number | null;
    img_h: number | null;
    video: string | null;
    price: string | null;
    currency: string | null;
    stock: number;
    category: string;
    published_date: string | null;
    end_date: string | null;
    status: boolean;
    show_on_home: boolean;
    views: number;
    note: string | null;
}

interface Props {
    product: Product;
    categoryLabel: string;
    title?: string;
}

export default function ProductPreview({ product, categoryLabel }: Props) {
    return (
        <>
            <Head title={`預覽 - ${product.name}`} />

            <div className="bg-white rounded-xl shadow-sm p-6 text-gray-900">
                {/* Header toolbar */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/admin/products"
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <FaArrowLeft size={20} />
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">商品預覽</h2>
                            <p className="text-sm text-gray-500 mt-1">#{product.id} — 僅限管理員查看</p>
                        </div>
                    </div>
                    <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm"
                    >
                        <FaEdit /> 前往編輯
                    </Link>
                </div>

                {/* Status badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${product.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                        {product.status ? '已發佈' : '未發佈'}
                    </span>
                    {product.show_on_home && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                            首頁顯示
                        </span>
                    )}
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 flex items-center gap-1">
                        <FaTag size={10} /> {categoryLabel || product.category}
                    </span>
                    {product.product_no && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 flex items-center gap-1">
                            <FaHashtag size={10} /> {product.product_no}
                        </span>
                    )}
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 flex items-center gap-1">
                        <FaEye size={10} /> {product.views} 次點閱
                    </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left — image + meta */}
                    <div className="lg:col-span-1 space-y-4">
                        {/* Product image */}
                        {product.img ? (
                            <div className="rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                                <img
                                    src={product.img}
                                    alt={product.name}
                                    width={product.img_w ?? undefined}
                                    height={product.img_h ?? undefined}
                                    className="w-full h-auto object-contain max-h-64"
                                />
                            </div>
                        ) : (
                            <div className="rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 h-48 flex items-center justify-center text-gray-400 text-sm">
                                尚無圖片
                            </div>
                        )}

                        {/* Meta info */}
                        <div className="bg-gray-50 rounded-lg p-4 space-y-3 text-sm">
                            {product.price && (
                                <div className="flex items-center gap-2">
                                    <FaDollarSign className="text-gray-400 shrink-0" />
                                    <span className="font-medium text-gray-700">價格：</span>
                                    <span className="text-green-600 font-bold">
                                        {product.currency === 'NT' ? 'NT$' : product.currency} {product.price}
                                    </span>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <FaBox className="text-gray-400 shrink-0" />
                                <span className="font-medium text-gray-700">庫存：</span>
                                <span className={product.stock > 0 ? 'text-blue-600' : 'text-red-500'}>
                                    {product.stock} 件
                                </span>
                            </div>
                            {product.published_date && (
                                <div className="flex items-center gap-2">
                                    <FaCalendar className="text-gray-400 shrink-0" />
                                    <span className="font-medium text-gray-700">發表日期：</span>
                                    <span className="text-gray-600">{product.published_date}</span>
                                </div>
                            )}
                            {product.end_date && (
                                <div className="flex items-center gap-2">
                                    <FaCalendar className="text-gray-400 shrink-0" />
                                    <span className="font-medium text-gray-700">截止日期：</span>
                                    <span className="text-gray-600">{product.end_date}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right — name, brief, content */}
                    <div className="lg:col-span-2 space-y-5">
                        {/* Product name */}
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 leading-tight">{product.name}</h1>
                        </div>

                        {/* Brief */}
                        {product.brief && (
                            <div className="border-l-4 border-blue-400 pl-4 py-1">
                                <p className="text-gray-600 leading-relaxed">{product.brief}</p>
                            </div>
                        )}

                        {/* Full HTML content */}
                        {product.content && (
                            <div className="border border-gray-100 rounded-lg p-4 bg-gray-50">
                                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">商品內容</p>
                                <div
                                    className="prose prose-sm max-w-none text-gray-700"
                                    dangerouslySetInnerHTML={{ __html: product.content }}
                                />
                            </div>
                        )}

                        {/* Video embed */}
                        {product.video && (
                            <div className="border border-gray-100 rounded-lg p-4 bg-gray-50">
                                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">影片</p>
                                <div
                                    className="aspect-video"
                                    dangerouslySetInnerHTML={{ __html: product.video }}
                                />
                            </div>
                        )}

                        {/* Note */}
                        {product.note && (
                            <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                                <p className="text-xs font-medium text-yellow-600 uppercase tracking-wide mb-2">備註</p>
                                <p className="text-sm text-yellow-800">{product.note}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom actions */}
                <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-200">
                    <Link
                        href="/admin/products"
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm flex items-center gap-2"
                    >
                        <FaArrowLeft size={12} /> 返回列表
                    </Link>
                    <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center gap-2"
                    >
                        <FaEdit size={12} /> 編輯此商品
                    </Link>
                </div>
            </div>
        </>
    );
}
