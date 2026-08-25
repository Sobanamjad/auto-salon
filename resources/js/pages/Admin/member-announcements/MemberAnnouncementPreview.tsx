import { Head, Link } from '@inertiajs/react';
import { FaArrowLeft, FaBullhorn, FaCalendar, FaUser, FaEye, FaEdit, FaImage, FaPaperclip } from 'react-icons/fa';

interface AnnouncementPreviewProps {
    announcement: {
        id: number;
        language: string;
        status: boolean;
        sort_order: number;
        published_date: string;
        end_date: string;
        subject: string;
        content: string;
        target_audience: string;
        has_attachment: boolean;
        has_photo: boolean;
        views: number;
        note: string;
        created_at: string;
        updated_at: string;
    };
}

export default function MemberAnnouncementPreview({ announcement }: AnnouncementPreviewProps) {
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

    const languageMap: { [key: string]: string } = {
        'TS': '繁體中文',
        'EN': 'English',
        'JP': '日本語'
    };

    return (
        <>
            <Head title="會員公告 - 預覽" />
            
            <div className="bg-white rounded-xl shadow-sm p-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Link 
                            href="/admin/member-announcements"
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <FaArrowLeft size={20} />
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <FaBullhorn className="text-blue-500" /> 會員公告 - 預覽
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">預覽會員公告內容 (僅會員可看)</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href={`/admin/member-announcements/${announcement.id}/edit`}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                            <FaEdit /> 編輯
                        </Link>
                        <Link
                            href="/admin/member-announcements"
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
                        {announcement.status && (
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                已發佈
                            </span>
                        )}
                        {!announcement.status && (
                            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                                未發佈
                            </span>
                        )}
                        {announcement.has_attachment && (
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-1">
                                <FaPaperclip size={12} /> 有附件
                            </span>
                        )}
                        {announcement.has_photo && (
                            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center gap-1">
                                <FaImage size={12} /> 有相片
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
                                <p className="text-gray-900">{formatDate(announcement.published_date)}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    <FaCalendar className="inline mr-1" /> 截止日期
                                </label>
                                <p className="text-gray-900">{announcement.end_date}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    語言
                                </label>
                                <p className="text-gray-900">{languageMap[announcement.language] || announcement.language}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    排序
                                </label>
                                <p className="text-gray-900">{announcement.sort_order}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    <FaUser className="inline mr-1" /> 可閱讀者
                                </label>
                                <p className="text-gray-900">{announcement.target_audience || '全部會員'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    <FaEye className="inline mr-1" /> 瀏覽次數
                                </label>
                                <p className="text-gray-900">{announcement.views}</p>
                            </div>
                        </div>
                    </div>

                    {/* Subject */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{announcement.subject}</h1>
                    </div>

                    {/* Content */}
                    <div className="prose max-w-none">
                        <div 
                            className="text-gray-900"
                            dangerouslySetInnerHTML={{ __html: announcement.content }}
                        />
                    </div>

                    {/* Note */}
                    {announcement.note && (
                        <div className="bg-gray-100 rounded-lg p-4">
                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                備註
                            </label>
                            <p className="text-gray-900 whitespace-pre-wrap">{announcement.note}</p>
                        </div>
                    )}

                    {/* Timestamps */}
                    <div className="text-sm text-gray-500 border-t pt-4">
                        <p>建立時間: {formatDate(announcement.created_at)}</p>
                        <p>更新時間: {formatDate(announcement.updated_at)}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
