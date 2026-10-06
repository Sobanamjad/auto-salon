import { Head, Link, useForm } from '@inertiajs/react';
import { FaArrowLeft, FaSave, FaTimes, FaTag } from 'react-icons/fa';

interface CategoryItem {
    id?: number;
    name: string;
    icon: string;
    color: string;
    sort_order: number | string;
}

interface Props {
    title?: string;
    item: CategoryItem | null;
}

const COLOR_OPTIONS = [
    { label: '紅色 (喜事)',  value: 'bg-red-100 text-red-800' },
    { label: '灰色 (喪事)',  value: 'bg-gray-100 text-gray-700' },
    { label: '綠色',         value: 'bg-green-100 text-green-800' },
    { label: '藍色',         value: 'bg-blue-100 text-blue-800' },
    { label: '黃色',         value: 'bg-yellow-100 text-yellow-800' },
    { label: '紫色',         value: 'bg-purple-100 text-purple-800' },
    { label: '粉紅色',       value: 'bg-pink-100 text-pink-800' },
    { label: '橘色',         value: 'bg-orange-100 text-orange-800' },
];

const ICON_OPTIONS = ['🎉', '🕊️', '🏪', '💒', '🎂', '🏠', '🌸', '⭐', '🎊', '💐', '🙏', '📋'];

export default function RedWhiteCategoryForm({ title = '紅白帖分類', item }: Props) {
    const isEdit = !!item;

    const { data, setData, post, put, processing, errors } = useForm<CategoryItem>({
        name:       item?.name       ?? '',
        icon:       item?.icon       ?? '📋',
        color:      item?.color      ?? 'bg-blue-100 text-blue-800',
        sort_order: item?.sort_order ?? 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit && item?.id) {
            put(`/admin/red-white-categories/${item.id}`);
        } else {
            post('/admin/red-white-categories');
        }
    };

    return (
        <>
            <Head title={title} />

            <div className="bg-white rounded-xl shadow-sm p-6 text-gray-900">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Link href="/admin/red-white-categories" className="text-gray-500 hover:text-gray-700 transition-colors">
                            <FaArrowLeft size={20} />
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <FaTag className="text-pink-500" /> {title}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                {isEdit ? '編輯分類資料' : '新增分類資料'}
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            分類名稱 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            placeholder="例：喜事、喪事、會員開幕"
                            required
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* Icon */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">圖示 (Emoji)</label>
                        <div className="flex gap-2 flex-wrap mb-2">
                            {ICON_OPTIONS.map(icon => (
                                <button
                                    key={icon}
                                    type="button"
                                    onClick={() => setData('icon', icon)}
                                    className={`text-xl px-2 py-1 rounded border transition ${
                                        data.icon === icon
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:border-gray-400'
                                    }`}
                                >
                                    {icon}
                                </button>
                            ))}
                        </div>
                        <input
                            type="text"
                            value={data.icon}
                            onChange={(e) => setData('icon', e.target.value)}
                            className="w-32 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 text-xl"
                            placeholder="📋"
                            maxLength={10}
                        />
                        {errors.icon && <p className="text-red-500 text-xs mt-1">{errors.icon}</p>}
                    </div>

                    {/* Color */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">顏色樣式</label>
                        <div className="flex gap-2 flex-wrap mb-2">
                            {COLOR_OPTIONS.map(opt => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => setData('color', opt.value)}
                                    className={`px-3 py-1 rounded text-xs font-medium border-2 transition ${opt.value} ${
                                        data.color === opt.value ? 'border-blue-500 scale-105' : 'border-transparent'
                                    }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                        <input
                            type="text"
                            value={data.color}
                            onChange={(e) => setData('color', e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                            placeholder="bg-blue-100 text-blue-800"
                        />
                        {errors.color && <p className="text-red-500 text-xs mt-1">{errors.color}</p>}
                    </div>

                    {/* Preview */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">預覽</label>
                        <span className={`px-3 py-1.5 rounded text-sm font-medium inline-block ${data.color || 'bg-blue-100 text-blue-800'}`}>
                            {data.icon || '📋'} {data.name || '分類名稱'}
                        </span>
                    </div>

                    {/* Sort Order */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">排序</label>
                        <input
                            type="number"
                            min="0"
                            value={data.sort_order}
                            onChange={(e) => setData('sort_order', e.target.value)}
                            className="w-32 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.sort_order && <p className="text-red-500 text-xs mt-1">{errors.sort_order}</p>}
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-200">
                        <Link
                            href="/admin/red-white-categories"
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                            <FaTimes /> 取消返回
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                            <FaSave /> {processing ? '處理中...' : (isEdit ? '更新資料' : '送出資料')}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
