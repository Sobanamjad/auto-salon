import { Head, Link, useForm } from '@inertiajs/react';
import { 
    FaArrowLeft, FaSave, FaTimes, FaUsers, 
    FaUser, FaPhone, FaMobile, FaEnvelope, 
    FaBuilding, FaGraduationCap, FaTag, FaFileAlt,
    FaUserTie, FaBriefcase, FaCalendar, FaDollarSign,
    FaSort, FaUserCog, FaIdCard
} from 'react-icons/fa';

export default function MemberCreate() {
    const { data, setData, post, processing, errors } = useForm({
        member_no: '',
        name: '',
        gender: '',
        phone: '',
        mobile: '',
        email: '',
        username: '',
        password: '',
        company: '',
        position: '',
        school: '',
        department: '',
        category: '',
        category2: '',
        member_type: '',
        position_in_association: '',
        affiliated_unit: '',
        period_start: '',
        period_end: '',
        fee: '',
        note: '',
        sort_order: 99,
        status: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/members', {
            onSuccess: () => {
                window.location.href = '/admin/members';
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
            }
        });
    };

    return (
        <>
            <Head title="新增會員" />
            
            <div className="bg-white rounded-xl shadow-sm p-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Link 
                            href="/admin/members"
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <FaArrowLeft size={20} />
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <FaUsers className="text-blue-500" /> 新增會員
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">建立新的會員資料</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/admin/members"
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                            <FaTimes /> 取消返回
                        </Link>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaUser className="text-blue-500" /> 基本資料
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* 會員編號 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaIdCard className="inline mr-1" /> 會員編號
                                </label>
                                <input
                                    type="text"
                                    value={data.member_no}
                                    onChange={(e) => setData('member_no', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="例如: M001"
                                />
                                {errors.member_no && (
                                    <p className="text-red-500 text-sm mt-1">{errors.member_no}</p>
                                )}
                            </div>

                            {/* 姓名 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    姓名 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className={`w-full border rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 ${
                                        errors.name ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="請輸入姓名"
                                    required
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                )}
                            </div>

                            {/* 性別 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    性別
                                </label>
                                <select
                                    value={data.gender}
                                    onChange={(e) => setData('gender', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">請選擇</option>
                                    <option value="先生">先生</option>
                                    <option value="小姐">小姐</option>
                                </select>
                            </div>

                            {/* 電話 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaPhone className="inline mr-1" /> 電話
                                </label>
                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="市話"
                                />
                            </div>

                            {/* 手機 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaMobile className="inline mr-1" /> 手機
                                </label>
                                <input
                                    type="text"
                                    value={data.mobile}
                                    onChange={(e) => setData('mobile', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="手機號碼"
                                />
                            </div>

                            {/* 電子郵件 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaEnvelope className="inline mr-1" /> 電子郵件
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="email@example.com"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>

                            {/* 帳號 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaUserCog className="inline mr-1" /> 帳號
                                </label>
                                <input
                                    type="text"
                                    value={data.username}
                                    onChange={(e) => setData('username', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="登入帳號"
                                />
                                {errors.username && (
                                    <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                                )}
                            </div>

                            {/* 密碼 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaUserCog className="inline mr-1" /> 密碼
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="至少6碼"
                                />
                            </div>

                            {/* 排序 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaSort className="inline mr-1" /> 排序
                                </label>
                                <input
                                    type="number"
                                    value={data.sort_order}
                                    onChange={(e) => setData('sort_order', parseInt(e.target.value) || 99)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                />
                                <p className="text-xs text-gray-500 mt-1">數字小排在前</p>
                            </div>
                        </div>
                    </div>

                    {/* Company & School */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaBuilding className="text-blue-500" /> 公司/學校
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* 公司 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaBuilding className="inline mr-1" /> 公司
                                </label>
                                <input
                                    type="text"
                                    value={data.company}
                                    onChange={(e) => setData('company', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="公司名稱"
                                />
                            </div>

                            {/* 職稱 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaBriefcase className="inline mr-1" /> 職稱
                                </label>
                                <input
                                    type="text"
                                    value={data.position}
                                    onChange={(e) => setData('position', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="職稱"
                                />
                            </div>

                            {/* 學校 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaGraduationCap className="inline mr-1" /> 學校
                                </label>
                                <input
                                    type="text"
                                    value={data.school}
                                    onChange={(e) => setData('school', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="學校名稱"
                                />
                            </div>

                            {/* 系所 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaGraduationCap className="inline mr-1" /> 系所
                                </label>
                                <input
                                    type="text"
                                    value={data.department}
                                    onChange={(e) => setData('department', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="系所名稱"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Category & Member Type */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaTag className="text-blue-500" /> 分類/會員類型
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* 分類 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaTag className="inline mr-1" /> 分類
                                </label>
                                <select
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">請選擇</option>
                                    <option value="資訊科技">資訊科技</option>
                                    <option value="房屋交易">房屋交易</option>
                                    <option value="水電工程">水電工程</option>
                                </select>
                            </div>

                            {/* 分類2 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    分類2
                                </label>
                                <input
                                    type="text"
                                    value={data.category2}
                                    onChange={(e) => setData('category2', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="第二分類"
                                />
                            </div>

                            {/* 會員類型 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    會員類型
                                </label>
                                <select
                                    value={data.member_type}
                                    onChange={(e) => setData('member_type', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">請選擇</option>
                                    <option value="正式會員">正式會員</option>
                                    <option value="準會員">準會員</option>
                                    <option value="永久會員">永久會員</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Association Position */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaUserTie className="text-blue-500" /> 協會職務
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* 本屆職稱 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    本屆職稱
                                </label>
                                <input
                                    type="text"
                                    value={data.position_in_association}
                                    onChange={(e) => setData('position_in_association', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="例如: 理事、監事"
                                />
                            </div>

                            {/* 所屬單位 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    所屬單位
                                </label>
                                <input
                                    type="text"
                                    value={data.affiliated_unit}
                                    onChange={(e) => setData('affiliated_unit', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="所屬單位"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Period & Fee */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaCalendar className="text-blue-500" /> 期間/費用
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* 期間開始 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    期間開始
                                </label>
                                <input
                                    type="date"
                                    value={data.period_start}
                                    onChange={(e) => setData('period_start', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* 期間結束 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    期間結束
                                </label>
                                <input
                                    type="date"
                                    value={data.period_end}
                                    onChange={(e) => setData('period_end', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.period_end && (
                                    <p className="text-red-500 text-sm mt-1">{errors.period_end}</p>
                                )}
                            </div>

                            {/* 費用 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaDollarSign className="inline mr-1" /> 費用
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={data.fee}
                                    onChange={(e) => setData('fee', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="0.00"
                                />
                                {errors.fee && (
                                    <p className="text-red-500 text-sm mt-1">{errors.fee}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Note */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <FaFileAlt className="inline mr-1" /> 備註
                        </label>
                        <textarea
                            value={data.note}
                            onChange={(e) => setData('note', e.target.value)}
                            rows={3}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                            placeholder="請輸入備註..."
                        />
                    </div>

                    {/* Status */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            狀態
                        </label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    checked={data.status === true}
                                    onChange={() => setData('status', true)}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <span className="text-blue-600">啟用</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    checked={data.status === false}
                                    onChange={() => setData('status', false)}
                                    className="w-4 h-4 text-red-600"
                                />
                                <span className="text-red-600">停用</span>
                            </label>
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                        <Link
                            href="/admin/members"
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            取消返回
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                            <FaSave /> {processing ? '儲存中...' : '送出資料'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}