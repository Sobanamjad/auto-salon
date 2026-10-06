import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaFileAlt, FaSearch, FaToggleOn, FaToggleOff, FaDownload } from 'react-icons/fa';

interface DownloadItem {
    id: number;
    title: string;
    category: string | null;
    language: string;
    status: boolean;
    show_on_home: boolean;
    file_path: string | null;
    file_name: string | null;
    file_type: string | null;
    file_size: number;
    ext_url: string | null;
    brief: string | null;
    published_date: string | null;
    end_date: string | null;
    sort_order: number;
    views: number;
}

interface Props {
    title?: string;
    data: {
        data: DownloadItem[];
        current_page: number;
        last_page: number;
        total: number;
        per_page: number;
    };
    categories: string[];
}

const FILE_ICONS: Record<string, string> = {
    pdf: '📄', doc: '📝', docx: '📝', xls: '📊', xlsx: '📊',
    ppt: '📋', pptx: '📋', zip: '🗜️', rar: '🗜️', jpg: '🖼️',
    jpeg: '🖼️', png: '🖼️', mp4: '🎬', default: '📁',
};

function fileIcon(type: string | null): string {
    return FILE_ICONS[type?.toLowerCase() ?? ''] ?? FILE_ICONS.default;
}

function formatSize(bytes: number): string {
    if (bytes >= 1048576) {
return (bytes / 1048576).toFixed(1) + ' MB';
}

    if (bytes >= 1024)    {
return (bytes / 1024).toFixed(1) + ' KB';
}

    return bytes + ' B';
}

