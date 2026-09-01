// resources/js/pages/Admin/organization/OrganizationForm.tsx
import { Head, useForm, Link } from '@inertiajs/react';
import { 
    FaBuilding, FaSave, FaTimes, FaGlobe, FaMapMarkerAlt,
    FaUser, FaPhone, FaEnvelope, FaFileAlt, FaLanguage
} from 'react-icons/fa';

interface Organization {
    id?: number;
    name?: string;
    city?: string;
    district?: string;
    village?: string;
    address?: string;
    website?: string;
    language?: string;
    contact_person?: string;
    contact_phone?: string;
    contact_email?: string;
    description?: string;
    is_active?: boolean;
    purchased_space?: number;
    line_card_space?: number;
}

interface Props {
    title?: string;
    organization?: Organization | null;
}

export default function OrganizationForm({ title = '組織表單', organization }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: organization?.name || '',
        city: organization?.city || '',
        district: organization?.district || '',
        village: organization?.village || '',
        address: organization?.address || '',
        website: organization?.website || '',
        language: organization?.language || 'TS',
        contact_person: organization?.contact_person || '',
        contact_phone: organization?.contact_phone || '',
        contact_email: organization?.contact_email || '',
        description: organization?.description || '',
        is_active: organization?.is_active ?? true,
        purchased_space: organization?.purchased_space || 1024 * 1024 * 1024,
        line_card_space: organization?.line_card_space || 50 * 1024 * 1024,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (organization?.id) {
            put(`/admin/organization/${organization.id}`);
        } else {
            post('/admin/organization');
        }
    };

    return (
        <>
            <Head title={title} />
            
            <div className="bg-white rounded-xl shadow-sm p-6 text-gray-900">
                {/* Header */}
                <div className="border-b border-gray-200 pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FaBuilding className="text-blue-500" /> {title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        {organization?.id ? '編輯組織資料' : '新增組織資料'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* ===== BASIC INFO ===== */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaBuilding className="text-blue-500" /> 基本資料
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    公司名稱 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.name && (
                                    <div className="text-red-500 text-xs mt-1">{errors.name}</div>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">城市</label>
                                <input
                                    type="text"
                                    value={data.city}
                                    onChange={(e) => setData('city', e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">區</label>
                                <input
                                    type="text"
                                    value={data.district}
                                    onChange={(e) => setData('district', e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">里</label>
                                <input
                                    type="text"
                                    value={data.village}
                                    onChange={(e) => setData('village', e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">網址</label>
                                <input
                                    type="text"
                                    value={data.website}
                                    onChange={(e) => setData('website', e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.website && (
                                    <div className="text-red-500 text-xs mt-1">{errors.website}</div>
                                )}
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">地址</label>
                                <input
                                    type="text"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ===== CONTACT INFO ===== */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaUser className="text-green-500" /> 聯絡資訊
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">聯絡人</label>
                                <input
                                    type="text"
                                    value={data.contact_person}
                                    onChange={(e) => setData('contact_person', e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">聯絡電話</label>
                                <input
                                    type="text"
                                    value={data.contact_phone}
                                    onChange={(e) => setData('contact_phone', e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">聯絡信箱</label>
                                <input
                                    type="email"
                                    value={data.contact_email}
                                    onChange={(e) => setData('contact_email', e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.contact_email && (
                                    <div className="text-red-500 text-xs mt-1">{errors.contact_email}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ===== SETTINGS ===== */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaLanguage className="text-purple-500" /> 設定
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">語言</label>
                                <select
                                    value={data.language}
                                    onChange={(e) => setData('language', e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="TS">繁中</option>
                                    <option value="EN">英文</option>
                                    <option value="JP">日文</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">狀態</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            value={1}
                                            checked={data.is_active === true}
                                            onChange={() => setData('is_active', true)}
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <span className="text-green-600">啟用</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            value={0}
                                            checked={data.is_active === false}
                                            onChange={() => setData('is_active', false)}
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <span className="text-red-600">停用</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ===== DESCRIPTION ===== */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaFileAlt className="text-orange-500" /> 公司簡介
                        </h3>
                        <div>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={4}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                placeholder="請輸入公司簡介..."
                            />
                        </div>
                    </div>

                    {/* ===== SUBMIT BUTTONS ===== */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                        <Link
                            href="/admin/organization"
                            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
                        >
                            <FaTimes /> 取消
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FaSave /> {processing ? '儲存中...' : '儲存'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
