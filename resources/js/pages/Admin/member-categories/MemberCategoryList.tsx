import { Head, Link, router } from '@inertiajs/react';
import { FaPlus, FaEdit, FaTrash, FaUsers, FaToggleOn, FaToggleOff } from 'react-icons/fa';

interface Category {
    id: number;
    name: string;
    name2: string | null;
    icon: string;
    color: string;
    sort_order: number;
    is_active: boolean;
    created_at: string;
}

interface Props {
    title?: string;
    categories: Category[];
}

export default function MemberCategoryList({ title = '會員分類', categories = [] }: Props) {

    const handleDelete = (id: number, name: string) => {
        if (confirm(`確定要刪除「${name}」分類嗎？`)) {
            router.delete(`/admin/member-categories/${id}`);
        }
    };

    const handleToggleActive = (id: number) => {
        router.get(`/admin/member-categories/${id}/toggle-active`);
    };

    const handleSortUpdate = (id: number, sortOrder: number) => {
        router.put(`/admin/member-categories/${id}/sort`, { sort_order: sortOrder });
    };

    return (
        <>
            <Head title={title} />

            <div className="bg-white rounded-xl shadow-sm p-6 text-gray-900">
                {/* Header */}
                <div className="border-b border-gray-200 pb-4 mb-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <FaUsers className="text-blue-500" /> {title}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">管理會員專業分類</p>
                            <div className="text-sm text-gray-600 mt-2">總筆數：{categories.length} 筆</div>
                        </div>
                        <Link
                            href="/admin/members"
                            className="text-sm text-blue-600 hover:underline"
                        >
                            ← 返回會員資訊
                        </Link>
                    </div>
                </div>

                {/* Add Button */}
                <div className="flex justify-end mb-4">
                    <Link
                        href="/admin/member-categories/create"
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm"
                    >
                        <FaPlus /> 新增分類
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-10">No.</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-24">狀態</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-24">排序</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">分類名稱</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">副分類名稱</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-16">圖示</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-32">預覽</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-20">管理</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {categories.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-3 py-8 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <FaUsers size={32} className="text-gray-300" />
                                            <p>暫無分類資料</p>
                                            <Link href="/admin/member-categories/create" className="text-blue-600 hover:underline text-sm">點此新增</Link>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                categories.map((cat, index) => (
                                    <tr key={cat.id} className={`hover:bg-gray-50 transition-colors ${!cat.is_active ? 'opacity-50' : ''}`}>
                                        <td className="px-3 py-2 text-center text-sm">{index + 1}.</td>
                                        <td className="px-3 py-2 text-center">
                                            <button onClick={() => handleToggleActive(cat.id)}>
                                                {cat.is_active
                                                    ? <FaToggleOn className="text-green-500 mx-auto" size={22} title="啟用中" />
                                                    : <FaToggleOff className="text-gray-400 mx-auto" size={22} title="停用" />
                                                }
                                            </button>
                                        </td>
                                        <td className="px-3 py-2 text-center">
                                            <div className="flex items-center justify-center gap-1">
                                                <input
                                                    type="number"
                                                    defaultValue={cat.sort_order}
                                                    className="w-14 border rounded px-1 py-0.5 text-xs text-center"
                                                    id={`sort_${cat.id}`}
                                                />
                                                <button
                                                    onClick={() => {
                                                        const el = document.getElementById(`sort_${cat.id}`) as HTMLInputElement;
                                                        handleSortUpdate(cat.id, parseInt(el.value) || 0);
                                                    }}
                                                    className="bg-blue-500 text-white px-1.5 py-0.5 rounded text-xs hover:bg-blue-600"
                                                >
                                                    更
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-3 py-2 text-sm font-medium">{cat.name}</td>
                                        <td className="px-3 py-2 text-sm text-gray-500">{cat.name2 || '-'}</td>
                                        <td className="px-3 py-2 text-center text-xl">{cat.icon || '👤'}</td>
                                        <td className="px-3 py-2 text-center">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${cat.color || 'bg-blue-100 text-blue-800'}`}>
                                                {cat.icon} {cat.name}
                                            </span>
                                        </td>
                                        <td className="px-3 py-2">
                                            <div className="flex flex-col items-center gap-0.5 text-xs">
                                                <Link
                                                    href={`/admin/member-categories/${cat.id}/edit`}
                                                    className="text-blue-600 hover:text-blue-800 flex items-center gap-0.5"
                                                >
                                                    <FaEdit size={12} /> 編輯
                                                </Link>
                                                <div className="border-t border-dashed border-gray-300 w-full" />
                                                <button
                                                    onClick={() => handleDelete(cat.id, cat.name)}
                                                    className="text-red-600 hover:text-red-800 flex items-center gap-0.5"
                                                >
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
                                    共 {categories.length} 筆
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Color hint */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-500">
                    <p className="font-medium mb-1">顏色樣式 (Tailwind CSS)：</p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            'bg-blue-100 text-blue-800',
                            'bg-green-100 text-green-800',
                            'bg-red-100 text-red-800',
                            'bg-yellow-100 text-yellow-800',
                            'bg-purple-100 text-purple-800',
                            'bg-pink-100 text-pink-800',
                            'bg-orange-100 text-orange-800',
                            'bg-gray-100 text-gray-700',
                        ].map(cls => (
                            <span key={cls} className={`px-2 py-1 rounded text-xs font-medium ${cls}`}>{cls.split(' ')[0].replace('bg-','').replace('-100','')}</span>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
