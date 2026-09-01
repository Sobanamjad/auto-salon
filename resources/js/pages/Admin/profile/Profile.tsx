// resources/js/pages/Admin/Profile.tsx
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { 
    FaSave, FaTimes, FaUser, FaEnvelope, FaPhone, 
    FaMapMarkerAlt, FaLink, FaBuilding, FaUniversity,
    FaLine, FaWeixin, FaSkype, FaFacebook, FaInstagram,
    FaTwitter, FaGlobe, FaClock, FaTag, FaFileAlt,
    FaInfoCircle, FaKey, FaEye, FaEyeSlash
} from 'react-icons/fa';

interface User {
    id: number;
    name: string;
    nickname: string;
    email: string;
    email2: string;
    phone1: string;
    phone2: string;
    address: string;
    website: string;
    working_hours: string;
    slogan: string;
    brief: string;
    description: string;
    bank_account: string;
    remark: string;
    position: string;
    company_name: string;
    vat_number: string;
    fax: string;
    line_id: string;
    line_url: string;
    line_message_status: number;
    line_channel_id: string;
    line_access_token: string;
    line_secret: string;
    line_user_id: string;
    wechat: string;
    skype: string;
    facebook: string;
    instagram: string;
    twitter: string;
    weibo: string;
    is_published: number;
    e_name_card: number;
    is_meet: number;
    ad_content: string;
    ad_url: string;
}

interface Props {
    title?: string;
    user: User;
    isEdit?: boolean;
}

