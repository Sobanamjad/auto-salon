// resources/js/pages/Admin/organization/OrganizationPassword.tsx
import { Head, useForm, Link } from '@inertiajs/react';
import { FaKey, FaSave, FaTimes, FaBuilding, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';

interface Organization {
    id: number;
    name: string;
}

interface Props {
    organization: Organization;
}

export default function OrganizationPassword({ organization }: Props) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const { data, setData, put, processing, errors } = useForm({
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/organization/${organization.id}/change-password`);
    };

    return (
        <>
            <Head title="更改密碼" />
            
            <div className="bg-white rounded-xl shadow-sm p-6 text-gray-900">
                {/* Header */}
                <div className="border-b border-gray-200 pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FaKey className="text-orange-500" /> 更改密碼
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        為 <span className="font-medium text-gray-700">{organization.name}</span> 更改密碼
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* ===== PASSWORD FORM ===== */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaBuilding className="text-blue-500" /> 密碼設定
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    新密碼 <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="w-full border rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500"
                                        placeholder="請輸入新密碼"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <div className="text-red-500 text-xs mt-1">{errors.password}</div>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    確認密碼 <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        className="w-full border rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500"
                                        placeholder="請再次輸入新密碼"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {errors.password_confirmation && (
                                    <div className="text-red-500 text-xs mt-1">{errors.password_confirmation}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ===== PASSWORD REQUIREMENTS ===== */}
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <h4 className="text-sm font-semibold text-blue-800 mb-2">密碼要求：</h4>
                        <ul className="text-xs text-blue-700 space-y-1">
                            <li>• 密碼至少需要 6 個字元</li>
                            <li>• 新密碼與確認密碼必須一致</li>
                        </ul>
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
                            <FaSave /> {processing ? '更新中...' : '更新密碼'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
