import { Head, Link, useForm } from '@inertiajs/react';
import {
    FaArrowLeft, FaSave, FaTimes, FaUserFriends,
    FaUser, FaMapMarkerAlt, FaHome, FaSort,
    FaFileAlt, FaCheck
} from 'react-icons/fa';

export default function PartnerCreate() {
    const { data, setData, post, processing, errors } = useForm({
        language: 'TS',
        status: true,
        show_on_home: true,
        sort_order: 99,
        name: '',
        city: '',
        district: '',
        village: '',
        brief: '',
        content: '',
        note: '',
        image_file: null,
        slogan: '',
        tag: '',
        external_link: '',
        company_name: '',
        booking_link: '',
        take_number_link: '',
        current_number_link: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('language', data.language);
        formData.append('status', data.status ? '1' : '0');
        formData.append('show_on_home', data.show_on_home ? '1' : '0');
        formData.append('sort_order', data.sort_order.toString());
        formData.append('name', data.name);
        formData.append('city', data.city);
        formData.append('district', data.district);
        formData.append('village', data.village);
        formData.append('brief', data.brief);
        formData.append('content', data.content);
        formData.append('note', data.note);

        if (data.image_file) {
            formData.append('image_file', data.image_file);
        }

        formData.append('slogan', data.slogan);
        formData.append('tag', data.tag);
        formData.append('external_link', data.external_link);
        formData.append('company_name', data.company_name);
        formData.append('booking_link', data.booking_link);
        formData.append('take_number_link', data.take_number_link);
        formData.append('current_number_link', data.current_number_link);

        post('/admin/partners', {
            data: formData,
            forceFormData: true,
            onSuccess: () => {
                window.location.href = '/admin/partners';
            },
            onError: (errors: any) => {
                console.error('Validation errors:', errors);
            }
        });
    };

    return (
        <>
            <Head title="新增夥伴" />
            
            <div className="bg-white rounded-xl shadow-sm p-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Link 
                            href="/admin/partners"
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <FaArrowLeft size={20} />
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <FaUserFriends className="text-blue-500" /> 新增夥伴
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">建立新的合作夥伴</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/admin/partners"
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                            <FaTimes /> 取消返回
                        </Link>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Settings */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <span className="text-blue-600">上架</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            checked={data.status === false}
                                            onChange={() => setData('status', false)}
                                            className="w-4 h-4 text-red-600"
                                        />
                                        <span className="text-red-600">下架</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaHome className="inline mr-1" /> 首頁
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

                    {/* Name & Address */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaUser className="inline mr-1" /> 姓名 <span className="text-red-500">*</span>
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
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaMapMarkerAlt className="inline mr-1" /> 城市
                                </label>
                                <select
                                    value={data.city}
                                    onChange={(e) => setData('city', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">選擇城市</option>
                                    <option value="台北市">台北市</option>
                                    <option value="高雄市">高雄市</option>
                                    <option value="台中市">台中市</option>
                                    <option value="台南市">台南市</option>
                                    <option value="新北市">新北市</option>
                                    <option value="桃園市">桃園市</option>
                                    <option value="彰化縣">彰化縣</option>
                                    <option value="嘉義縣">嘉義縣</option>
                                    <option value="新竹縣">新竹縣</option>
                                    <option value="苗栗縣">苗栗縣</option>
                                    <option value="南投縣">南投縣</option>
                                    <option value="澎湖縣">澎湖縣</option>
                                    <option value="屏東縣">屏東縣</option>
                                    <option value="台東縣">台東縣</option>
                                    <option value="宜蘭縣">宜蘭縣</option>
                                    <option value="雲林縣">雲林縣</option>
                                    <option value="金門縣">金門縣</option>
                                    <option value="嘉義市">嘉義市</option>
                                    <option value="新竹市">新竹市</option>
                                    <option value="基隆市">基隆市</option>
                                    <option value="花蓮縣">花蓮縣</option>
                                    <option value="連江縣">連江縣</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    區域
                                </label>
                                <input
                                    type="text"
                                    value={data.district}
                                    onChange={(e) => setData('district', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="例如: 東區"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    村里
                                </label>
                                <input
                                    type="text"
                                    value={data.village}
                                    onChange={(e) => setData('village', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="例如: 富裕里"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Brief */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            簡介
                        </label>
                        <textarea
                            value={data.brief}
                            onChange={(e) => setData('brief', e.target.value)}
                            rows={3}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                            placeholder="請輸入簡介..."
                        />
                    </div>

                    {/* Image */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            頭像圖片
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];

                                if (file) {
                                    setData('image_file', file);
                                }
                            }}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                        />
                        {data.image_file && (
                            <p className="text-sm text-gray-600 mt-1">已選擇: {data.image_file.name}</p>
                        )}
                        {data.image_file && (
                            <div className="mt-2">
                                <p className="text-sm text-gray-600 mb-1">預覽:</p>
                                <img
                                    src={URL.createObjectURL(data.image_file)}
                                    alt="預覽"
                                    className="h-32 w-32 object-cover rounded border"
                                />
                            </div>
                        )}
                    </div>

                    {/* Slogan */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            標語
                        </label>
                        <input
                            type="text"
                            value={data.slogan}
                            onChange={(e) => setData('slogan', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                            placeholder="請輸入標語"
                        />
                    </div>

                    {/* Tag */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            標籤
                        </label>
                        <input
                            type="text"
                            value={data.tag}
                            onChange={(e) => setData('tag', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                            placeholder="請輸入標籤"
                        />
                    </div>

                    {/* External Link */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            外部連結
                        </label>
                        <input
                            type="text"
                            value={data.external_link}
                            onChange={(e) => setData('external_link', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                            placeholder="請輸入外部連結"
                        />
                    </div>

                    {/* Company Name */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            公司名稱
                        </label>
                        <input
                            type="text"
                            value={data.company_name}
                            onChange={(e) => setData('company_name', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                            placeholder="請輸入公司名稱"
                        />
                    </div>

                    {/* Caller Links */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            預約/取號連結
                        </label>
                        <div className="space-y-2">
                            <input
                                type="text"
                                value={data.booking_link}
                                onChange={(e) => setData('booking_link', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                placeholder="預約連結"
                            />
                            <input
                                type="text"
                                value={data.take_number_link}
                                onChange={(e) => setData('take_number_link', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                placeholder="網路取號連結"
                            />
                            <input
                                type="text"
                                value={data.current_number_link}
                                onChange={(e) => setData('current_number_link', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                placeholder="目前號碼連結"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            內容
                        </label>
                        <textarea
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            rows={8}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                            placeholder="請輸入詳細內容..."
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
                            href="/admin/partners"
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