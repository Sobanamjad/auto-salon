// resources/js/pages/Admin/topics/TopicsSelect.tsx
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { 
    FaArrowLeft, FaSave, FaCheck, FaTimes,
    FaNewspaper, FaList, FaInfoCircle
} from 'react-icons/fa';

interface Category {
    id: string;
    name: string;
}

interface Props {
    title?: string;
    categories: Category[];
    selectedCategories?: string[];
}

export default function TopicsSelect({ 
    title = '有興趣的專業主題新知', 
    categories = [],
    selectedCategories = ['40'] // Default: 愛心公益
}: Props) {
    const [selectedIds, setSelectedIds] = useState<string[]>(selectedCategories);

    const toggleAll = () => {
        if (selectedIds.length === categories.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(categories.map(c => c.id));
        }
    };

    const toggleCategory = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(t => t !== id)
                : [...prev, id]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (selectedIds.length === 0) {
            alert('請至少選擇一項');
            return;
        }

        if (selectedIds.length > 30) {
            alert('最多只能選擇30項');
            return;
        }

        router.post('/admin/topics/select', {
            chk_sn: selectedIds
        }, {
            onSuccess: () => {
                alert('主題選擇已更新！');
            },
            onError: (errors) => {
                alert('更新失敗，請重試');
            }
        });
    };

    // Split categories into rows of 5
    const rows = [];
    for (let i = 0; i < categories.length; i += 5) {
        rows.push(categories.slice(i, i + 5));
    }

    return (
        <>
            <Head title={title} />
            
            <div className="bg-white rounded-xl shadow-sm p-6 text-gray-900">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Link 
                            href="/admin/topics"
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <FaArrowLeft size={20} />
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <FaList className="text-green-500" /> {title}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                                <FaInfoCircle className="text-blue-500" />
                                選擇您有興趣的主題分類 (最多30項)
                            </p>
                            <div className="text-sm text-gray-600 mt-1">
                                已選擇：<span className="font-bold text-blue-600">{selectedIds.length}</span> 項
                                {selectedIds.length > 0 && (
                                    <span className="text-gray-400 ml-2">
                                        (最少1項，最多30項)
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/admin/topics"
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                            <FaTimes /> 取消返回
                        </Link>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <input
                                type="checkbox"
                                checked={selectedIds.length === categories.length && categories.length > 0}
                                onChange={toggleAll}
                                className="w-4 h-4 text-blue-600 rounded"
                            />
                            <label className="text-sm font-medium text-gray-700">全選</label>
                            <span className="text-xs text-gray-400 ml-4">
                                共 {categories.length} 個分類
                            </span>
                        </div>

                        <div className="space-y-2">
                            {rows.map((row, rowIndex) => (
                                <div key={rowIndex} className="flex flex-wrap gap-2">
                                    {row.map((category) => (
                                        <label
                                            key={category.id}
                                            className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all ${
                                                selectedIds.includes(category.id)
                                                    ? 'bg-blue-50 border-blue-400 shadow-sm'
                                                    : 'bg-white border-gray-200 hover:bg-gray-50'
                                            }`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(category.id)}
                                                onChange={() => toggleCategory(category.id)}
                                                className="w-4 h-4 text-blue-600 rounded"
                                            />
                                            <span className="text-sm whitespace-nowrap">
                                                {category.name}
                                            </span>
                                            {selectedIds.includes(category.id) && (
                                                <FaCheck className="text-blue-600 text-xs" />
                                            )}
                                        </label>
                                    ))}
                                </div>
                            ))}
                        </div>

                        {categories.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                <FaNewspaper size={32} className="mx-auto text-gray-300 mb-2" />
                                <p>暫無主題分類</p>
                            </div>
                        )}
                    </div>

                    {/* Selected count display */}
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                            已選擇：<span className="font-bold text-blue-600">{selectedIds.length}</span> 項
                            {selectedIds.length > 0 && selectedIds.length <= 30 && (
                                <span className="text-green-600 ml-2">✓ 數量符合</span>
                            )}
                            {selectedIds.length > 30 && (
                                <span className="text-red-600 ml-2">✗ 超過30項限制</span>
                            )}
                        </div>
                        <div className="flex items-center gap-3">
                            <Link
                                href="/admin/topics"
                                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                取消返回
                            </Link>
                            <button
                                type="submit"
                                disabled={selectedIds.length === 0 || selectedIds.length > 30}
                                className={`px-6 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                                    selectedIds.length === 0 || selectedIds.length > 30
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-green-600 text-white hover:bg-green-700'
                                }`}
                            >
                                <FaSave /> 送出
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}