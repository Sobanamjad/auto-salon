import { Head, Link, useForm } from '@inertiajs/react';
import { 
    FaArrowLeft, FaSave, FaTimes, FaBriefcase, 
    FaUser, FaPhone, FaMobile, FaEnvelope, 
    FaBuilding, FaMapMarkerAlt, FaCalendar, FaDollarSign,
    FaSort, FaTag, FaUsers, FaFileAlt, FaGlobe, FaGraduationCap
} from 'react-icons/fa';

export default function JobCreate() {
    const { data, setData, post, processing, errors } = useForm({
        language: 'TS',
        status: true,
        show_on_home: false,
        sort_order: 999,
        published_start: new Date().toISOString().split('T')[0],
        published_end: '2200-12-31',
        job_no: '',
        company: '',
        contact_person: '',
        contact_gender: '先生',
        contact_phone: '',
        contact_mobile: '',
        contact_email: '',
        contact_web: '',
        work_location: '',
        work_area: '台南市仁德區',
        nearby_school_1: '',
        nearby_school_2: '',
        job_title: '',
        salary: '',
        work_hours: '',
        vacancies: '',
        job_category: '',
        job_content: '',
        job_requirements: '',
        note: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/jobs', {
            onSuccess: () => {
                window.location.href = '/admin/jobs';
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
            }
        });
    };

    return (
        <>
            <Head title="新增職缺" />
            
            <div className="bg-white rounded-xl shadow-sm p-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Link 
                            href="/admin/jobs"
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <FaArrowLeft size={20} />
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <FaBriefcase className="text-blue-500" /> 新增職缺
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">建立新的職缺招募</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/admin/jobs"
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                            <FaTimes /> 取消返回
                        </Link>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Date & Settings */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaCalendar className="inline mr-1" /> 刊登開始
                                </label>
                                <input
                                    type="date"
                                    value={data.published_start}
                                    onChange={(e) => setData('published_start', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaCalendar className="inline mr-1" /> 刊登結束
                                </label>
                                <input
                                    type="date"
                                    value={data.published_end}
                                    onChange={(e) => setData('published_end', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.published_end && (
                                    <p className="text-red-500 text-sm mt-1">{errors.published_end}</p>
                                )}
                            </div>
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
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    是否發佈
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            checked={data.status === true}
                                            onChange={() => setData('status', true)}
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <span className="text-blue-600">發佈</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            checked={data.status === false}
                                            onChange={() => setData('status', false)}
                                            className="w-4 h-4 text-red-600"
                                        />
                                        <span className="text-red-600">不發佈</span>
                                    </label>
                                </div>
                            </div>
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
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <span className="text-blue-600">顯示</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            checked={data.show_on_home === false}
                                            onChange={() => setData('show_on_home', false)}
                                            className="w-4 h-4 text-red-600"
                                        />
                                        <span className="text-red-600">不顯示</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    編號
                                </label>
                                <input
                                    type="text"
                                    value={data.job_no}
                                    onChange={(e) => setData('job_no', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="例如: J001"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Company Information */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaBuilding className="text-blue-500" /> 徵才單位
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    求才單位 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.company}
                                    onChange={(e) => setData('company', e.target.value)}
                                    className={`w-full border rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 ${
                                        errors.company ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="請輸入求才單位"
                                    required
                                />
                                {errors.company && (
                                    <p className="text-red-500 text-sm mt-1">{errors.company}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    工作地點
                                </label>
                                <input
                                    type="text"
                                    value={data.work_location}
                                    onChange={(e) => setData('work_location', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="例如: 台南市仁德區"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaMapMarkerAlt className="inline mr-1" /> 所在地區
                                </label>
                                <input
                                    type="text"
                                    value={data.work_area}
                                    onChange={(e) => setData('work_area', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="台南市仁德區"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Person */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaUser className="text-blue-500" /> 聯絡人資訊
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    聯絡人
                                </label>
                                <input
                                    type="text"
                                    value={data.contact_person}
                                    onChange={(e) => setData('contact_person', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="姓名"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    性別
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            checked={data.contact_gender === '先生'}
                                            onChange={() => setData('contact_gender', '先生')}
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <span className="text-blue-600">先生</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            checked={data.contact_gender === '小姐'}
                                            onChange={() => setData('contact_gender', '小姐')}
                                            className="w-4 h-4 text-pink-500"
                                        />
                                        <span className="text-pink-500">小姐</span>
                                    </label>
                                </div>
                                {errors.contact_gender && (
                                    <p className="text-red-500 text-sm mt-1">{errors.contact_gender}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaPhone className="inline mr-1" /> 聯絡電話
                                </label>
                                <input
                                    type="text"
                                    value={data.contact_phone}
                                    onChange={(e) => setData('contact_phone', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="市話"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaMobile className="inline mr-1" /> 聯絡手機
                                </label>
                                <input
                                    type="text"
                                    value={data.contact_mobile}
                                    onChange={(e) => setData('contact_mobile', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="手機號碼"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaEnvelope className="inline mr-1" /> E-Mail
                                </label>
                                <input
                                    type="email"
                                    value={data.contact_email}
                                    onChange={(e) => setData('contact_email', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="email@example.com"
                                />
                                {errors.contact_email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.contact_email}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaGlobe className="inline mr-1" /> 網址
                                </label>
                                <input
                                    type="text"
                                    value={data.contact_web}
                                    onChange={(e) => setData('contact_web', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="www.example.com"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Nearby Schools */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaGraduationCap className="text-blue-500" /> 鄰近學校
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    鄰近學校 1
                                </label>
                                <input
                                    type="text"
                                    value={data.nearby_school_1}
                                    onChange={(e) => setData('nearby_school_1', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="學校名稱"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    鄰近學校 2
                                </label>
                                <input
                                    type="text"
                                    value={data.nearby_school_2}
                                    onChange={(e) => setData('nearby_school_2', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="學校名稱"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Job Details */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaBriefcase className="text-blue-500" /> 徵才內容
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    職務名稱 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.job_title}
                                    onChange={(e) => setData('job_title', e.target.value)}
                                    className={`w-full border rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 ${
                                        errors.job_title ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="請輸入職務名稱"
                                    required
                                />
                                {errors.job_title && (
                                    <p className="text-red-500 text-sm mt-1">{errors.job_title}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaDollarSign className="inline mr-1" /> 薪資待遇
                                </label>
                                <input
                                    type="text"
                                    value={data.salary}
                                    onChange={(e) => setData('salary', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="例如: 29500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    上班時段
                                </label>
                                <input
                                    type="text"
                                    value={data.work_hours}
                                    onChange={(e) => setData('work_hours', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="例如: 09:00-18:00"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaUsers className="inline mr-1" /> 名額
                                </label>
                                <input
                                    type="text"
                                    value={data.vacancies}
                                    onChange={(e) => setData('vacancies', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="例如: 2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaTag className="inline mr-1" /> 職缺分類
                                </label>
                                <select
                                    value={data.job_category}
                                    onChange={(e) => setData('job_category', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">選擇分類</option>
                                    <option value="行政．法務．人資">行政．法務．人資</option>
                                    <option value="行銷、企畫">行銷、企畫</option>
                                    <option value="生管．品管．製程">生管．品管．製程</option>
                                    <option value="生技．化工．醫療">生技．化工．醫療</option>
                                    <option value="餐飲．旅遊．美髮">餐飲．旅遊．美髮</option>
                                    <option value="金融．財會．管理">金融．財會．管理</option>
                                    <option value="傳播．藝術．演藝">傳播．藝術．演藝</option>
                                    <option value="維修．操作．研發">維修．操作．研發</option>
                                    <option value="學術．教育．文字">學術．教育．文字</option>
                                    <option value="軍警．保全．其它">軍警．保全．其它</option>
                                    <option value="客服．業務．貿易">客服．業務．貿易</option>
                                    <option value="採購．倉管．運輸">採購．倉管．運輸</option>
                                    <option value="資訊．光電．電子">資訊．光電．電子</option>
                                    <option value="營建．施作．測量">營建．施作．測量</option>
                                    <option value="美術設計">美術設計</option>
                                    <option value="程式設計">程式設計</option>
                                    <option value="拍照攝影">拍照攝影</option>
                                    <option value="會計">會計</option>
                                    <option value="美容、美髮、美甲">美容、美髮、美甲</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Job Content */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                工作內容
                            </label>
                            <textarea
                                value={data.job_content}
                                onChange={(e) => setData('job_content', e.target.value)}
                                rows={6}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                placeholder="請輸入工作內容..."
                            />
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
                    </div>

                    {/* Job Requirements */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                具備條件
                            </label>
                            <textarea
                                value={data.job_requirements}
                                onChange={(e) => setData('job_requirements', e.target.value)}
                                rows={6}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                placeholder="請輸入具備條件..."
                            />
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

                    {/* Submit Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                        <Link
                            href="/admin/jobs"
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