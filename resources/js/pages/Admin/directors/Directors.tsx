import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { 
    FaSearch, FaPlus, FaEdit, FaTrash, FaEye, 
    FaImage, FaSort, FaHome, FaChevronLeft, 
    FaChevronRight, FaUsers, FaCopy, FaShare
} from 'react-icons/fa';

interface Director {
    id: number;
    title: string;
    name: string;
    language: string;
    views: number;
    sort_order: number;
    has_photo: boolean;
    show_on_home: boolean;
    status: boolean;
    published_date: string;
    end_date: string;
    created_at: string;
    updated_at: string;
    category: string;
}

interface Props {
    directors: Director[];
    title?: string;
}

export default function Directors({ directors = [], title = '理監事(組織)' }: Props) {
    const [searchTitle, setSearchTitle] = useState('');
    const [searchCategory, setSearchCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const categories = [...new Set(directors.map(item => item.category).filter(Boolean))];

    const filteredItems = directors.filter(item => {
        const matchTitle = item.title.toLowerCase().includes(searchTitle.toLowerCase()) ||
                           item.name.toLowerCase().includes(searchTitle.toLowerCase());
        const matchCategory = searchCategory === '' || item.category === searchCategory;
        return matchTitle && matchCategory;
    });

    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleDelete = (id: number, name: string) => {
        if (confirm(`確定要刪除: ${name} 嗎？`)) {
            router.delete(`/admin/directors/${id}`);
        }
    };

    const handleToggleHome = (id: number) => {
        router.get(`/admin/directors/${id}/toggle-home`);
    };

    const handleResetViews = (id: number, name: string) => {
        if (confirm(`確定要清除: ${name} 點閱人紀錄嗎？`)) {
            router.get(`/admin/directors/${id}/reset-views`);
        }
    };

    const handleSortUpdate = (id: number, sortOrder: number) => {
        router.put(`/admin/directors/${id}/sort`, { sort_order: sortOrder });
    };

    const handleCopy = (id: number, name: string) => {
        if (confirm(`確定要複製: ${name} 嗎？`)) {
            router.get(`/admin/directors/${id}/copy`);
        }
    };

    return (
        <>
            <Head title={title} />
            
            <div className="bg-white rounded-xl shadow-sm p-6 text-gray-900">
                {/* Header */}
                <div className="border-b border-gray-200 pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FaUsers className="text-blue-500" /> {title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">管理所有理監事及組織成員</p>
                </div>

                {/* Tools Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="職稱/姓名..."
                                value={searchTitle}
                                onChange={(e) => setSearchTitle(e.target.value)}
                                className="border rounded-lg px-3 py-2 pl-9 text-sm w-48 focus:ring-2 focus:ring-blue-500"
                            />
                            <FaSearch className="absolute left-3 top-3 text-gray-400" size={14} />
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                            查詢
                        </button>

                        <select
                            value={searchCategory}
                            onChange={(e) => setSearchCategory(e.target.value)}
                            className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">全部分類</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <Link
                        href="/admin/directors/create"
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm"
                    >
                        <FaPlus /> 新增資料
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-10">No</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-16">首頁</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-28">排序</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-24">發佈者</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-24">分類</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">職稱 / 姓名</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-20">相片</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-16">點閱數</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-20">推廣</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-28">管理</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentItems.length === 0 ? (
                                <tr>
                                    <td colSpan={10} className="px-3 py-8 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <FaUsers size={32} className="text-gray-300" />
                                            <p>暫無理監事資料</p>
                                            <Link
                                                href="/admin/directors/create"
                                                className="text-blue-600 hover:underline text-sm"
                                            >
                                                點此新增
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                currentItems.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-3 py-2 text-center text-sm">
                                            {(currentPage - 1) * itemsPerPage + index + 1}.
                                        </td>
                                        <td className="px-3 py-2 text-center">
                                            <button onClick={() => handleToggleHome(item.id)}>
                                                {item.show_on_home ? (
                                                    <FaHome className="text-blue-500 mx-auto" title="顯示在首頁" />
                                                ) : (
                                                    <FaHome className="text-gray-300 mx-auto" title="不顯示在首頁" />
                                                )}
                                            </button>
                                        </td>
                                        <td className="px-3 py-2">
                                            <div className="text-center text-xs text-gray-500">{item.language || '繁中'}</div>
                                            <div className="border-t border-dashed border-gray-300 my-1"></div>
                                            <div className="flex items-center justify-center gap-1">
                                                <input
                                                    type="number"
                                                    defaultValue={item.sort_order || 999}
                                                    className="w-12 border rounded px-1 py-0.5 text-xs text-center"
                                                    id={`sort_${item.id}`}
                                                />
                                                <button 
                                                    onClick={() => {
                                                        const input = document.getElementById(`sort_${item.id}`) as HTMLInputElement;
                                                        handleSortUpdate(item.id, parseInt(input.value) || 999);
                                                    }}
                                                    className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs hover:bg-blue-600"
                                                >
                                                    更新
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-3 py-2 text-center text-xs">
                                            社團達人
                                        </td>
                                        <td className="px-3 py-2 text-center text-sm">
                                            {item.category || '-'}
                                        </td>
                                        <td className="px-3 py-2">
                                            <Link
                                                href={`/admin/directors/${item.id}/edit`}
                                                className="text-blue-600 hover:underline text-sm"
                                            >
                                                <div className="font-medium">{item.title}</div>
                                                <div className="text-gray-600">{item.name}</div>
                                            </Link>
                                        </td>
                                        <td className="px-3 py-2 text-center">
                                            {item.has_photo ? (
                                                <FaImage className="text-green-500 mx-auto" title="有相片" />
                                            ) : (
                                                <span className="text-gray-300 text-xs">無</span>
                                            )}
                                        </td>
                                        <td className="px-3 py-2 text-center">
                                            <span className="font-bold">{item.views || 0}</span>
                                            <button
                                                onClick={() => handleResetViews(item.id, `${item.title} ${item.name}`)}
                                                className="text-red-500 hover:text-red-700 text-xs block"
                                            >
                                                清除
                                            </button>
                                        </td>
                                        <td className="px-3 py-2 text-center">
                                            <Link
                                                href={`/admin/directors/${item.id}/promote`}
                                                className="text-green-600 hover:text-green-800 text-sm flex items-center justify-center gap-1"
                                            >
                                                <FaShare size={14} /> 推廣
                                            </Link>
                                        </td>
                                        <td className="px-3 py-2">
                                            <div className="flex flex-col items-center gap-1 text-sm">
                                                <Link
                                                    href={`/admin/directors/${item.id}/edit`}
                                                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                                >
                                                    <FaEdit size={14} /> 編輯
                                                </Link>
                                                <div className="border-t border-dashed border-gray-300 w-full"></div>
                                                <button
                                                    onClick={() => handleCopy(item.id, `${item.title} ${item.name}`)}
                                                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                                >
                                                    <FaCopy size={14} /> 複製
                                                </button>
                                                <div className="border-t border-dashed border-gray-300 w-full"></div>
                                                <button
                                                    onClick={() => handleDelete(item.id, `${item.title} ${item.name}`)}
                                                    className="text-red-600 hover:text-red-800 flex items-center gap-1"
                                                >
                                                    <FaTrash size={14} /> 刪除
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                        <tfoot className="bg-gray-50">
                            <tr>
                                <td colSpan={10} className="px-3 py-2 text-center text-xs text-gray-500">
                                    {filteredItems.length > 0 ? (
                                        `共 ${filteredItems.length} 筆 - 在 ${currentPage} 頁 - 共 ${totalPages} 頁`
                                    ) : (
                                        '沒有資料'
                                    )}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-gray-600">
                            共 {filteredItems.length} 筆 - 在 {currentPage} 頁 - 共 {totalPages} 頁
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage(1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1 border rounded text-sm hover:bg-gray-50 disabled:opacity-50"
                            >
                                首頁
                            </button>
                            <button
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1 border rounded text-sm hover:bg-gray-50 disabled:opacity-50"
                            >
                                <FaChevronLeft size={12} />
                            </button>
                            <span className="px-3 py-1 border rounded text-sm bg-blue-600 text-white">
                                {currentPage}
                            </span>
                            <button
                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 border rounded text-sm hover:bg-gray-50 disabled:opacity-50"
                            >
                                <FaChevronRight size={12} />
                            </button>
                            <button
                                onClick={() => setCurrentPage(totalPages)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 border rounded text-sm hover:bg-gray-50 disabled:opacity-50"
                            >
                                末頁
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}