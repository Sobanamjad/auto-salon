import { Head, Link, useForm } from '@inertiajs/react';
import { FaArrowLeft, FaSave, FaTimes, FaPhone, FaEnvelope, FaFacebook, FaMapMarkerAlt, FaMap } from 'react-icons/fa';
import AdminLayout from '@/pages/Admin/Layouts/AdminLayout';

interface ContactSettingsData {
    phone: string;
    email: string;
    facebook_url: string;
    address: string;
    map_embed_url: string;
}

interface ContactSettingsProps {
    settings: ContactSettingsData;
}

export default function ContactSettings({ settings }: ContactSettingsProps) {
    const { data, setData, put, processing, errors } = useForm<ContactSettingsData>({
        phone: settings.phone || '',
        email: settings.email || '',
        facebook_url: settings.facebook_url || '',
        address: settings.address || '',
        map_embed_url: settings.map_embed_url || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put('/admin/contact-settings', {
            onSuccess: () => {
                window.location.href = '/admin/contact-settings';
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
            }
        });
    };

    return (
        <AdminLayout>
            <Head title="聯絡資訊設定" />
            
            <div className="bg-white rounded-xl shadow-sm p-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Link 
                            href="/admin/dashboard"
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <FaArrowLeft size={20} />
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <FaPhone className="text-blue-500" /> 聯絡資訊設定
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">管理網站的聯絡資訊</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/admin/dashboard"
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                            <FaTimes /> 取消返回
                        </Link>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Contact Information */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaPhone className="text-blue-500" /> 聯絡方式
                        </h3>
                        
                        <div className="space-y-4">
                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaPhone className="inline mr-1 text-blue-500" /> 電話
                                </label>
                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className={`w-full border rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 ${
                                        errors.phone ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="請輸入電話號碼"
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaEnvelope className="inline mr-1 text-blue-500" /> 信箱
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className={`w-full border rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 ${
                                        errors.email ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="請輸入電子信箱"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>

                            {/* Facebook URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaFacebook className="inline mr-1 text-blue-600" /> Facebook 連結
                                </label>
                                <input
                                    type="url"
                                    value={data.facebook_url}
                                    onChange={(e) => setData('facebook_url', e.target.value)}
                                    className={`w-full border rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 ${
                                        errors.facebook_url ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="https://www.facebook.com/..."
                                />
                                {errors.facebook_url && (
                                    <p className="text-red-500 text-sm mt-1">{errors.facebook_url}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Location Information */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaMapMarkerAlt className="text-red-500" /> 位置資訊
                        </h3>
                        
                        <div className="space-y-4">
                            {/* Address */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaMapMarkerAlt className="inline mr-1 text-red-500" /> 地址
                                </label>
                                <textarea
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    rows={3}
                                    className={`w-full border rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 ${
                                        errors.address ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="請輸入地址"
                                />
                                {errors.address && (
                                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                                )}
                            </div>

                            {/* Map Embed URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaMap className="inline mr-1 text-green-500" /> Google Map 嵌入代碼
                                </label>
                                <textarea
                                    value={data.map_embed_url}
                                    onChange={(e) => setData('map_embed_url', e.target.value)}
                                    rows={4}
                                    className={`w-full border rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 ${
                                        errors.map_embed_url ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="請輸入 Google Map 嵌入 URL"
                                />
                                {errors.map_embed_url && (
                                    <p className="text-red-500 text-sm mt-1">{errors.map_embed_url}</p>
                                )}
                                <p className="text-xs text-gray-500 mt-2">
                                    從 Google Maps 取得分享連結的嵌入代碼
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                        <Link
                            href="/admin/dashboard"
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                            <FaTimes /> 取消
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                            <FaSave /> 儲存
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