export default function DownloadList({ title = '公文與表單', data, categories = [] }: Props) {
    const [search, setSearch]     = useState('');
    const [category, setCategory] = useState('');

    const handleSearch = () => {
        router.get('/admin/downloads', { sel_title: search, sel_csn: category, this_page: 1 });
    };

    const handleReset = () => {
        setSearch(''); setCategory('');
        router.get('/admin/downloads', { this_page: 1 });
    };

    const handlePage = (page: number) => {
        router.get('/admin/downloads', { sel_title: search, sel_csn: category, this_page: page });
    };

    const handleDelete = (id: number, title: string) => {
        if (confirm(`確定要刪除「${title}」嗎？`)) {
router.delete(`/admin/downloads/${id}`);
}
    };

    const handleSort = (id: number, val: number) => {
        router.put(`/admin/downloads/${id}/sort`, { sort_order: val });
    };

    return (
        <>
            <Head title={title} />
            <div className="bg-white rounded-xl shadow-sm p-6 text-gray-900">
                {/* Header */}
                <div className="border-b border-gray-200 pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FaFileAlt className="text-blue-500" /> {title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">管理公文與表單下載</p>
                    <div className="text-sm text-gray-600 mt-2">總筆數：{data.total} 筆</div>
                </div>

                {/* Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Category */}
                        <select value={category} onChange={(e) => setCategory(e.target.value)}
                            className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
                            <option value="">全部分類</option>
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>

                        {/* Search */}
                        <div className="relative">
                            <input type="text" placeholder="標題搜尋..."
                                value={search} onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                className="border rounded-lg px-3 py-2 pl-9 text-sm w-40 focus:ring-2 focus:ring-blue-500" />
                            <FaSearch className="absolute left-3 top-3 text-gray-400" size={13} />
                        </div>
                        <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">查詢</button>
                        <button onClick={handleReset} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-400">全部</button>
                    </div>
                    <Link href="/admin/downloads/create"
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm">
                        <FaPlus /> 新增資料
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-10">No.</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-16">狀態</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-24">排序</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-20">分類</th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">標題</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-28">檔案</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-16">點閱</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-24">管理</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.data.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-3 py-8 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <FaFileAlt size={32} className="text-gray-300" />
                                            <p>暫無公文表單資料</p>
                                            <Link href="/admin/downloads/create" className="text-blue-600 hover:underline text-sm">點此新增</Link>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                data.data.map((item, index) => (
                                    <tr key={item.id} className={`hover:bg-gray-50 transition-colors ${!item.status ? 'opacity-60' : ''}`}>
                                        <td className="px-2 py-2 text-center text-sm">{(data.current_page - 1) * data.per_page + index + 1}.</td>
                                        <td className="px-2 py-2 text-center">
                                            <button onClick={() => router.get(`/admin/downloads/${item.id}/toggle-status`)}>
                                                {item.status
                                                    ? <FaToggleOn className="text-green-500 mx-auto" size={22} />
                                                    : <FaToggleOff className="text-gray-400 mx-auto" size={22} />
                                                }
                                            </button>
                                        </td>
                                        <td className="px-2 py-2 text-center">
                                            <div className="flex items-center justify-center gap-1">
                                                <input type="number" defaultValue={item.sort_order}
                                                    className="w-12 border rounded px-1 py-0.5 text-xs text-center" id={`sort_${item.id}`} />
                                                <button onClick={() => {
                                                    const el = document.getElementById(`sort_${item.id}`) as HTMLInputElement;
                                                    handleSort(item.id, parseInt(el.value) || 0);
                                                }} className="bg-blue-500 text-white px-1.5 py-0.5 rounded text-xs hover:bg-blue-600">更</button>
                                            </div>
                                        </td>
                                        <td className="px-2 py-2 text-center text-xs">{item.category || '-'}</td>
                                        <td className="px-2 py-2 text-sm">
                                            <div className="font-medium">{item.title}</div>
                                            {item.brief && <div className="text-xs text-gray-400 truncate max-w-xs">{item.brief}</div>}
                                        </td>
                                        <td className="px-2 py-2 text-center text-xs">
                                            {item.file_path ? (
                                                <a href={item.file_path} target="_blank" rel="noreferrer"
                                                    className="text-blue-600 hover:underline flex items-center justify-center gap-1">
                                                    <FaDownload size={11} />
                                                    <span>{fileIcon(item.file_type)} {item.file_type?.toUpperCase()}</span>
                                                </a>
                                            ) : item.ext_url ? (
                                                <a href={item.ext_url} target="_blank" rel="noreferrer"
                                                    className="text-green-600 hover:underline text-xs">🔗 連結</a>
                                            ) : (
                                                <span className="text-gray-300">無</span>
                                            )}
                                            {item.file_size > 0 && (
                                                <div className="text-gray-400 text-xs">{formatSize(item.file_size)}</div>
                                            )}
                                        </td>
                                        <td className="px-2 py-2 text-center text-sm">
                                            <div>{item.views}</div>
                                            <button onClick={() => router.get(`/admin/downloads/${item.id}/reset-views`)}
                                                className="text-red-400 hover:text-red-600 text-xs">清除</button>
                                        </td>
                                        <td className="px-2 py-2">
                                            <div className="flex flex-col items-center gap-0.5 text-xs">
                                                <Link href={`/admin/downloads/${item.id}/edit`}
                                                    className="text-blue-600 hover:text-blue-800 flex items-center gap-0.5">
                                                    <FaEdit size={12} /> 編輯
                                                </Link>
                                                <div className="border-t border-dashed border-gray-300 w-full" />
                                                <button onClick={() => handleDelete(item.id, item.title)}
                                                    className="text-red-600 hover:text-red-800 flex items-center gap-0.5">
                                                    <FaTrash size={12} /> 刪除
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                        <tfoot className="bg-gray-50">
                            <tr>
                                <td colSpan={8} className="px-3 py-2 text-center text-xs text-gray-500">
                                    {data.total > 0 ? `共 ${data.total} 筆 - 第 ${data.current_page} / ${data.last_page} 頁` : '沒有資料'}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Pagination */}
                {data.last_page > 1 && (
                    <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-gray-600">共 {data.total} 筆 - 第 {data.current_page} / {data.last_page} 頁</div>
                        <div className="flex gap-2">
                            <button onClick={() => handlePage(1)} disabled={data.current_page === 1} className="px-3 py-1 border rounded text-sm disabled:opacity-50">首頁</button>
                            <button onClick={() => handlePage(data.current_page - 1)} disabled={data.current_page === 1} className="px-3 py-1 border rounded text-sm disabled:opacity-50">‹</button>
                            <span className="px-3 py-1 border rounded text-sm bg-blue-600 text-white">{data.current_page}</span>
                            <button onClick={() => handlePage(data.current_page + 1)} disabled={data.current_page === data.last_page} className="px-3 py-1 border rounded text-sm disabled:opacity-50">›</button>
                            <button onClick={() => handlePage(data.last_page)} disabled={data.current_page === data.last_page} className="px-3 py-1 border rounded text-sm disabled:opacity-50">末頁</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
