import { Head, Link, useForm } from '@inertiajs/react';
import { 
    FaArrowLeft, FaSave, FaTimes, FaComments, 
    FaUser, FaPhone, FaMobile, FaEnvelope, 
    FaBuilding, FaGlobe, FaCalendar, FaImage,
    FaSort, FaQuestion, FaReply, FaFileAlt
} from 'react-icons/fa';

interface Guestbook {
    id: number;
    language: string;
    status: boolean;
    sort_order: number;
    published_date: string;
    end_date: string;
    category: string;
    question: string;
    brief: string;
    answer: string;
    question_date: string;
    answer_date: string;
    asker_name: string;
    asker_company: string;
    asker_mobile: string;
    asker_phone: string;
    asker_fax: string;
    asker_email: string;
    asker_line: string;
    asker_wechat: string;
    asker_whatsapp: string;
    asker_country: string;
    asker_note: string;
    note: string;
    has_photo: boolean;
}

interface Props {
    guestbook: Guestbook;
    title: string;
}

export default function GuestbookEdit({ guestbook, title }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        language: guestbook.language || 'TS',
        status: guestbook.status ?? true,
        sort_order: guestbook.sort_order || 999,
        published_date: guestbook.published_date || new Date().toISOString().split('T')[0],
        end_date: guestbook.end_date || '2200-12-31',
        category: guestbook.category || '',
        question: guestbook.question || '',
        brief: guestbook.brief || '',
        answer: guestbook.answer || '',
        question_date: guestbook.question_date || new Date().toISOString().split('T')[0],
        answer_date: guestbook.answer_date || '',
        asker_name: guestbook.asker_name || '',
        asker_company: guestbook.asker_company || '',
        asker_mobile: guestbook.asker_mobile || '',
        asker_phone: guestbook.asker_phone || '',
        asker_fax: guestbook.asker_fax || '',
        asker_email: guestbook.asker_email || '',
        asker_line: guestbook.asker_line || '',
        asker_wechat: guestbook.asker_wechat || '',
        asker_whatsapp: guestbook.asker_whatsapp || '',
        asker_country: guestbook.asker_country || '208',
        asker_note: guestbook.asker_note || '',
        note: guestbook.note || '',
        has_photo: guestbook.has_photo || false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/guestbook/${guestbook.id}`, {
            onSuccess: () => {
                window.location.href = '/admin/guestbook';
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
            }
        });
    };

    return (
        <>
            <Head title={title} />
            
            <div className="bg-white rounded-xl shadow-sm p-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Link 
                            href="/admin/guestbook"
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <FaArrowLeft size={20} />
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <FaComments className="text-blue-500" /> {title}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">編輯留言 #{guestbook.id}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/admin/guestbook"
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
                                    <FaCalendar className="inline mr-1" /> 發表日期
                                </label>
                                <input
                                    type="date"
                                    value={data.published_date}
                                    onChange={(e) => setData('published_date', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    截止日期
                                </label>
                                <input
                                    type="date"
                                    value={data.end_date}
                                    onChange={(e) => setData('end_date', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.end_date && (
                                    <p className="text-red-500 text-sm mt-1">{errors.end_date}</p>
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
                                    <FaQuestion className="inline mr-1" /> 分類
                                </label>
                                <select
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">選擇分類</option>
                                    <option value="一般問題">一般問題</option>
                                    <option value="活動諮詢">活動諮詢</option>
                                    <option value="會費問題">會費問題</option>
                                    <option value="其他">其他</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaCalendar className="inline mr-1" /> 發問日期
                                </label>
                                <input
                                    type="date"
                                    value={data.question_date}
                                    onChange={(e) => setData('question_date', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Asker Information */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaUser className="text-blue-500" /> 發問者資訊
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaUser className="inline mr-1" /> 姓名
                                </label>
                                <input
                                    type="text"
                                    value={data.asker_name}
                                    onChange={(e) => setData('asker_name', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="姓名"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaBuilding className="inline mr-1" /> 公司
                                </label>
                                <input
                                    type="text"
                                    value={data.asker_company}
                                    onChange={(e) => setData('asker_company', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="公司名稱"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaGlobe className="inline mr-1" /> 國家
                                </label>
                                <select
                                    value={data.asker_country}
                                    onChange={(e) => setData('asker_country', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="208">TAIWAN(台灣)</option>
                                    <option value="226">UNITED STATES</option>
                                    <option value="44">CHINA</option>
                                    <option value="225">UNITED KINGDOM</option>
                                    <option value="199">SPAIN</option>
                                    <option value="107">JAPAN</option>
                                    <option value="113">KOREA</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaMobile className="inline mr-1" /> 手機
                                </label>
                                <input
                                    type="text"
                                    value={data.asker_mobile}
                                    onChange={(e) => setData('asker_mobile', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="手機號碼"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaPhone className="inline mr-1" /> 電話
                                </label>
                                <input
                                    type="text"
                                    value={data.asker_phone}
                                    onChange={(e) => setData('asker_phone', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="市話"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaEnvelope className="inline mr-1" /> E-Mail
                                </label>
                                <input
                                    type="email"
                                    value={data.asker_email}
                                    onChange={(e) => setData('asker_email', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="email@example.com"
                                />
                                {errors.asker_email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.asker_email}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Line ID
                                </label>
                                <input
                                    type="text"
                                    value={data.asker_line}
                                    onChange={(e) => setData('asker_line', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="Line ID"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    WeChat
                                </label>
                                <input
                                    type="text"
                                    value={data.asker_wechat}
                                    onChange={(e) => setData('asker_wechat', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="WeChat ID"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    WhatsApp
                                </label>
                                <input
                                    type="text"
                                    value={data.asker_whatsapp}
                                    onChange={(e) => setData('asker_whatsapp', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="WhatsApp"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    傳真
                                </label>
                                <input
                                    type="text"
                                    value={data.asker_fax}
                                    onChange={(e) => setData('asker_fax', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="傳真號碼"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaFileAlt className="inline mr-1" /> 備註
                                </label>
                                <input
                                    type="text"
                                    value={data.asker_note}
                                    onChange={(e) => setData('asker_note', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="備註"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Question */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <FaQuestion className="inline mr-1" /> 問題 <span className="text-red-500">*</span>
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
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                問題簡述
                            </label>
                            <textarea
                                value={data.brief}
                                onChange={(e) => setData('brief', e.target.value)}
                                rows={3}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                placeholder="請輸入簡述..."
                            />
                        </div>
                    </div>

                    {/* Answer */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaCalendar className="inline mr-1" /> 回答日期
                                </label>
                                <input
                                    type="date"
                                    value={data.answer_date}
                                    onChange={(e) => setData('answer_date', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <FaReply className="inline mr-1" /> 回答
                            </label>
                            <textarea
                                value={data.answer}
                                onChange={(e) => setData('answer', e.target.value)}
                                rows={6}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                placeholder="請輸入回答..."
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

                    {/* Photo */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={data.has_photo}
                                onChange={(e) => setData('has_photo', e.target.checked)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <FaImage className="text-gray-500" />
                            <span className="text-sm text-gray-700">有相片</span>
                        </label>
                    </div>

                    {/* Note */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            備註
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
                            href="/admin/guestbook"
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            取消返回
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                            <FaSave /> {processing ? '儲存中...' : '儲存更新'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}