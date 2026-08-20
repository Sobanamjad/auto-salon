import { Head, Link } from '@inertiajs/react';
import { FaSearch, FaPlus, FaCalendar, FaUser, FaPhone, FaEdit, FaTrash, FaCog, FaTag, FaMagic, FaEye, FaPrint, FaHome, FaPlusCircle } from 'react-icons/fa';

export default function EventManagement() {
    // Sample event data (yeh aap API se la sakte hain)
    const events = [
        {
            id: 3871,
            title: '1. 我要申請入會',
            status: '停止報名',
            date_start: '2027-12-25',
            date_end: '2099-07-25',
            signup_count: 0,
            views: 4,
            category: '本會活動'
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

                {/* Search & Filter Tools */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Date Filter */}
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

                        {/* Registration Number */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">報名編號</label>
                            <div className="flex gap-2">
                                <input type="number" className="border rounded px-2 py-1 text-sm w-20 text-gray-900" placeholder="編號" />
                                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                                    查詢
                                </button>
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">電話</label>
                            <div className="flex gap-2">
                                <input type="text" className="border rounded px-2 py-1 text-sm w-24 text-gray-900" placeholder="電話.." />
                                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                                    查詢
                                </button>
                            </div>
                        </div>

                        {/* Name */}
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

                    {/* Second Row */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                        {/* Event ID */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">活動編號</label>
                            <div className="flex gap-2">
                                <input type="number" className="border rounded px-2 py-1 text-sm w-20 text-gray-900" placeholder="編號" />
                                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                                    查詢
                                </button>
                            </div>
                        </div>

                        {/* Event Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">活動主題</label>
                            <div className="flex gap-2">
                                <input type="text" className="border rounded px-2 py-1 text-sm w-32 text-gray-900" placeholder="活動主題.." />
                                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                                    查詢
                                </button>
                            </div>
                        </div>

                        {/* Category */}
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

                        {/* Add New Button */}
                        <div className="flex items-end">
                            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2">
                                <FaPlus /> 新增活動
                            </button>
                        </div>
                    </div>
                </div>

                {/* Event List */}
                <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">活動</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">日期</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">報名</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">狀態</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">操作</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {events.map((event) => (
                                <tr key={event.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <FaHome className="text-gray-400" />
                                            <div>
                                                <div className="font-medium text-gray-900">{event.title}</div>
                                                <div className="text-xs text-gray-500">
                                                    閱:{event.views} 
                                                    <FaTrash className="inline ml-2 text-red-400 hover:text-red-600 cursor-pointer" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {event.date_start} ~ {event.date_end}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="text-red-600 font-bold text-xl">{event.signup_count}</span>
                                        <span className="text-xs text-gray-500 block">人</span>
                                        <Link href="#" className="text-xs text-blue-600 hover:underline">
                                            報名詳細
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                            {event.status}
                                        </span>
                                        <div className="text-xs text-gray-500 mt-1">
                                            {event.date_start} ~ {event.date_end}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2 flex-wrap">
                                            <button className="text-blue-600 hover:text-blue-800" title="編輯">
                                                <FaEdit />
                                            </button>
                                            <button className="text-gray-600 hover:text-gray-800" title="設定">
                                                <FaCog />
                                            </button>
                                            <button className="text-purple-600 hover:text-purple-800" title="工作分配">
                                                <FaTag />
                                            </button>
                                            <button className="text-green-600 hover:text-green-800" title="遊戲">
                                                <FaMagic />
                                            </button>
                                            <button className="text-red-600 hover:text-red-800" title="隱藏">
                                                <FaEye />
                                            </button>
                                            <button className="text-red-600 hover:text-red-800" title="刪除">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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