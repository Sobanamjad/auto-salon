import { Head, Link, useForm } from '@inertiajs/react';
import { FaArrowLeft, FaSave, FaTimes, FaBullhorn, FaImage, FaPaperclip, FaCalendar, FaSort, FaUpload, FaLink, FaTag, FaUser } from 'react-icons/fa';
import { useState } from 'react';

interface Announcement {
    id: number;
    language: string;
    status: boolean;
    sort_order: number;
    published_date: string;
    end_date: string;
    category: string | null;
    subject: string;
    content: string;
    target_audience: string;
    has_attachment: boolean;
    has_photo: boolean;
    photo: string | null;
    photo_w: number | null;
    photo_h: number | null;
    external_link: string | null;
    event_status: string | null;
    note: string;
}

interface Props {
    announcement: Announcement;
    title: string;
}

export default function MemberAnnouncementEdit({ announcement, title }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        language: announcement.language || 'TS',
        status: announcement.status ?? true,
        sort_order: announcement.sort_order || 999,
        published_date: announcement.published_date || '',
        end_date: announcement.end_date || '2200-12-31',
        category: announcement.category || '',
        subject: announcement.subject || '',
        content: announcement.content || '',
        target_audience: announcement.target_audience || '',
        has_attachment: announcement.has_attachment || false,
        has_photo: announcement.has_photo || false,
        photo: announcement.photo || '',
        photo_w: announcement.photo_w || 1024,
        photo_h: announcement.photo_h || 1024,
        external_link: announcement.external_link || '',
        event_status: announcement.event_status || '報名期間',
        note: announcement.note || '',
    });

    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

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
                        setData('photo', response.path);
                        setData('photo_w', response.width);
                        setData('photo_h', response.height);
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

            xhr.open('POST', '/admin/member-announcements/upload-image');
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
        put(`/admin/member-announcements/${announcement.id}`, {
            onSuccess: () => {
                window.location.href = '/admin/member-announcements';
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
                            href="/admin/member-announcements"
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <FaArrowLeft size={20} />
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <FaBullhorn className="text-blue-500" /> {title}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">編輯會員公告 #{announcement.id}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/admin/member-announcements"
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                            <FaTimes /> 取消返回
                        </Link>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Date & Status */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        </div>
                    </div>

                    {/* Subject & Target Audience */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaTag className="inline mr-1 text-purple-500" /> 分類
                                </label>
                                <select
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">選擇分類</option>
                                    <option value="733">本會活動</option>
                                    <option value="1">總會活動</option>
                                    <option value="2">好友的活動</option>
                                    <option value="3">行事曆</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaUser className="inline mr-1 text-green-500" /> 特定對象
                                </label>
                                <select
                                    value={data.target_audience}
                                    onChange={(e) => setData('target_audience', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">全部會員可查看</option>
                                    <option value="一般會員">一般會員</option>
                                    <option value="理監事">理監事</option>
                                    <option value="幹部">幹部</option>
                                </select>
                                <p className="text-xs text-gray-500 mt-1">其他限制會員分類2可看</p>
                            </div>
                            <div>
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
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaLink className="inline mr-1 text-blue-500" /> 外部連結
                                </label>
                                <input
                                    type="text"
                                    value={data.external_link}
                                    onChange={(e) => setData('external_link', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="https://gudate.com/..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            內容 <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            rows={10}
                            className={`w-full border rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 ${
                                errors.content ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="請輸入詳細內容..."
                            required
                        />
                        {errors.content && (
                            <p className="text-red-500 text-sm mt-1">{errors.content}</p>
                        )}
                    </div>

                    {/* Attachments */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.has_attachment}
                                    onChange={(e) => setData('has_attachment', e.target.checked)}
                                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                />
                                <FaPaperclip className="text-gray-500" />
                                <span className="text-sm text-gray-700">有附件</span>
                            </label>
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
                                            value={data.photo}
                                            onChange={(e) => setData('photo', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                            placeholder="/storage/images/announcements/image.png"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            圖片寬度
                                        </label>
                                        <input
                                            type="number"
                                            value={data.photo_w}
                                            onChange={(e) => setData('photo_w', parseInt(e.target.value) || 1024)}
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
                                            value={data.photo_h}
                                            onChange={(e) => setData('photo_h', parseInt(e.target.value) || 1024)}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                            placeholder="1024"
                                        />
                                    </div>
                                </div>

                                {/* Image Preview */}
                                {data.photo && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            圖片預覽
                                        </label>
                                        <img
                                            src={data.photo}
                                            alt="預覽"
                                            className="max-w-full h-auto rounded-lg border border-gray-300"
                                            style={{ maxHeight: '300px' }}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Event Status */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            活動狀態
                        </label>
                        <select
                            value={data.event_status}
                            onChange={(e) => setData('event_status', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="報名期間">報名期間</option>
                            <option value="即將開始">即將開始</option>
                            <option value="進行中">進行中</option>
                            <option value="活動結束">活動結束</option>
                        </select>
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
                            href="/admin/member-announcements"
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