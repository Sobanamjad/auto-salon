import { Head, Link, router } from '@inertiajs/react';
import { 
    FaArrowLeft, FaEye, FaMapMarkerAlt, FaTag, 
    FaCalendar, FaUser, FaNewspaper, FaExternalLinkAlt
} from 'react-icons/fa';

interface ClubNews {
    id: number;
    language: string;
    title: string;
    city: string;
    district: string;
    village: string;
    source: string;
    category: string;
    content: string;
    views: number;
    is_excluded: boolean;
    created_at: string;
    updated_at: string;
}

interface Props {
    news: ClubNews;
}

export default function ClubNewsDetail({ news }: Props) {
    return (
        <>
            <Head title={news.title} />
            
            <div className="bg-white rounded-xl shadow-sm p-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Link 
                            href="/admin/club-news"
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <FaArrowLeft size={20} />
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <FaNewspaper className="text-blue-500" /> 新聞詳情
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">查看社團新聞完整內容</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/admin/club-news"
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                            <FaArrowLeft /> 返回列表
                        </Link>
                    </div>
                </div>

                {/* News Detail */}
                <div className="space-y-6">
                    {/* Title */}
                    <div className="border-b border-gray-200 pb-4">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{news.title}</h1>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                                <FaCalendar /> {new Date(news.created_at).toLocaleDateString('zh-TW')}
                            </span>
                            <span className="flex items-center gap-1">
                                <FaEye /> {news.views} 次瀏覽
                            </span>
                            {news.language && (
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                                    {news.language}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Location Info */}
                    {(news.city || news.district || news.village) && (
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <FaMapMarkerAlt className="text-blue-500" /> 地區資訊
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                {news.city && (
                                    <div>
                                        <span className="text-gray-500">縣市：</span>
                                        <span className="text-gray-800">{news.city}</span>
                                    </div>
                                )}
                                {news.district && (
                                    <div>
                                        <span className="text-gray-500">區域：</span>
                                        <span className="text-gray-800">{news.district}</span>
                                    </div>
                                )}
                                {news.village && (
                                    <div>
                                        <span className="text-gray-500">村里：</span>
                                        <span className="text-gray-800">{news.village}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Source & Category */}
                    {(news.source || news.category) && (
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                {news.source && (
                                    <div>
                                        <span className="text-gray-500">來源：</span>
                                        <span className="text-gray-800">{news.source}</span>
                                    </div>
                                )}
                                {news.category && (
                                    <div>
                                        <span className="flex items-center gap-1 text-gray-500">
                                            <FaTag /> 分類：
                                        </span>
                                        <span className="text-gray-800">{news.category}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Content */}
                    {news.content && (
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">新聞內容</h3>
                            <div 
                                className="prose prose-sm max-w-none text-gray-700"
                                dangerouslySetInnerHTML={{ __html: news.content }}
                            />
                        </div>
                    )}

                    {/* Status */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-4 text-sm">
                            <span className="text-gray-500">狀態：</span>
                            {news.is_excluded ? (
                                <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full flex items-center gap-1">
                                    已排除
                                </span>
                            ) : (
                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full flex items-center gap-1">
                                    顯示中
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Timestamps */}
                    <div className="text-xs text-gray-400 border-t border-gray-200 pt-4">
                        <div>建立時間：{new Date(news.created_at).toLocaleString('zh-TW')}</div>
                        <div>更新時間：{new Date(news.updated_at).toLocaleString('zh-TW')}</div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200 mt-6">
                    <Link
                        href="/admin/club-news"
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                        <FaArrowLeft /> 返回列表
                    </Link>
                    <button
                        onClick={() => router.get(`/admin/club-news/${news.id}/toggle-exclude`)}
                        className={`px-6 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                            news.is_excluded 
                                ? 'bg-green-600 text-white hover:bg-green-700' 
                                : 'bg-orange-600 text-white hover:bg-orange-700'
                        }`}
                    >
                        {news.is_excluded ? '取消排除' : '排除此新聞'}
                    </button>
                </div>
            </div>
        </>
    );
}