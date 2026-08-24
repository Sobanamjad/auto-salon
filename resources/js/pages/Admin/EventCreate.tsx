import { Head, Link, useForm } from '@inertiajs/react';
import { FaArrowLeft, FaSave, FaTimes, FaCalendar, FaTag, FaInfoCircle, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Underline from '@tiptap/extension-underline';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { Link as TipTapLink } from '@tiptap/extension-link';
import { Text } from '@tiptap/extension-text';
import FontFamily from '@tiptap/extension-font-family';
import Image from '@tiptap/extension-image';
import Heading from '@tiptap/extension-heading';
import { Extension } from '@tiptap/core';

// Custom Font Size Extension
const FontSize = Extension.create({
    name: 'fontSize',
    addOptions() {
        return {
            types: ['textStyle'],
        };
    },
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontSize: {
                        default: null,
                        parseHTML: element => element.style.fontSize?.replace(/['"]+/g, ''),
                        renderHTML: attributes => {
                            if (!attributes.fontSize) {
                                return {};
                            }
                            return {
                                style: `font-size: ${attributes.fontSize}`,
                            };
                        },
                    },
                },
            },
        ];
    },
    addCommands() {
        return {
            setFontSize: fontSize => ({ chain }) => {
                return chain().setMark('textStyle', { fontSize }).run();
            },
            unsetFontSize: () => ({ chain }) => {
                return chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run();
            },
        };
    },
}); 

interface EventFormData {
    title: string;
    category: string;
    status: string;
    date_start: string;
    date_end: string;
    signup_start: string;
    signup_end: string;
    is_open: boolean;
    content: string;
    max_attendees: number;
    location: string;
    registration_start: string;
    registration_end: string;
    is_featured: boolean;
    sort_order: number;
}

