import { Head, Link } from '@inertiajs/react';
import { FaArrowLeft, FaBullhorn, FaCalendar, FaTag, FaEye, FaHome, FaEdit } from 'react-icons/fa';

interface NewsPreviewProps {
    news: {
        id: number;
        published_date: string;
        end_date: string;
        status: boolean;
        show_on_home: boolean;
        show_marquee: boolean;
        sort_order: number;
        category: string;
        subject: string;
        brief: string | null;
        content: string;
        keyword: string | null;
        video: string | null;
        map: string | null;
        note: string | null;
        views: number;
        created_at: string;
        updated_at: string;
    };
}

export default function NewsPreview({ news }: NewsPreviewProps) {
    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleString('zh-TW', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const categoryMap: { [key: string]: string } = {
        '3595': '最新公告',
        '3594': '會務活動'
    };

    return (
        <>
            <Head title="最新消息 - 預覽" />
            
            <div className="bg-white rounded-xl shadow-sm p-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Link 
                            href="/admin/news"
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <FaArrowLeft size={20} />
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <FaBullhorn className="text-blue-500" /> 最新消息 - 預覽
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">預覽消息內容</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href={`/admin/news/${news.id}/edit`}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                            <FaEdit /> 編輯
                        </Link>
                        <Link
                            href="/admin/news"
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                            返回列表
                        </Link>
                    </div>
                </div>

                {/* Preview Content */}
                <div className="space-y-6">
                    {/* Status Badges */}
                    <div className="flex flex-wrap gap-2">
                        {news.status && (
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                已發佈
                            </span>
                        )}
                        {!news.status && (
                            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                                未發佈
                            </span>
                        )}
                        {news.show_on_home && (
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-1">
                                <FaHome size={12} /> 首頁顯示
                            </span>
                        )}
                        {news.show_marquee && (
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm flex items-center gap-1">
                                <FaBullhorn size={12} /> 跑馬燈
                            </span>
                        )}
                    </div>

                    {/* Basic Info */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    <FaCalendar className="inline mr-1" /> 發表日期
                                </label>
                                <p className="text-gray-900">{formatDate(news.published_date)}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    <FaCalendar className="inline mr-1" /> 截止日期
                                </label>
                                <p className="text-gray-900">{news.end_date}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    <FaTag className="inline mr-1" /> 分類
                                </label>
                                <p className="text-gray-900">{categoryMap[news.category] || news.category}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    <FaEye className="inline mr-1" /> 瀏覽次數
                                </label>
                                <p className="text-gray-900">{news.views}</p>
                            </div>
                        </div>
                    </div>

                    {/* Subject */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{news.subject}</h1>
                        {news.brief && (
                            <p className="text-gray-600 text-lg">{news.brief}</p>
                        )}
                    </div>

                    {/* Content */}
                    <div className="prose max-w-none">
                        <div 
                            className="text-gray-900"
                            dangerouslySetInnerHTML={{ __html: news.content }}
                        />
                    </div>

                    {/* Keyword */}
                    {news.keyword && (
                        <div className="bg-blue-50 rounded-lg p-4">
                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                相關字
                            </label>
                            <p className="text-gray-900">{news.keyword}</p>
                        </div>
                    )}

                    {/* Video */}
                    {news.video && (
                        <div className="bg-purple-50 rounded-lg p-4">
                            <label className="block text-sm font-medium text-gray-500 mb-2">
                                影音
                            </label>
                            <div 
                                className="text-gray-900"
                                dangerouslySetInnerHTML={{ __html: news.video }}
                            />
                        </div>
                    )}

                    {/* Map */}
                    {news.map && (
                        <div className="bg-red-50 rounded-lg p-4">
                            <label className="block text-sm font-medium text-gray-500 mb-2">
                                Google Map
                            </label>
                            <div 
                                className="text-gray-900"
                                dangerouslySetInnerHTML={{ __html: news.map }}
                            />
                        </div>
                    )}

                    {/* Note */}
                    {news.note && (
                        <div className="bg-gray-100 rounded-lg p-4">
                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                備註
                            </label>
                            <p className="text-gray-900 whitespace-pre-wrap">{news.note}</p>
                        </div>
                    )}

                    {/* Timestamps */}
                    <div className="text-sm text-gray-500 border-t pt-4">
                        <p>建立時間: {formatDate(news.created_at)}</p>
                        <p>更新時間: {formatDate(news.updated_at)}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
