import { Head, Link, useForm } from '@inertiajs/react';
import { FaArrowLeft, FaSave, FaTimes, FaImage, FaFolder, FaGlobe, FaHome } from 'react-icons/fa';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { FaBold, FaItalic, FaUnderline, FaListUl, FaListOl, FaUndo, FaRedo } from 'react-icons/fa';

interface AlbumFormData {
    language: string;
    status: boolean;
    show_on_home: boolean;
    sort_order: number;
    category: string;
    name: string;
    description: string;
    cover_image: string;
    cover_image_file?: File;
    note: string;
}

export default function AlbumCreate() {
    const { data, setData, post, processing, errors } = useForm<AlbumFormData>({
        language: 'TS',
        status: true,
        show_on_home: true,
        sort_order: 999,
        category: '2365',
        name: '',
        description: '',
        cover_image: '',
        cover_image_file: undefined,
        note: ''
    });

    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: data.description,
        onUpdate: ({ editor }) => {
            setData('description', editor.getHTML());
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/albums', {
            onSuccess: () => {
                window.location.href = '/admin/albums';
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
            }
        });
    };

    return (
        <>
            <Head title="新增相簿" />
            
            <div className="bg-white rounded-xl shadow-sm p-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Link 
                            href="/admin/albums"
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <FaArrowLeft size={20} />
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <FaImage className="text-blue-500" /> 新增相簿
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">建立新的活動相簿</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/admin/albums"
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                            <FaTimes /> 取消
                        </Link>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Settings Section */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaFolder className="text-blue-500" /> 設定
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Language */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    語言
                                </label>
                                <select
                                    value={data.language}
                                    onChange={(e) => setData('language', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="TS">繁中</option>
                                    <option value="EN">英文</option>
                                    <option value="JP">日文</option>
                                </select>
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    狀態
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            checked={data.status === true}
                                            onChange={() => setData('status', true)}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-blue-600">上架</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            checked={data.status === false}
                                            onChange={() => setData('status', false)}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-red-600">下架</span>
                                    </label>
                                </div>
                            </div>

                            {/* Show on Home */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    首頁
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            checked={data.show_on_home === true}
                                            onChange={() => setData('show_on_home', true)}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-blue-600">顯示</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            checked={data.show_on_home === false}
                                            onChange={() => setData('show_on_home', false)}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-red-600">不顯示</span>
                                    </label>
                                </div>
                            </div>

                            {/* Sort Order */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    排序
                                </label>
                                <input
                                    type="number"
                                    value={data.sort_order}
                                    onChange={(e) => setData('sort_order', parseInt(e.target.value) || 999)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Category & Name */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    分類項目 <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="2365">2026年</option>
                                    <option value="148">GuDate活動王專用</option>
                                    <option value="2366">2025年</option>
                                </select>
                            </div>

                            {/* Album Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    名稱 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="請輸入相簿名稱"
                                    required
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            描述
                        </label>
                        
                        {/* Editor Toolbar */}
                        <div className="editor-toolbar border border-gray-300 rounded-t-lg bg-white p-2 flex flex-wrap gap-1">
                            <button
                                type="button"
                                onClick={() => editor?.chain().focus().toggleBold().run()}
                                className={`p-2 rounded hover:bg-gray-100 ${editor?.isActive('bold') ? 'bg-gray-200' : ''}`}
                                title="粗體"
                            >
                                <FaBold size={14} />
                            </button>
                            <button
                                type="button"
                                onClick={() => editor?.chain().focus().toggleItalic().run()}
                                className={`p-2 rounded hover:bg-gray-100 ${editor?.isActive('italic') ? 'bg-gray-200' : ''}`}
                                title="斜體"
                            >
                                <FaItalic size={14} />
                            </button>
                            <button
                                type="button"
                                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                                className={`p-2 rounded hover:bg-gray-100 ${editor?.isActive('bulletList') ? 'bg-gray-200' : ''}`}
                                title="項目符號"
                            >
                                <FaListUl size={14} />
                            </button>
                            <button
                                type="button"
                                onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                                className={`p-2 rounded hover:bg-gray-100 ${editor?.isActive('orderedList') ? 'bg-gray-200' : ''}`}
                                title="編號列表"
                            >
                                <FaListOl size={14} />
                            </button>
                            <div className="border-l border-gray-300 mx-1"></div>
                            <button
                                type="button"
                                onClick={() => editor?.chain().focus().undo().run()}
                                className="p-2 rounded hover:bg-gray-100"
                                title="復原"
                            >
                                <FaUndo size={14} />
                            </button>
                            <button
                                type="button"
                                onClick={() => editor?.chain().focus().redo().run()}
                                className="p-2 rounded hover:bg-gray-100"
                                title="重做"
                            >
                                <FaRedo size={14} />
                            </button>
                        </div>

                        {/* Editor Content */}
                        <EditorContent 
                            editor={editor}
                            className="border border-t-0 border-gray-300 rounded-b-lg p-3 min-h-[150px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Cover Image */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            代表圖
                        </label>
                        
                        <div className="space-y-3">
                            {/* File Upload */}
                            <div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setData('cover_image_file', file);
                                            // Create preview URL
                                            const previewUrl = URL.createObjectURL(file);
                                            setData('cover_image', previewUrl);
                                        }
                                    }}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Or URL input */}
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">或輸入URL:</span>
                                <input
                                    type="text"
                                    value={data.cover_image}
                                    onChange={(e) => setData('cover_image', e.target.value)}
                                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="請輸入圖片URL"
                                />
                            </div>

                            {/* Preview */}
                            {data.cover_image && (
                                <div className="mt-2">
                                    <p className="text-sm text-gray-600 mb-1">預覽:</p>
                                    <img 
                                        src={data.cover_image} 
                                        alt="預覽" 
                                        className="h-32 w-32 object-cover rounded border"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Note */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            備註
                        </label>
                        <textarea
                            value={data.note}
                            onChange={(e) => setData('note', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                            rows={2}
                            placeholder="請輸入備註"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-3">
                        <Link
                            href="/admin/albums"
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                            <FaTimes /> 取消
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FaSave /> {processing ? '儲存中...' : '儲存'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}