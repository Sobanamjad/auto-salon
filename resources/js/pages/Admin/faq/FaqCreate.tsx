import { Head, Link, useForm } from '@inertiajs/react';
import { FaArrowLeft, FaSave, FaTimes, FaQuestionCircle, FaSort } from 'react-icons/fa';

interface FaqFormData {
    category: string;
    question: string;
    answer_html: string;
    status: boolean;
    sort_order: number;
}

export default function FaqCreate() {
    const { data, setData, post, processing, errors } = useForm<FaqFormData>({
        category: '',
        question: '',
        answer_html: '',
        status: true,
        sort_order: 999,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/faq', {
            onSuccess: () => {
                window.location.href = '/admin/faq';
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
            }
        });
    };

    return (
        <>
            <Head title="常見問題 - 新增資料" />
            
            <div className="bg-white rounded-xl shadow-sm p-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Link 
                            href="/admin/faq"
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <FaArrowLeft size={20} />
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <FaQuestionCircle className="text-blue-500" /> 常見問題 - 新增資料
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">建立新的常見問題</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/admin/faq"
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                            <FaTimes /> 取消返回
                        </Link>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Settings Section */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaSort className="text-blue-500" /> 設定
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    是否顯示
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            checked={data.status === true}
                                            onChange={() => setData('status', true)}
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <span className="text-blue-600">顯示</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            checked={data.status === false}
                                            onChange={() => setData('status', false)}
                                            className="w-4 h-4 text-red-600"
                                        />
                                        <span className="text-red-600">隱藏</span>
                                    </label>
                                </div>
                            </div>

                            {/* Sort Order */}
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

                            {/* Category */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    分類
                                </label>
                                <input
                                    type="text"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="請輸入分類（選填）"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Question */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            問題 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.question}
                            onChange={(e) => setData('question', e.target.value)}
                            className={`w-full border rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 ${
                                errors.question ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="請輸入問題"
                            required
                        />
                        {errors.question && (
                            <p className="text-red-500 text-sm mt-1">{errors.question}</p>
                        )}
                    </div>

                    {/* Answer */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            答案 <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={data.answer_html}
                            onChange={(e) => setData('answer_html', e.target.value)}
                            rows={12}
                            className={`w-full border rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 ${
                                errors.answer_html ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="請輸入詳細答案..."
                            required
                        />
                        {errors.answer_html && (
                            <p className="text-red-500 text-sm mt-1">{errors.answer_html}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-2">
                            <i className="icon-book"></i> 
                            <a 
                                href="https://mypaper.52go.tw/17web/96/50461/" 
                                target="_blank"
                                className="text-blue-600 hover:underline ml-1"
                            >
                                上傳圖片說明
                            </a>
                        </p>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                        <Link
                            href="/admin/faq"
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                            <FaTimes /> 取消
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                            <FaSave /> 儲存
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