export default function Profile({ title = '個人帳號資料', user, isEdit = true }: Props) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, put, processing, errors } = useForm({
        // Account Settings
        new_isshow: user.is_published ?? 0,
        e_name_card: user.e_name_card ?? 0,
        is_meet: user.is_meet ?? 0,
        new_webpw: '',

        // Personal Info
        new_name: user.name || '',
        name_brief: user.nickname || '',
        new_tel1: user.phone1 || '',
        new_tel2: user.phone2 || '',

        // Email
        new_email: user.email || '',
        new_email2: user.email2 || '',

        // Social Media
        new_line: user.line_id || '',
        line_url: user.line_url || '',
        line_message_status: user.line_message_status || 0,
        line_message_channel_id: user.line_channel_id || '',
        line_message_access_token: user.line_access_token || '',
        line_message_secret: user.line_secret || '',
        line_message_user_id: user.line_user_id || '',
        wechat: user.wechat || '',
        new_skype: user.skype || '',
        new_fb: user.facebook || '',
        ig: user.instagram || '',
        twitter: user.twitter || '',
        weibo: user.weibo || '',

        // Location
        new_addr: user.address || '',

        // Business
        new_url: user.website || '',
        working_hours: user.working_hours || '',
        slogan: user.slogan || '',
        per_brief: user.brief || '',
        per_cond: user.description || '',

        // Bank
        bank: user.bank_account || '',

        // Other
        new_note: user.remark || '',
        new_rule: user.position || '',
        new_unicode: user.vat_number || '',
        new_fax: user.fax || '',
        pd_cate_2_name: user.company_name || '',

        // Ad
        ad_content: user.ad_content || '',
        ad_url: user.ad_url || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put('/admin/profile');
    };

    return (
        <>
            <Head title={title} />
            
            <div className="bg-white rounded-xl shadow-sm p-6 text-gray-900">
                {/* Header */}
                <div className="border-b border-gray-200 pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FaUser className="text-blue-500" /> {title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">管理您的個人帳號資料</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* ===== ACCOUNT SETTINGS ===== */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaKey className="text-blue-500" /> 帳戶設定
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">是否發佈</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            value={1}
                                            checked={data.new_isshow === 1}
                                            onChange={() => setData('new_isshow', 1)}
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <span className="text-blue-600">發佈</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            value={0}
                                            checked={data.new_isshow === 0}
                                            onChange={() => setData('new_isshow', 0)}
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <span className="text-red-600">不發佈</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">電子名片</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            value={1}
                                            checked={data.e_name_card === 1}
                                            onChange={() => setData('e_name_card', 1)}
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <span className="text-blue-600">前台發佈</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            value={0}
                                            checked={data.e_name_card === 0}
                                            onChange={() => setData('e_name_card', 0)}
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <span className="text-red-600">前台不發佈</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">視訊會議</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            value={1}
                                            checked={data.is_meet === 1}
                                            onChange={() => setData('is_meet', 1)}
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <span className="text-blue-600">前台發佈</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            value={0}
                                            checked={data.is_meet === 0}
                                            onChange={() => setData('is_meet', 0)}
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <span className="text-red-600">前台不發佈</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">密碼 <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.new_webpw}
                                        onChange={(e) => setData('new_webpw', e.target.value)}
                                        placeholder="留空則不變更"
                                        className="w-full border rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {errors.new_webpw && (
                                    <div className="text-red-500 text-xs mt-1">{errors.new_webpw}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ===== PERSONAL INFO ===== */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaUser className="text-green-500" /> 個人資料
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">姓名 <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={data.new_name}
                                    onChange={(e) => setData('new_name', e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.new_name && (
                                    <div className="text-red-500 text-xs mt-1">{errors.new_name}</div>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">暱稱 <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={data.name_brief}
                                    onChange={(e) => setData('name_brief', e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.name_brief && (
                                    <div className="text-red-500 text-xs mt-1">{errors.name_brief}</div>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">電話1</label>
                                <input
                                    type="text"
                                    value={data.new_tel1}
                                    onChange={(e) => setData('new_tel1', e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">電話2</label>
                                <input
                                    type="text"
                                    value={data.new_tel2}
                                    onChange={(e) => setData('new_tel2', e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ===== EMAIL ===== */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaEnvelope className="text-purple-500" /> 電子信箱
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail (1)</label>
                                <input
                                    type="email"
                                    value={data.new_email}
                                    onChange={(e) => setData('new_email', e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.new_email && (
                                    <div className="text-red-500 text-xs mt-1">{errors.new_email}</div>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail (2)</label>
                                <input
                                    type="email"
                                    value={data.new_email2}
                                    onChange={(e) => setData('new_email2', e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.new_email2 && (
                                    <div className="text-red-500 text-xs mt-1">{errors.new_email2}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ===== SOCIAL MEDIA ===== */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaLink className="text-yellow-500" /> 通訊社群
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                    <FaLine className="text-green-500" /> LINE ID
                                </label>
                                <input
                                    type="text"
                                    value={data.new_line}
                                    onChange={(e) => setData('new_line', e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                    <FaLine className="text-green-500" /> LINE 連結點
                                </label>
                                <input
                                    type="text"
                                    value={data.line_url}
                                    onChange={(e) => setData('line_url', e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.line_url && (
                                    <div className="text-red-500 text-xs mt-1">{errors.line_url}</div>
                                )}
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">LINE 連動</label>
                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={data.line_message_status === 1}
                                            onChange={(e) => setData('line_message_status', e.target.checked ? 1 : 0)}
                                            className="w-4 h-4 text-blue-600 rounded"
                                        />
                                        <span>啟動</span>
                                    </label>
                                </div>
                                {data.line_message_status === 1 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 p-3 bg-white rounded border">
                                        <div>
                                            <label className="block text-xs text-gray-600">頻道代號</label>
                                            <input
                                                type="text"
                                                value={data.line_message_channel_id}
                                                onChange={(e) => setData('line_message_channel_id', e.target.value)}
                                                className="w-full border rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-600">頻道令牌</label>
                                            <input
                                                type="text"
                                                value={data.line_message_access_token}
                                                onChange={(e) => setData('line_message_access_token', e.target.value)}
                                                className="w-full border rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-600">頻道鑰匙</label>
                                            <input
                                                type="text"
                                                value={data.line_message_secret}
                                                onChange={(e) => setData('line_message_secret', e.target.value)}
                                                className="w-full border rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-600">接收者ID</label>
                                            <input
                                                type="text"
                                                value={data.line_message_user_id}
                                                onChange={(e) => setData('line_message_user_id', e.target.value)}
                                                className="w-full border rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                    <FaWeixin className="text-green-600" /> WeChat
                                </label>
                                <input
                                    type="text"
                                    value={data.wechat}
                                    onChange={(e) => setData('wechat', e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                    <FaSkype className="text-blue-400" /> SKYPE
                                </label>
                                <input
                                    type="text"
                                    value={data.new_skype}
                                    onChange={(e) => setData('new_skype', e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                    <FaFacebook className="text-blue-600" /> Facebook
                                </label>
                                <input
                                    type="text"
                                    value={data.new_fb}
                                    onChange={(e) => setData('new_fb', e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.new_fb && (
                                    <div className="text-red-500 text-xs mt-1">{errors.new_fb}</div>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                    <FaInstagram className="text-pink-600" /> IG
                                </label>
                                <input
                                    type="text"
                                    value={data.ig}
                                    onChange={(e) => setData('ig', e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                    <FaTwitter className="text-blue-400" /> TWITTER
                                </label>
                                <input
                                    type="text"
                                    value={data.twitter}
                                    onChange={(e) => setData('twitter', e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                    <FaGlobe className="text-red-500" /> 微博
                                </label>
                                <input
                                    type="text"
                                    value={data.weibo}
                                    onChange={(e) => setData('weibo', e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ===== LOCATION ===== */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaMapMarkerAlt className="text-red-500" /> 地址
                        </h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">地址</label>
                            <input
                                type="text"
                                value={data.new_addr}
                                onChange={(e) => setData('new_addr', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* ===== BUSINESS ===== */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaBuilding className="text-blue-500" /> 商業資料
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">廠商名稱</label>
                                <input
                                    type="text"
                                    value={data.pd_cate_2_name}
                                    onChange={(e) => setData('pd_cate_2_name', e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">統編</label>
                                <input
                                    type="text"
                                    value={data.new_unicode}
                                    onChange={(e) => setData('new_unicode', e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">傳真</label>
                                <input
                                    type="text"
                                    value={data.new_fax}
                                    onChange={(e) => setData('new_fax', e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">職務說明</label>
                                <input
                                    type="text"
                                    value={data.new_rule}
                                    onChange={(e) => setData('new_rule', e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                    <FaLink /> 網址
                                </label>
                                <input
                                    type="text"
                                    value={data.new_url}
                                    onChange={(e) => setData('new_url', e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.new_url && (
                                    <div className="text-red-500 text-xs mt-1">{errors.new_url}</div>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                    <FaClock /> 個人營業時間
                                </label>
                                <input
                                    type="text"
                                    value={data.working_hours}
                                    onChange={(e) => setData('working_hours', e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                    <FaTag /> Slogan
                                </label>
                                <input
                                    type="text"
                                    value={data.slogan}
                                    onChange={(e) => setData('slogan', e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">個人簡述</label>
                                <textarea
                                    value={data.per_brief}
                                    onChange={(e) => setData('per_brief', e.target.value)}
                                    rows={3}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">個人詳細</label>
                                <textarea
                                    value={data.per_cond}
                                    onChange={(e) => setData('per_cond', e.target.value)}
                                    rows={6}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ===== BANK ===== */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaUniversity className="text-indigo-500" /> 銀行帳戶
                        </h3>
                        <textarea
                            value={data.bank}
                            onChange={(e) => setData('bank', e.target.value)}
                            rows={4}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* ===== ADVERTISEMENT ===== */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaFileAlt className="text-orange-500" /> 廣告設定
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">廣告內容</label>
                                <textarea
                                    value={data.ad_content}
                                    onChange={(e) => setData('ad_content', e.target.value)}
                                    rows={5}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">廣告網址</label>
                                <input
                                    type="text"
                                    value={data.ad_url}
                                    onChange={(e) => setData('ad_url', e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.ad_url && (
                                    <div className="text-red-500 text-xs mt-1">{errors.ad_url}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ===== REMARK ===== */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaInfoCircle className="text-gray-500" /> 備註
                        </h3>
                        <textarea
                            value={data.new_note}
                            onChange={(e) => setData('new_note', e.target.value)}
                            rows={3}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* ===== SUBMIT ===== */}
                    <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-200">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                            <FaSave /> {processing ? '處理中...' : '送出資料'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}