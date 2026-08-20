import { Head, Link } from '@inertiajs/react';
import { 
    FaSearch, FaPlus, FaCalendar, FaUser, FaPhone, FaEdit, 
    FaTrash, FaCog, FaTag, FaMagic, FaEye, FaPrint, FaHome, 
    FaPlusCircle, FaComments, FaSignInAlt
} from 'react-icons/fa';

export default function EventManagement() {
    const events = [
        {
            id: 3871,
            title: '1. 我要申請入會',
            status: '停止報名',
            status_color: 'red',
            date_start: '2027-12-25',
            date_end: '2099-07-25',
            signup_count: 0,
            views: 4,
            category: '本會活動',
            signup_start: '2025-07-25',
            signup_end: '2026-08-06',
            is_open: false,
            qa_count: '0/0',
            qa_status: '關閉中',
            checkin: 0,
            absent: 0,
            attendance_rate: '0%',
            income: 0,
            expense: 0,
            total: 0
        }
    ];

    return (
        <>
            <Head title="活動管理" />
            
            <div className="bg-white rounded-xl shadow-sm p-6">
                {/* Header */}
                <div className="border-b border-gray-200 pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">活動管理</h2>
                    <p className="text-sm text-gray-500 mt-1">管理所有活動</p>
                </div>

                {/* Month Quick Select */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                    <button className="bg-gray-200 hover:bg-gray-300 px-4 py-1 rounded text-sm">全部</button>
                    <button className="bg-blue-100 hover:bg-blue-200 px-4 py-1 rounded text-sm">2026-07</button>
                    <button className="bg-blue-100 hover:bg-blue-200 px-4 py-1 rounded text-sm">2026-08</button>
                    <button className="bg-blue-100 hover:bg-blue-200 px-4 py-1 rounded text-sm">2026-09</button>
                    <button className="bg-blue-100 hover:bg-blue-200 px-4 py-1 rounded text-sm">2026-10</button>
                </div>

                {/* Search & Filter Tools */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    {/* Row 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <FaCalendar className="inline mr-1" /> 日期
                            </label>
                            <div className="flex items-center gap-2">
                                <input type="date" className="border rounded px-2 py-1 text-sm w-full text-gray-900" defaultValue="2026-07-20" />
                                <span className="text-gray-500">~</span>
                                <input type="date" className="border rounded px-2 py-1 text-sm w-full text-gray-900" defaultValue="2026-09-20" />
                            </div>
                            <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700">
                                查詢
                            </button>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">報名編號</label>
                            <div className="flex gap-2">
                                <input type="number" className="border rounded px-2 py-1 text-sm w-20 text-gray-900" placeholder="編號" />
                                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                                    查詢
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">電話</label>
                            <div className="flex gap-2">
                                <input type="text" className="border rounded px-2 py-1 text-sm w-24 text-gray-900" placeholder="電話.." />
                                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                                    查詢
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                            <div className="flex gap-2">
                                <input type="text" className="border rounded px-2 py-1 text-sm w-24 text-gray-900" placeholder="姓名.." />
                                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                                    查詢
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">活動編號</label>
                            <div className="flex gap-2">
                                <input type="number" className="border rounded px-2 py-1 text-sm w-20 text-gray-900" placeholder="編號" />
                                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                                    查詢
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">活動主題</label>
                            <div className="flex gap-2">
                                <input type="text" className="border rounded px-2 py-1 text-sm w-32 text-gray-900" placeholder="活動主題.." />
                                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                                    查詢
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">分類</label>
                            <div className="flex gap-2">
                                <select className="border rounded px-2 py-1 text-sm w-full text-gray-900">
                                    <option value="">全部</option>
                                    <option value="728">本會活動</option>
                                </select>
                                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                                    分類查詢
                                </button>
                            </div>
                        </div>

                        {/* ✅ Add Event Button with Link - UPDATED */}
                        <div className="flex items-end">
                            <Link
                                href="/admin/events/create"
                                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors"
                            >
                                <svg 
                                    stroke="currentColor" 
                                    fill="currentColor" 
                                    strokeWidth="0" 
                                    viewBox="0 0 448 512" 
                                    height="1em" 
                                    width="1em" 
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
                                </svg>
                                新增活動
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Event List */}
                <div className="border rounded-lg overflow-hidden">
                    {events.map((event) => (
                        <div key={event.id} className="border-b border-gray-200 p-4 hover:bg-gray-50">
                            {/* Row 1: Title & Status */}
                            <div className="flex flex-wrap items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <FaHome className="text-gray-400" />
                                    <div>
                                        <div className="font-medium text-gray-900">{event.title}</div>
                                        <div className="text-xs text-gray-500 flex items-center gap-2">
                                            <span>閱:{event.views}</span>
                                            <button className="text-red-400 hover:text-red-600">
                                                <FaTrash size={12} />
                                            </button>
                                            <span className="text-gray-300">|</span>
                                            <span className="text-gray-400">{event.category}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${event.status_color === 'red' ? 'red' : 'green'}-100 text-${event.status_color === 'red' ? 'red' : 'green'}-800`}>
                                        {event.status}
                                    </span>
                                    <button className="text-gray-400 hover:text-gray-600" title="管理">
                                        <FaCog />
                                    </button>
                                </div>
                            </div>

                            {/* Row 2: Date */}
                            <div className="mt-2 text-sm text-gray-600">
                                <span>{event.date_start} ~ {event.date_end}</span>
                                <span className="ml-4 text-xs">
                                    <a href="#" className="text-blue-600 hover:underline">Google日曆</a>
                                </span>
                            </div>

                            {/* Row 3: Quick Stats Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                                    <div className="text-xs text-gray-500 font-medium">報名</div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-red-600 font-bold text-xl">{event.signup_count}</span>
                                        <span className="text-xs text-gray-400">人</span>
                                    </div>
                                    <a href="#" className="text-xs text-blue-600 hover:underline">報名詳細</a>
                                </div>

                                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                                    <div className="text-xs text-gray-500 font-medium">報到</div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-red-600 font-bold">{event.checkin}</span>
                                        <span className="text-xs text-gray-400">/</span>
                                        <span className="text-red-600 font-bold">{event.absent}</span>
                                        <span className="text-xs text-gray-400">缺席</span>
                                    </div>
                                    <div className="text-xs text-gray-500">出席率: {event.attendance_rate}</div>
                                    <div className="flex gap-2 mt-1">
                                        <a href="#" className="text-xs text-blue-600 hover:underline">手機報到</a>
                                        <a href="#" className="text-xs text-blue-600 hover:underline">
                                            <FaPrint className="inline" size={12} />
                                        </a>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                                    <div className="text-xs text-gray-500 font-medium">簽到退</div>
                                    <div className="flex gap-2 mt-1">
                                        <a href="#" className="text-xs text-blue-600 hover:underline">
                                            <FaSignInAlt className="inline mr-1" size={12} /> 簽到
                                        </a>
                                        <a href="#" className="text-xs text-blue-600 hover:underline">
                                            <FaSignInAlt className="inline mr-1" size={12} /> 簽退
                                        </a>
                                    </div>
                                    <a href="#" className="text-xs text-blue-600 hover:underline">詳細</a>
                                </div>

                                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                                    <div className="text-xs text-gray-500 font-medium">財務</div>
                                    <div className="flex flex-wrap gap-2 text-sm">
                                        <span>收入: <span className="text-red-600">{event.income}</span></span>
                                        <span>支出: <span className="text-green-600">{event.expense}</span></span>
                                        <span>總計: <span className="text-green-600">{event.total}</span></span>
                                    </div>
                                    <a href="#" className="text-xs text-blue-600 hover:underline">收支詳細</a>
                                </div>
                            </div>

                            {/* Row 4: Additional Info */}
                            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                    <FaComments className="text-gray-400" />
                                    <a href="#" className="text-blue-600 hover:underline">QA ({event.qa_count})</a>
                                    <span className="text-red-500">【{event.qa_status}】</span>
                                </div>
                                <div>
                                    報名: {event.signup_start} ~ {event.signup_end}
                                    {!event.is_open && (
                                        <span className="text-red-500 ml-2">
                                            <FaSearch className="inline mr-1" size={12} /> 不開放報名
                                        </span>
                                    )}
                                </div>
                                <a href="#" className="text-blue-600 hover:underline">
                                    <FaPlusCircle className="inline mr-1" size={12} /> 現場報名
                                </a>
                            </div>

                            {/* Row 5: Actions */}
                            <div className="flex flex-wrap items-center gap-2 mt-3 pt-2 border-t border-gray-100">
                                <button className="text-blue-600 hover:text-blue-800 text-sm" title="編輯內容">
                                    <FaEdit className="inline mr-1" size={14} /> 改內容
                                </button>
                                <button className="text-gray-600 hover:text-gray-800 text-sm" title="設定">
                                    <FaCog className="inline mr-1" size={14} /> 設定
                                </button>
                                <button className="text-purple-600 hover:text-purple-800 text-sm" title="工作分配">
                                    <FaTag className="inline mr-1" size={14} /> 工作分配
                                </button>
                                <button className="text-green-600 hover:text-green-800 text-sm" title="遊戲">
                                    <FaMagic className="inline mr-1" size={14} /> 遊戲
                                </button>
                                <button className="text-orange-600 hover:text-orange-800 text-sm" title="隱藏">
                                    <FaEye className="inline mr-1" size={14} /> 隱藏
                                </button>
                                <button className="text-red-600 hover:text-red-800 text-sm" title="刪除">
                                    <FaTrash className="inline mr-1" size={14} /> 刪除
                                </button>
                                <div className="ml-auto flex items-center gap-2">
                                    <span className="text-xs">排：</span>
                                    <input type="text" className="border rounded px-1 py-0.5 w-10 text-sm" defaultValue="999" />
                                    <button className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs hover:bg-blue-600">修改</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-gray-600">
                        共 1 筆 - 在 1 頁 - 共 1 頁
                    </div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border rounded text-sm hover:bg-gray-50">首頁</button>
                        <button className="px-3 py-1 border rounded text-sm bg-blue-600 text-white">1</button>
                        <button className="px-3 py-1 border rounded text-sm hover:bg-gray-50">末頁</button>
                    </div>
                </div>
            </div>
        </>
    );
}