// BasicSettings.tsx
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { 
    FaHome, FaCog, FaBell, FaCalendarAlt, FaPlug, 
    FaGlobe, FaImage, FaLock, FaMobile, FaLine, FaFacebook, 
    FaGoogle, FaRobot, FaEnvelope, FaSms
} from 'react-icons/fa';

export default function BasicSettings() {
    const [activeTab, setActiveTab] = useState('frontend');

    const tabs = [
        { id: 'frontend', label: '前台設定', icon: FaHome },
        { id: 'general', label: '通用設定', icon: FaCog },
        { id: 'notification', label: '通知設定', icon: FaBell },
        { id: 'events', label: '活動設定', icon: FaCalendarAlt },
        { id: 'plugins', label: '外掛', icon: FaPlug },
    ];

    return (
        <>
            <Head title="基本設定" />
            
            <div className="bg-white rounded-xl shadow-sm p-6">
                {/* Header */}
                <div className="border-b border-gray-200 pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FaCog className="text-blue-500" /> 基本設定
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">系統基本設定管理</p>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 border-b border-gray-200 mb-6">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2 rounded-t-lg flex items-center gap-2 transition-colors ${
                                    activeTab === tab.id
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                <Icon size={16} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Tab Content - Frontend Settings */}
                {activeTab === 'frontend' && (
                    <div className="space-y-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <FaGlobe className="text-blue-500" /> 前台設定
                            </h3>
                            
                            {/* URL Mapping */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    網址對應
                                </label>
                                <div className="flex items-center gap-2">
                                    <a href="#" className="text-blue-600 hover:underline">
                                        http://demo.b-partner.org
                                    </a>
                                    <button className="text-gray-400 hover:text-blue-600">
                                        <FaCog size={14} />
                                    </button>
                                    <button className="text-red-400 hover:text-red-600">
                                        ✕
                                    </button>
                                </div>
                                <button className="mt-2 text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                                    ＋ 添加網址
                                </button>
                            </div>

                            {/* Template Selection */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    模版選擇
                                </label>
                                <select className="w-full md:w-64 border rounded-lg px-3 py-2 text-gray-900">
                                    <option>M. 漸變菱(藍漸青)</option>
                                    <option>A. 清新小品版(經典灰)</option>
                                    <option>B. 優美質感版(可愛粉)</option>
                                    {/* More options... */}
                                </select>
                                <button className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                    更改模版
                                </button>
                                <a href="#" className="ml-2 text-blue-600 hover:underline">
                                    模版一覽
                                </a>
                            </div>

                            {/* Frontend Menu */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    前台選單
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {['關於本會', '最新消息', '本會記事', '理監事(組織)', '會員資訊', '活動報名'].map((menu) => (
                                        <div key={menu} className="flex items-center gap-2 bg-white p-2 rounded border">
                                            <span className="text-sm">{menu}</span>
                                            <button className="text-blue-500 hover:text-blue-700">
                                                <FaCog size={12} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button className="mt-2 text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                                    ＋ 自訂選單
                                </button>
                            </div>

                            {/* Social Icons */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    前台右圖示
                                </label>
                                <div className="flex flex-wrap gap-4 mb-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                                        <span className="text-red-500">顯示選單</span>
                                    </label>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                                        <span className="text-red-500">LINE</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>WeChat</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                                        <span className="text-blue-600">FB</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                                        <span className="text-purple-600">IG</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                                        <span>打電話</span>
                                    </label>
                                </div>
                                <div className="flex flex-wrap gap-4 mt-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                                        <span>FB messager</span>
                                    </label>
                                    <span className="text-xs text-gray-500">(獨立，需設定FB粉絲專頁編號)</span>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    注意：需有資料前台才開啟 ( 網頁模組 » 公司資料 » 修改 [繁中] 資料 )，[打電話]請填寫電話4欄位
                                </div>
                            </div>

                            {/* Mobile Bottom Icons */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    (手機版) 前台下圖示
                                </label>
                                <div className="flex flex-wrap gap-4 mb-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                                        <span className="text-red-500">顯示選單</span>
                                    </label>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                                        <span className="text-red-500">LINE</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>WeChat</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                                        <span className="text-blue-600">FB</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                                        <span className="text-purple-600">IG</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                                        <span>打電話</span>
                                    </label>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    注意：需有資料前台才開啟 ( 網頁模組 » 公司資料 » 修改 [繁中] 資料 )，[打電話]請填寫電話4欄位
                                </div>
                            </div>

                            {/* Popup Window */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    首頁彈出視窗
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="popup" defaultChecked className="w-4 h-4" />
                                        <span>不使用</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="popup" className="w-4 h-4" />
                                        <span className="text-red-500">使用</span>
                                    </label>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    注意：1.需要有內容。 2.僅在首次訪問網頁時出現，彈出後關閉就會消失。
                                </div>
                            </div>

                            {/* Popup Window Style */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    視窗樣式
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="popup_type" defaultChecked className="w-4 h-4" />
                                        <span>資訊</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="popup_type" className="w-4 h-4" />
                                        <span className="text-red-500">通知</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="popup_type" className="w-4 h-4" />
                                        <span className="text-blue-600">警告</span>
                                    </label>
                                </div>
                            </div>

                            {/* Popup Content with Rich Text Editor */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    彈窗內容
                                </label>
                                <textarea 
                                    rows={6}
                                    className="w-full border rounded-lg px-3 py-2 text-gray-900"
                                    placeholder="請輸入彈窗內容..."
                                />
                                <div className="text-xs text-gray-500 mt-1">
                                    * 目前使用簡單文字輸入，未來可整合 TinyMCE 或其他富文本編輯器
                                </div>
                            </div>

                            {/* Frontend Member Button */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    前台會員按鈕
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="member_btn" className="w-4 h-4" />
                                        <span>不顯示</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="member_btn" defaultChecked className="w-4 h-4" />
                                        <span className="text-red-500">顯示</span>
                                    </label>
                                </div>
                            </div>

                            {/* Frontend System Login Button */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    前台系統登入按鈕
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="admin_btn" className="w-4 h-4" />
                                        <span>不顯示</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="admin_btn" defaultChecked className="w-4 h-4" />
                                        <span className="text-red-500">顯示</span>
                                    </label>
                                </div>
                            </div>

                            {/* Click Counter */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    點閱數
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="counter" defaultChecked className="w-4 h-4" />
                                        <span>不顯示</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="counter" className="w-4 h-4" />
                                        <span className="text-red-500">顯示</span>
                                    </label>
                                </div>
                            </div>

                            {/* Notes */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    備註
                                </label>
                                <textarea 
                                    rows={2}
                                    className="w-full border rounded-lg px-3 py-2 text-gray-900"
                                    placeholder="請輸入備註..."
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab Content - General Settings */}
                {activeTab === 'general' && (
                    <div className="space-y-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <FaImage className="text-blue-500" /> 通用設定
                            </h3>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    替代圖
                                </label>
                                <div className="flex items-center gap-4">
                                    <img src="/placeholder.png" alt="替代圖" className="h-20 border rounded" />
                                    <button className="text-red-500 hover:text-red-700">移除相片</button>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    浮水印
                                </label>
                                <input type="file" className="block w-full text-sm text-gray-500" />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    隱私權說明
                                </label>
                                <textarea 
                                    rows={6}
                                    className="w-full border rounded-lg px-3 py-2 text-gray-900"
                                    placeholder="請輸入隱私權說明..."
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    手機下載捷徑
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="manifest" defaultChecked className="w-4 h-4" />
                                        <span>不開放安裝</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="manifest" className="w-4 h-4" />
                                        <span className="text-red-500">開放安裝</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab Content - Notification Settings */}
                {activeTab === 'notification' && (
                    <div className="space-y-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <FaBell className="text-blue-500" /> 通知設定
                            </h3>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    通知帳號
                                </label>
                                <div className="flex items-center gap-2">
                                    <span>社團達人展示</span>
                                    <button className="text-blue-500 hover:text-blue-700">更換</button>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    通知信箱
                                </label>
                                <div className="flex items-center gap-2">
                                    <span>service@posu.com.tw</span>
                                    <button className="text-blue-500 hover:text-blue-700">更換</button>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaLine className="inline text-green-500" /> LINE 連動
                                </label>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>啟動</span>
                                    </label>
                                    <input type="text" placeholder="頻道代號" className="w-full md:w-64 border rounded px-3 py-1" />
                                    <input type="text" placeholder="頻道令牌" className="w-full md:w-64 border rounded px-3 py-1" />
                                    <input type="text" placeholder="頻道鑰匙" className="w-full md:w-64 border rounded px-3 py-1" />
                                </div>
                                <a href="#" className="text-blue-600 hover:underline text-sm">教學</a>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    官網留言
                                </label>
                                <div className="flex flex-wrap gap-4">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                                        <span>E-Mail</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                                        <span>LINE</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>簡訊</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab Content - Event Settings */}
                {activeTab === 'events' && (
                    <div className="space-y-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <FaCalendarAlt className="text-blue-500" /> 活動設定
                            </h3>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    總公司的活動
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="agent_events" className="w-4 h-4" />
                                        <span>不開放到自己網站</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="agent_events" defaultChecked className="w-4 h-4" />
                                        <span className="text-red-500">開放到自己網站</span>
                                    </label>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    活動證書底圖
                                </label>
                                <input type="file" className="block w-full text-sm text-gray-500" />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaGoogle className="inline text-red-500" /> Google 日曆
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="google_cal" className="w-4 h-4" />
                                        <span>前台不開放</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="google_cal" defaultChecked className="w-4 h-4" />
                                        <span className="text-red-500">前台開放</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab Content - Plugins */}
                {activeTab === 'plugins' && (
                    <div className="space-y-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <FaPlug className="text-blue-500" /> 外掛設定
                            </h3>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaRobot className="inline text-purple-500" /> Gemini AI API KEY
                                </label>
                                <input 
                                    type="text" 
                                    className="w-full border rounded-lg px-3 py-2 text-gray-900"
                                    placeholder="請輸入 Gemini API Key"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaGoogle className="inline text-red-500" /> Google Analytics
                                </label>
                                <input 
                                    type="text" 
                                    className="w-full border rounded-lg px-3 py-2 text-gray-900"
                                    placeholder="GA-XXXXX-XX"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaGoogle className="inline text-red-500" /> Google Tag Manager
                                </label>
                                <input 
                                    type="text" 
                                    className="w-full border rounded-lg px-3 py-2 text-gray-900"
                                    placeholder="GTM-XXXXXXX"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaFacebook className="inline text-blue-600" /> Facebook Pixel
                                </label>
                                <input 
                                    type="text" 
                                    className="w-full border rounded-lg px-3 py-2 text-gray-900"
                                    placeholder="XXXXXXXX"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        儲存設定
                    </button>
                </div>
            </div>
        </>
    );
}