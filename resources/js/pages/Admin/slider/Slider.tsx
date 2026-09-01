// resources/js/pages/Admin/slider/Slider.tsx
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { 
    FaImage, FaEdit, FaTrash, FaPlus, FaEye, FaEyeSlash,
    FaSort, FaLink, FaLanguage, FaVideo, FaChevronLeft, FaChevronRight
} from 'react-icons/fa';

interface Slider {
    id: number;
    language: string;
    language_label: string;
    title: string;
    image: string | null;
    image_url: string | null;
    thumbnail: string | null;
    image_alt: string;
    link: string;
    sort_order: number;
    is_active: boolean;
    width: number;
    height: number;
    video_url: string;
    description: string;
    created_at: string;
}

interface Props {
    title?: string;
    sliders: Slider[];
}

export default function Slider({ title = '相片輪播', sliders }: Props) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredItems = sliders;
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleDelete = (id: number, title: string) => {
        if (confirm(`確定要刪除: ${title} 嗎？`)) {
            router.delete(`/admin/slider/${id}`);
        }
    };

    const handleToggleActive = (id: number) => {
        router.get(`/admin/slider/${id}/toggle-active`);
    };

    const handleUpdateSort = (id: number, sortOrder: number) => {
        router.put(`/admin/slider/${id}/sort`, { sort_order: sortOrder });
    };

    const getLanguageColor = (lang: string) => {
        const colors: Record<string, string> = {
            'TS': 'bg-red-100 text-red-700',
            'EN': 'bg-blue-100 text-blue-700',
            'JP': 'bg-green-100 text-green-700',
        };
        return colors[lang] || 'bg-gray-100 text-gray-700';
    };

    return (
        <>
            <Head title={title} />
            
            <div className="bg-white rounded-xl shadow-sm p-6 text-gray-900">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <FaImage className="text-blue-500" /> {title}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">管理首頁輪播圖片</p>
                        <div className="text-sm text-gray-600 mt-2">總圖片：{sliders.length} 張</div>
                    </div>
                    <Link
                        href="/admin/slider/create"
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm"
                    >
                        <FaPlus /> 新增輪播
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-12">No.</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-16">SN</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-20">語系</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">主題</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-24">前台選項</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase w-40">相片</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-20">影片</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-20">管理</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentItems.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-3 py-8 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <FaImage size={32} className="text-gray-300" />
                                            <p>暫無輪播圖片</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                currentItems.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-3 py-3 text-center text-sm">
                                            {(currentPage - 1) * itemsPerPage + index + 1}.
                                        </td>
                                        <td className="px-3 py-3 text-center text-sm">{item.id}</td>
                                        <td className="px-3 py-3 text-center">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${getLanguageColor(item.language)}`}>
                                                {item.language_label}
                                            </span>
                                        </td>
                                        <td className="px-3 py-3">
                                            <div className="text-sm font-medium text-gray-900">
                                                {item.title || '-'}
                                            </div>
                                            {item.description && (
                                                <div className="text-xs text-gray-400">{item.description}</div>
                                            )}
                                        </td>
                                        <td className="px-3 py-3 text-center">
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="text-xs text-gray-500">
                                                    {item.width}×{item.height}
                                                </span>
                                                <div className="flex items-center gap-1">
                                                    <input
                                                        type="number"
                                                        value={item.sort_order}
                                                        onChange={(e) => handleUpdateSort(item.id, parseInt(e.target.value) || 0)}
                                                        className="w-12 text-center border rounded px-1 py-0.5 text-xs"
                                                    />
                                                    <FaSort className="text-gray-400 text-xs" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-3 py-3">
                                            <div className="flex items-center gap-2">
                                                {item.image_url ? (
                                                    <img 
                                                        src={item.image_url} 
                                                        alt={item.image_alt || item.title || 'Slider'}
                                                        className="h-12 w-auto object-cover rounded border"
                                                    />
                                                ) : (
                                                    <div className="h-12 w-16 bg-gray-100 rounded border flex items-center justify-center text-gray-400 text-xs">
                                                        無圖片
                                                    </div>
                                                )}
                                                {item.link && (
                                                    <a 
                                                        href={item.link} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="text-blue-500 hover:text-blue-700"
                                                    >
                                                        <FaLink size={14} />
                                                    </a>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-3 py-3 text-center">
                                            {item.video_url ? (
                                                <a 
                                                    href={item.video_url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="text-purple-500 hover:text-purple-700"
                                                >
                                                    <FaVideo size={18} />
                                                </a>
                                            ) : (
                                                <span className="text-gray-300">-</span>
                                            )}
                                        </td>
                                        <td className="px-3 py-3">
                                            <div className="flex flex-col items-center gap-1 text-xs">
                                                <Link
                                                    href={`/admin/slider/${item.id}/edit`}
                                                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                                >
                                                    <FaEdit size={12} /> 編輯
                                                </Link>
                                                <div className="border-t border-dashed border-gray-300 w-full"></div>
                                                <button
                                                    onClick={() => handleToggleActive(item.id)}
                                                    className={`${item.is_active ? 'text-green-600' : 'text-gray-400'} hover:${item.is_active ? 'text-green-800' : 'text-gray-600'} flex items-center gap-1`}
                                                >
                                                    {item.is_active ? '啟用' : '停用'}
                                                </button>
                                                <div className="border-t border-dashed border-gray-300 w-full"></div>
                                                <button
                                                    onClick={() => handleDelete(item.id, item.title || `ID: ${item.id}`)}
                                                    className="text-red-600 hover:text-red-800 flex items-center gap-1"
                                                >
                                                    <FaTrash size={12} /> 刪除
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
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