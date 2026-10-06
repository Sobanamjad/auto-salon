import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { FaArrowLeft, FaSave, FaTimes, FaFileAlt, FaUpload } from 'react-icons/fa';

interface DownloadItem {
    id?: number;
    title: string;
    language: string;
    status: boolean;
    show_on_home: boolean;
    sort_order: number | string;
    published_date: string;
    end_date: string;
    category: string;
    brief: string;
    ext_url: string;
    note: string;
    file_path: string | null;
    file_name: string | null;
    file_type: string | null;
    file_size: number;
}

interface Props {
    title?: string;
    item: DownloadItem | null;
    categories: string[];
}

export default function DownloadForm({ title = '公文與表單', item, categories = [] }: Props) {
    const isEdit = !!item;
    const [newCategory, setNewCategory] = useState('');

    const { data, setData, post, processing, errors } = useForm<any>({
        title:          item?.title          ?? '',
        language:       item?.language       ?? 'TS',
        status:         item?.status         ?? true,
        show_on_home:   item?.show_on_home   ?? false,
        sort_order:     item?.sort_order     ?? 0,
        published_date: item?.published_date ?? new Date().toISOString().split('T')[0],
        end_date:       item?.end_date       ?? '2200-12-31',
        category:       item?.category       ?? '',
        brief:          item?.brief          ?? '',
        ext_url:        item?.ext_url        ?? '',
        note:           item?.note           ?? '',
        file:           null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit && item?.id) {
            post(`/admin/downloads/${item.id}`, { forceFormData: true, _method: 'PUT' } as any);
        } else {
            post('/admin/downloads', { forceFormData: true } as any);
        }
    };

    const categoryOptions = [...new Set([...categories, newCategory].filter(Boolean))];

    return (
        <>
            <Head title={title} />
            <div className="bg-white rounded-xl shadow-sm p-6 text-gray-900">
                <div className="flex items-center gap-3 border-b border-gray-200 pb-4 mb-6">
                    <Link href="/admin/downloads" className="text-gray-500 hover:text-gray-700">
                        <FaArrowLeft size={20} />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <FaFileAlt className="text-blue-500" /> {title}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">{isEdit ? '編輯資料' : '新增資料'}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">標題 <span className="text-red-500">*</span></label>
                        <input type="text" value={data.title} onChange={(e) => setData('title', e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" required />
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                    </div>

                    {/* Category + Language */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">分類</label>
                            <div className="flex gap-2">
                                <select value={data.category} onChange={(e) => setData('category', e.target.value)}
                                    className="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                                    <option value="">請選擇</option>
                                    {categoryOptions.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <input type="text" placeholder="或輸入新分類名稱" value={newCategory}
                                onChange={(e) => {
 setNewCategory(e.target.value); setData('category', e.target.value); 
}}
                                className="mt-1 w-full border rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">語言</label>
                            <select value={data.language} onChange={(e) => setData('language', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                                <option value="TS">繁體中文</option>
                                <option value="EN">English</option>
                                <option value="JP">日本語</option>
                            </select>
                        </div>
                    </div>

                    {/* Brief */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">說明</label>
                        <textarea value={data.brief} onChange={(e) => setData('brief', e.target.value)}
                            rows={2} className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" />
                    </div>

                    {/* File Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <FaUpload className="inline mr-1" /> 上傳檔案
                        </label>
                        <input type="file" onChange={(e) => setData('file', e.target.files?.[0] ?? null)}
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
                        {isEdit && item?.file_name && (
                            <p className="text-xs text-gray-500 mt-1">目前檔案：{item.file_name} ({item.file_type?.toUpperCase()})</p>
                        )}
                        {errors.file && <p className="text-red-500 text-xs mt-1">{errors.file}</p>}
                    </div>

                    {/* External URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">外部連結 (選填，無需上傳檔案時使用)</label>
                        <input type="url" value={data.ext_url} onChange={(e) => setData('ext_url', e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            placeholder="https://..." />
                        {errors.ext_url && <p className="text-red-500 text-xs mt-1">{errors.ext_url}</p>}
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">發佈日期</label>
                            <input type="date" value={data.published_date} onChange={(e) => setData('published_date', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">截止日期</label>
                            <input type="date" value={data.end_date} onChange={(e) => setData('end_date', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>

                    {/* Sort + Flags */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">排序</label>
                            <input type="number" min="0" value={data.sort_order} onChange={(e) => setData('sort_order', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="flex flex-col justify-center gap-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={data.status} onChange={(e) => setData('status', e.target.checked)} className="w-4 h-4" />
                                <span className="text-sm font-medium text-gray-700">發佈</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={data.show_on_home} onChange={(e) => setData('show_on_home', e.target.checked)} className="w-4 h-4" />
                                <span className="text-sm font-medium text-gray-700">顯示在首頁</span>
                            </label>
                        </div>
                    </div>

                    {/* Note */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">備註</label>
                        <input type="text" value={data.note} onChange={(e) => setData('note', e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" />
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-200">
                        <Link href="/admin/downloads" className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                            <FaTimes /> 取消返回
                        </Link>
                        <button type="submit" disabled={processing}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50">
                            <FaSave /> {processing ? '處理中...' : (isEdit ? '更新資料' : '送出資料')}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