export default function EventCreate() {
    const { data, setData, post, processing, errors } = useForm<EventFormData>({
        title: '',
        category: '本會活動',
        status: '開放報名',
        date_start: '',
        date_end: '',
        signup_start: '',
        signup_end: '',
        is_open: true,
        content: '',
        max_attendees: 0,
        location: '',
        registration_start: '',
        registration_end: '',
        is_featured: false,
        sort_order: 999
    });

    // TipTap Editor Configuration
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
            }),
            Heading.configure({
                levels: [1, 2, 3, 4, 5, 6],
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            TextStyle,
            Color,
            Underline,
            Text,
            FontFamily,
            FontSize,
            Image,
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
            TipTapLink.configure({
                openOnClick: false,
            }),
        ],
        content: data.content,
        onUpdate: ({ editor }) => {
            setData('content', editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose max-w-none focus:outline-none min-h-[300px] p-4',
            },
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/events', {
            onSuccess: () => {
                window.location.href = '/admin/events';
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
            }
        });
    };



    return (
        <>
            <Head title="新增活動" />
            <style>{`
                .ProseMirror {
                    outline: none;
                    min-height: 300px;
                    padding: 16px;
                    color: #000;
                    background: white;
                }
                .ProseMirror p {
                    margin: 0.5em 0;
                    color: #000;
                }
                .ProseMirror ul, .ProseMirror ol {
                    padding-left: 1.5em;
                    color: #000;
                }
                .ProseMirror ul {
                    list-style-type: disc;
                }
                .ProseMirror ol {
                    list-style-type: decimal;
                }
                .ProseMirror strong {
                    font-weight: bold;
                    color: #000;
                }
                .ProseMirror em {
                    font-style: italic;
                    color: #000;
                }
                .ProseMirror s {
                    text-decoration: line-through;
                    color: #000;
                }
                .ProseMirror u {
                    text-decoration: underline;
                    color: #000;
                }
                .ProseMirror * {
                    color: #000;
                }
                .ProseMirror img {
                    max-width: 100%;
                    height: auto;
                    display: block;
                    margin: 1em 0;
                }
                .ProseMirror table {
                    border-collapse: collapse;
                    table-layout: fixed;
                    width: 100%;
                    margin: 0;
                    overflow: hidden;
                }
                .ProseMirror table td,
                .ProseMirror table th {
                    min-width: 1em;
                    border: 2px solid #dfe2e5;
                    padding: 3px 5px;
                    vertical-align: top;
                    box-sizing: border-box;
                    position: relative;
                }
                .ProseMirror table th {
                    font-weight: bold;
                    text-align: left;
                    background-color: #f1f3f5;
                }
                .ProseMirror table .selectedCell:after {
                    z-index: 2;
                    position: absolute;
                    content: "";
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    background: rgba(200, 200, 255, 0.4);
                    pointer-events: none;
                }
                .ProseMirror table .column-resize-handle {
                    position: absolute;
                    right: -2px;
                    top: 0;
                    bottom: -2px;
                    width: 4px;
                    background-color: #adf;
                    pointer-events: none;
                }
                .ProseMirror table p {
                    margin: 0;
                }
                .ProseMirror a {
                    color: #0066cc;
                    text-decoration: underline;
                }
            `}</style>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Link 
                            href="/admin/events"
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <FaArrowLeft size={20} />
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">新增活動</h2>
                            <p className="text-sm text-gray-500 mt-1">建立新的活動</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/admin/events"
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                            <FaTimes /> 取消
                        </Link>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaInfoCircle className="text-blue-500" /> 基本資訊
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* 活動標題 */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    活動標題 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className={`w-full border rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.title ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="請輸入活動標題"
                                    required
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                                )}
                            </div>

                            {/* 活動分類 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    活動分類 <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="本會活動">本會活動</option>
                                    <option value="好友活動">好友活動</option>
                                    <option value="其他">其他</option>
                                </select>
                            </div>

                            {/* 活動狀態 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    活動狀態 <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="開放報名">開放報名</option>
                                    <option value="停止報名">停止報名</option>
                                    <option value="已截止">已截止</option>
                                </select>
                            </div>

                            {/* 活動地點 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaMapMarkerAlt className="inline mr-1 text-red-500" /> 活動地點
                                </label>
                                <input
                                    type="text"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="請輸入活動地點"
                                />
                            </div>

                            {/* 最大參加人數 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaUsers className="inline mr-1 text-blue-500" /> 最大參加人數
                                </label>
                                <input
                                    type="number"
                                    value={data.max_attendees}
                                    onChange={(e) => setData('max_attendees', parseInt(e.target.value) || 0)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="0 = 不限"
                                    min="0"
                                />
                            </div>

                            {/* 排序 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    排序
                                </label>
                                <input
                                    type="number"
                                    value={data.sort_order}
                                    onChange={(e) => setData('sort_order', parseInt(e.target.value) || 999)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="數字越小越靠前"
                                />
                            </div>

                            {/* 精選活動 */}
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={data.is_featured}
                                    onChange={(e) => setData('is_featured', e.target.checked)}
                                    className="w-4 h-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
                                />
                                <label className="text-sm font-medium text-gray-700">
                                    ⭐ 精選活動
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Date Section */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaCalendar className="text-blue-500" /> 日期設定
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* 活動開始日期 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    活動開始日期 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={data.date_start}
                                    onChange={(e) => setData('date_start', e.target.value)}
                                    className={`w-full border rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.date_start ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    required
                                />
                                {errors.date_start && (
                                    <p className="text-red-500 text-sm mt-1">{errors.date_start}</p>
                                )}
                            </div>

                            {/* 活動結束日期 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    活動結束日期 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={data.date_end}
                                    onChange={(e) => setData('date_end', e.target.value)}
                                    className={`w-full border rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.date_end ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    required
                                />
                                {errors.date_end && (
                                    <p className="text-red-500 text-sm mt-1">{errors.date_end}</p>
                                )}
                            </div>

                            {/* 報名開始日期 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    報名開始日期
                                </label>
                                <input
                                    type="date"
                                    value={data.signup_start}
                                    onChange={(e) => setData('signup_start', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* 報名結束日期 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    報名結束日期
                                </label>
                                <input
                                    type="date"
                                    value={data.signup_end}
                                    onChange={(e) => setData('signup_end', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* 開放報名 */}
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={data.is_open}
                                    onChange={(e) => setData('is_open', e.target.checked)}
                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label className="text-sm font-medium text-gray-700">
                                    開放報名
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Content Section with TinyMCE */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaTag className="text-blue-500" /> 內容
                        </h3>
                        
                        <div>
                            
                            {/* TipTap Editor */}
                            <div className="border border-gray-300 rounded-lg overflow-hidden">
                                {/* Toolbar */}
                                <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
                                    {/* Undo/Redo */}
                                    <button
                                        onClick={() => editor?.chain().focus().undo().run()}
                                        className="p-2 rounded hover:bg-gray-200 text-gray-900"
                                        title="Undo"
                                    >
                                        ↶
                                    </button>
                                    <button
                                        onClick={() => editor?.chain().focus().redo().run()}
                                        className="p-2 rounded hover:bg-gray-200 text-gray-900"
                                        title="Redo"
                                    >
                                        ↷
                                    </button>
                                    <div className="w-px bg-gray-300 mx-1"></div>
                                    
                                    {/* Styles */}
                                    <select
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (value === 'p') {
                                                editor?.chain().focus().setParagraph().run();
                                            } else if (value.startsWith('h')) {
                                                const level = parseInt(value.substring(1)) as 1 | 2 | 3 | 4 | 5 | 6;
                                                editor?.chain().focus().toggleHeading({ level }).run();
                                            }
                                        }}
                                        className="px-2 py-1 rounded border border-gray-300 text-gray-900 text-sm"
                                    >
                                        <option value="p">段落</option>
                                        <option value="h1">標題 1</option>
                                        <option value="h2">標題 2</option>
                                        <option value="h3">標題 3</option>
                                        <option value="h4">標題 4</option>
                                        <option value="h5">標題 5</option>
                                        <option value="h6">標題 6</option>
                                    </select>
                                    
                                    {/* Font Size */}
                                    <select
                                        onChange={(e) => {
                                            const size = e.target.value;
                                            editor?.chain().focus().setFontSize(size).run();
                                        }}
                                        className="px-2 py-1 rounded border border-gray-300 text-gray-900 text-sm"
                                    >
                                        <option value="12px">12pt</option>
                                        <option value="14px">14pt</option>
                                        <option value="16px">16pt</option>
                                        <option value="18px">18pt</option>
                                        <option value="24px">24pt</option>
                                        <option value="32px">32pt</option>
                                    </select>
                                    
                                    {/* Font Family */}
                                    <select
                                        onChange={(e) => {
                                            const font = e.target.value;
                                            editor?.chain().focus().setMark('textStyle', { fontFamily: font }).run();
                                        }}
                                        className="px-2 py-1 rounded border border-gray-300 text-gray-900 text-sm"
                                    >
                                        <option value="Arial, sans-serif">Arial</option>
                                        <option value="'Times New Roman', serif">Times New Roman</option>
                                        <option value="'Courier New', monospace">Courier New</option>
                                        <option value="Georgia, serif">Georgia</option>
                                        <option value="Verdana, sans-serif">Verdana</option>
                                        <option value="'微軟正黑體', sans-serif">微軟正黑體</option>
                                    </select>
                                    
                                    <div className="w-px bg-gray-300 mx-1"></div>
                                    
                                    {/* Text Formatting */}
                                    <button
                                        onClick={() => editor?.chain().focus().toggleBold().run()}
                                        className={`p-2 rounded hover:bg-gray-200 text-gray-900 ${editor?.isActive('bold') ? 'bg-gray-300' : ''}`}
                                        title="Bold"
                                    >
                                        <strong>B</strong>
                                    </button>
                                    <button
                                        onClick={() => editor?.chain().focus().toggleItalic().run()}
                                        className={`p-2 rounded hover:bg-gray-200 text-gray-900 ${editor?.isActive('italic') ? 'bg-gray-300' : ''}`}
                                        title="Italic"
                                    >
                                        <em>I</em>
                                    </button>
                                    <button
                                        onClick={() => editor?.chain().focus().toggleUnderline().run()}
                                        className={`p-2 rounded hover:bg-gray-200 text-gray-900 ${editor?.isActive('underline') ? 'bg-gray-300' : ''}`}
                                        title="Underline"
                                    >
                                        <u>U</u>
                                    </button>
                                    <button
                                        onClick={() => editor?.chain().focus().toggleStrike().run()}
                                        className={`p-2 rounded hover:bg-gray-200 text-gray-900 ${editor?.isActive('strike') ? 'bg-gray-300' : ''}`}
                                        title="Strike"
                                    >
                                        <s>S</s>
                                    </button>
                                    <div className="w-px bg-gray-300 mx-1"></div>
                                    
                                    {/* Text Color */}
                                    <div className="flex items-center gap-1">
                                        <label className="text-gray-900 text-sm">A</label>
                                        <input
                                            type="color"
                                            onChange={(e) => editor?.chain().focus().setColor(e.target.value).run()}
                                            className="w-6 h-6 rounded cursor-pointer"
                                            title="Text Color"
                                        />
                                    </div>
                                    
                                    {/* Background Color */}
                                    <div className="flex items-center gap-1">
                                        <label className="text-gray-900 text-sm">Bg</label>
                                        <input
                                            type="color"
                                            onChange={(e) => {
                                                editor?.chain().focus().setMark('textStyle', { backgroundColor: e.target.value }).run();
                                            }}
                                            className="w-6 h-6 rounded cursor-pointer"
                                            title="Background Color"
                                        />
                                    </div>
                                    
                                    {/* Lists */}
                                    <button
                                        onClick={() => editor?.chain().focus().toggleBulletList().run()}
                                        className={`p-2 rounded hover:bg-gray-200 text-gray-900 ${editor?.isActive('bulletList') ? 'bg-gray-300' : ''}`}
                                        title="Bullet List"
                                    >
                                        • List
                                    </button>
                                    <button
                                        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                                        className={`p-2 rounded hover:bg-gray-200 text-gray-900 ${editor?.isActive('orderedList') ? 'bg-gray-300' : ''}`}
                                        title="Ordered List"
                                    >
                                        1. List
                                    </button>
                                    <div className="w-px bg-gray-300 mx-1"></div>
                                    
                                    {/* Alignment */}
                                    <button
                                        onClick={() => editor?.chain().focus().setTextAlign('left').run()}
                                        className={`p-2 rounded hover:bg-gray-200 text-gray-900 ${editor?.isActive({ textAlign: 'left' }) ? 'bg-gray-300' : ''}`}
                                        title="Align Left"
                                    >
                                        Left
                                    </button>
                                    <button
                                        onClick={() => editor?.chain().focus().setTextAlign('center').run()}
                                        className={`p-2 rounded hover:bg-gray-200 text-gray-900 ${editor?.isActive({ textAlign: 'center' }) ? 'bg-gray-300' : ''}`}
                                        title="Align Center"
                                    >
                                        Center
                                    </button>
                                    <button
                                        onClick={() => editor?.chain().focus().setTextAlign('right').run()}
                                        className={`p-2 rounded hover:bg-gray-200 text-gray-900 ${editor?.isActive({ textAlign: 'right' }) ? 'bg-gray-300' : ''}`}
                                        title="Align Right"
                                    >
                                        Right
                                    </button>
                                    <button
                                        onClick={() => editor?.chain().focus().setTextAlign('justify').run()}
                                        className={`p-2 rounded hover:bg-gray-200 text-gray-900 ${editor?.isActive({ textAlign: 'justify' }) ? 'bg-gray-300' : ''}`}
                                        title="Justify"
                                    >
                                        Justify
                                    </button>
                                    <div className="w-px bg-gray-300 mx-1"></div>
                                    
                                    {/* Indent */}
                                    <button
                                        onClick={() => editor?.chain().focus().outdent().run()}
                                        className="p-2 rounded hover:bg-gray-200 text-gray-900"
                                        title="Outdent"
                                    >
                                        ←
                                    </button>
                                    <button
                                        onClick={() => editor?.chain().focus().indent().run()}
                                        className="p-2 rounded hover:bg-gray-200 text-gray-900"
                                        title="Indent"
                                    >
                                        →
                                    </button>
                                    <div className="w-px bg-gray-300 mx-1"></div>
                                    
                                    {/* Table */}
                                    <button
                                        onClick={() => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
                                        className="p-2 rounded hover:bg-gray-200 text-gray-900"
                                        title="Insert Table"
                                    >
                                        Table
                                    </button>
                                    
                                    {/* Link */}
                                    <button
                                        onClick={() => {
                                            const url = window.prompt('Enter URL:');
                                            if (url) {
                                                editor?.chain().focus().setLink({ href: url }).run();
                                            }
                                        }}
                                        className="p-2 rounded hover:bg-gray-200 text-gray-900"
                                        title="Add Link"
                                    >
                                        Link
                                    </button>
                                    
                                    {/* Image */}
                                    <button
                                        onClick={() => {
                                            const url = window.prompt('Enter Image URL:');
                                            if (url) {
                                                editor?.chain().focus().setImage({ src: url }).run();
                                            }
                                        }}
                                        className="p-2 rounded hover:bg-gray-200 text-gray-900"
                                        title="Add Image"
                                    >
                                        🖼️
                                    </button>
                                    
                                    {/* Clear Formatting */}
                                    <button
                                        onClick={() => editor?.chain().focus().unsetAllMarks().run()}
                                        className="p-2 rounded hover:bg-gray-200 text-gray-900"
                                        title="Clear Formatting"
                                    >
                                        🗑️
                                    </button>
                                </div>
                                
                                {/* Editor Content */}
                                <div className="min-h-[300px]">
                                    {editor ? <EditorContent editor={editor} /> : <div className="p-4 text-gray-500">Loading editor...</div>}
                                </div>
                            </div>
                            
                            <p className="text-xs text-gray-500 mt-2">
                                <i className="icon-book"></i> 
                                <a 
                                    href="https://mypaper.52go.tw/17web/96/50461/" 
                                    target="_blank"
                                    className="text-blue-600 hover:underline"
                                >
                                    上傳圖片說明
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                        <Link
                            href="/admin/events"
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            取消
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FaSave /> {processing ? '儲存中...' : '新增活動'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}