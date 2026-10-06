import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { FaTrash, FaCheck, FaTimes, FaSearch, FaComments, FaThumbsUp, FaThumbsDown, FaThumbtack } from 'react-icons/fa';

interface CommentItem {
    id: number;
    album_id: number;
    commenter_name: string;
    commenter_email: string | null;
    content: string;
    status: 'pending' | 'approved' | 'rejected';
    is_pinned: boolean;
    ip_address: string | null;
    created_at: string;
    album?: { id: number; title: string };
}

interface StatusInfo { label: string; color: string; }

interface Props {
    title?: string;
    data: {
        data: CommentItem[];
        current_page: number;
        last_page: number;
        total: number;
        per_page: number;
    };
    albums: { id: number; title: string }[];
    statuses: Record<string, StatusInfo>;
    stats: { total: number; pending: number; approved: number; rejected: number };
    filters: { selStatus?: string; selAlbum?: string; selSearch?: string };
}

export default function AlbumCommentList({ title = '相片留言', data, albums = [], statuses = {}, stats, filters = {} }: Props) {
    const [status, setStatus]   = useState(filters.selStatus  ?? '');
    const [album, setAlbum]     = useState(filters.selAlbum   ?? '');
    const [search, setSearch]   = useState(filters.selSearch  ?? '');
    const [selected, setSelected] = useState<number[]>([]);

    const handleSearch = () => {
        router.get('/admin/album-comments', { sel_status: status, sel_album: album, sel_title: search, this_page: 1 });
    };

    const handleReset = () => {
        setStatus(''); setAlbum(''); setSearch('');
        router.get('/admin/album-comments', { this_page: 1 });
    };

    const handlePage = (page: number) => {
        router.get('/admin/album-comments', { sel_status: status, sel_album: album, sel_title: search, this_page: page });
    };

    const handleDelete = (id: number, name: string) => {
        if (confirm(`確定要刪除 ${name} 的留言嗎？`)) router.delete(`/admin/album-comments/${id}`);
    };

    const toggleSelect = (id: number) => {
        setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const toggleAll = () => {
        setSelected(prev => prev.length === data.data.length ? [] : data.data.map(c => c.id));
    };

    const handleBulk = (action: 'approve' | 'reject' | 'delete') => {
        if (selected.length === 0) return;
        if (action === 'delete' && !confirm(`確定要刪除 ${selected.length} 筆留言嗎？`)) return;
        router.post(`/admin/album-comments/bulk-${action}`, { ids: selected });
        setSelected([]);
    };

    return (
        <>
            <Head title={title} />
            <div className="bg-white rounded-xl shadow-sm p-6 text-gray-900">
                {/* Header */}
                <div className="border-b border-gray-200 pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FaComments className="text-blue-500" /> {title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">管理相片留言</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                    {[
                        { label: '全部', count: stats.total, color: 'bg-gray-50', textColor: 'text-gray-700', filter: '' },
                        { label: '待審核', count: stats.pending, color: 'bg-yellow-50', textColor: 'text-yellow-600', filter: 'pending' },
                        { label: '已通過', count: stats.approved, color: 'bg-green-50', textColor: 'text-green-600', filter: 'approved' },
                        { label: '已拒絕', count: stats.rejected, color: 'bg-red-50', textColor: 'text-red-600', filter: 'rejected' },
                    ].map(s => (
                        <button key={s.label} onClick={() => { setStatus(s.filter); router.get('/admin/album-comments', { sel_status: s.filter }); }}
                            className={`${s.color} rounded-lg p-3 text-center cursor-pointer hover:opacity-80 transition`}>
                            <div className={`text-2xl font-bold ${s.textColor}`}>{s.count}</div>
                            <div className="text-xs text-gray-500">{s.label}</div>
                        </button>
                    ))}
                </div>

                {/* Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Status */}
                        <select value={status} onChange={(e) => setStatus(e.target.value)}
                            className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
                            <option value="">全部狀態</option>
                            {Object.entries(statuses).map(([key, val]) => (
                                <option key={key} value={key}>{val.label}</option>
                            ))}
                        </select>

                        {/* Album */}
                        <select value={album} onChange={(e) => setAlbum(e.target.value)}
                            className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
                            <option value="">全部相簿</option>
                            {albums.map(a => <option key={a.id} value={a.id}>{a.title}</option>)}
                        </select>

                        {/* Search */}
                        <div className="relative">
                            <input type="text" placeholder="姓名/內容..." value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                className="border rounded-lg px-3 py-2 pl-9 text-sm w-36 focus:ring-2 focus:ring-blue-500" />
                            <FaSearch className="absolute left-3 top-3 text-gray-400" size={13} />
                        </div>
                        <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">查詢</button>
                        <button onClick={handleReset} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-400">全部</button>
                    </div>

                    {/* Bulk Actions */}
                    {selected.length > 0 && (
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">已選 {selected.length} 筆</span>
                            <button onClick={() => handleBulk('approve')} className="bg-green-600 text-white px-3 py-1.5 rounded text-sm hover:bg-green-700 flex items-center gap-1">
                                <FaThumbsUp size={11} /> 批次通過
                            </button>
                            <button onClick={() => handleBulk('reject')} className="bg-orange-500 text-white px-3 py-1.5 rounded text-sm hover:bg-orange-600 flex items-center gap-1">
                                <FaThumbsDown size={11} /> 批次拒絕
                            </button>
                            <button onClick={() => handleBulk('delete')} className="bg-red-600 text-white px-3 py-1.5 rounded text-sm hover:bg-red-700 flex items-center gap-1">
                                <FaTrash size={11} /> 批次刪除
                            </button>
                        </div>
                    )}
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-2 py-2 w-8">
                                    <input type="checkbox" checked={selected.length === data.data.length && data.data.length > 0}
                                        onChange={toggleAll} className="w-4 h-4" />
                                </th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-16">狀態</th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-28">留言者</th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-32">相簿</th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">內容</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-28">時間</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-28">管理</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.data.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-3 py-8 text-center text-gray-500">
                                        <FaComments size={32} className="text-gray-300 mx-auto mb-2" />
                                        <p>暫無留言資料</p>
                                    </td>
                                </tr>
                            ) : (
                                data.data.map((item) => {
                                    const st = statuses[item.status] ?? { label: item.status, color: 'bg-gray-100 text-gray-600' };
                                    return (
                                        <tr key={item.id} className={`hover:bg-gray-50 transition-colors ${item.is_pinned ? 'bg-yellow-50' : ''}`}>
                                            <td className="px-2 py-2 text-center">
                                                <input type="checkbox" checked={selected.includes(item.id)}
                                                    onChange={() => toggleSelect(item.id)} className="w-4 h-4" />
                                            </td>
                                            <td className="px-2 py-2 text-center">
                                                <span className={`px-2 py-0.5 rounded text-xs font-medium ${st.color}`}>{st.label}</span>
                                                {item.is_pinned && <div className="text-yellow-500 text-xs mt-0.5">📌 置頂</div>}
                                            </td>
                                            <td className="px-2 py-2 text-sm">
                                                <div className="font-medium">{item.commenter_name}</div>
                                                {item.commenter_email && <div className="text-xs text-gray-400">{item.commenter_email}</div>}
                                                {item.ip_address && <div className="text-xs text-gray-300">{item.ip_address}</div>}
                                            </td>
                                            <td className="px-2 py-2 text-xs">
                                                {item.album ? (
                                                    <Link href={`/admin/albums/${item.album.id}/edit`} className="text-blue-600 hover:underline">
                                                        {item.album.title}
                                                    </Link>
                                                ) : '-'}
                                            </td>
                                            <td className="px-2 py-2 text-sm">
                                                <p className="line-clamp-2">{item.content}</p>
                                            </td>
                                            <td className="px-2 py-2 text-center text-xs text-gray-500">
                                                {item.created_at ? new Date(item.created_at).toLocaleDateString() : '-'}
                                            </td>
                                            <td className="px-2 py-2">
                                                <div className="flex flex-col items-center gap-0.5 text-xs">
                                                    {item.status === 'pending' && (
                                                        <>
                                                            <button onClick={() => router.get(`/admin/album-comments/${item.id}/approve`)}
                                                                className="text-green-600 hover:text-green-800 flex items-center gap-0.5">
                                                                <FaCheck size={11} /> 通過
                                                            </button>
                                                            <div className="border-t border-dashed border-gray-300 w-full" />
                                                            <button onClick={() => router.get(`/admin/album-comments/${item.id}/reject`)}
                                                                className="text-orange-500 hover:text-orange-700 flex items-center gap-0.5">
                                                                <FaTimes size={11} /> 拒絕
                                                            </button>
                                                            <div className="border-t border-dashed border-gray-300 w-full" />
                                                        </>
                                                    )}
                                                    <button onClick={() => router.get(`/admin/album-comments/${item.id}/toggle-pinned`)}
                                                        className={`flex items-center gap-0.5 ${item.is_pinned ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-600`}>
                                                        <FaThumbtack size={11} /> {item.is_pinned ? '取消置頂' : '置頂'}
                                                    </button>
                                                    <div className="border-t border-dashed border-gray-300 w-full" />
                                                    <button onClick={() => handleDelete(item.id, item.commenter_name)}
                                                        className="text-red-600 hover:text-red-800 flex items-center gap-0.5">
                                                        <FaTrash size={11} /> 刪除
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                        <tfoot className="bg-gray-50">
                            <tr>
                                <td colSpan={7} className="px-3 py-2 text-center text-xs text-gray-500">
                                    {data.total > 0 ? `共 ${data.total} 筆 - 第 ${data.current_page} / ${data.last_page} 頁` : '沒有資料'}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Pagination */}
                {data.last_page > 1 && (
                    <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-gray-600">共 {data.total} 筆</div>
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
