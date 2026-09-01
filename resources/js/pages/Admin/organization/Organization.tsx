// resources/js/pages/Admin/organization/Organization.tsx
import { Head, Link, router } from '@inertiajs/react';
import { 
    FaBuilding, FaEdit, FaTrash, FaEye, FaEyeSlash,
    FaGlobe, FaMapMarkerAlt, FaHdd, FaDatabase, 
    FaLanguage, FaKey, FaUser, FaPhone, FaEnvelope
} from 'react-icons/fa';

interface Organization {
    id: number;
    name: string;
    city: string;
    district: string;
    village: string;
    address: string;
    website: string;
    total_views: number;
    purchased_space_formatted: string;
    used_space_formatted: string;
    remaining_space_formatted: string;
    line_card_space_formatted: string;
    language: string;
    contact_person: string;
    contact_phone: string;
    contact_email: string;
    description: string;
    is_active: boolean;
    location: string;
}

interface Props {
    title?: string;
    organizations: Organization[];
}

export default function Organization({ title = '組織資料', organizations }: Props) {
    const handleDelete = (id: number, name: string) => {
        if (confirm(`確定要刪除: ${name} 嗎？`)) {
            router.delete(`/admin/organization/${id}`);
        }
    };

    const handleToggleActive = (id: number) => {
        router.get(`/admin/organization/${id}/toggle-active`);
    };

    const handleChangePassword = (id: number) => {
        router.get(`/admin/organization/${id}/change-password`);
    };

    const getLanguageLabel = (lang: string) => {
        const labels: Record<string, string> = {
            'TS': '繁中',
            'EN': '英文',
            'JP': '日文',
        };
        return labels[lang] || lang;
    };

    return (
        <>
            <Head title={title} />
            
            <div className="bg-white rounded-xl shadow-sm p-6 text-gray-900">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <FaBuilding className="text-blue-500" /> {title}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">管理組織/公司資料</p>
                        <div className="text-sm text-gray-600 mt-2">總組織：{organizations.length} 個</div>
                    </div>
                    <Link
                        href="/admin/organization/create"
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm"
                    >
                        <FaEdit /> 新增組織
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-12">No.</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">公司名稱</th>
                                <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase w-32">購買空間</th>
                                <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase w-28">目前使用</th>
                                <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase w-28">剩餘空間</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-40">網址</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-32">語言與網頁資料</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-24">密碼變更</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase w-20">管理</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {organizations.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="px-3 py-8 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <FaBuilding size={32} className="text-gray-300" />
                                            <p>暫無組織資料</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                organizations.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-3 py-3 text-center text-sm">{index + 1}.</td>
                                        <td className="px-3 py-3">
                                            <div className="font-medium text-gray-900">{item.name}</div>
                                            {item.location && (
                                                <div className="text-sm text-gray-500 flex items-center gap-1">
                                                    <FaMapMarkerAlt size={12} className="text-gray-400" />
                                                    {item.location}
                                                </div>
                                            )}
                                            {item.address && (
                                                <div className="text-xs text-gray-400 mt-0.5">{item.address}</div>
                                            )}
                                        </td>
                                        <td className="px-3 py-3 text-right">
                                            <div className="text-sm">{item.purchased_space_formatted}</div>
                                            <div className="text-xs text-gray-400">
                                                LINE 名片：{item.line_card_space_formatted}
                                            </div>
                                        </td>
                                        <td className="px-3 py-3 text-right text-sm">
                                            {item.used_space_formatted}
                                        </td>
                                        <td className="px-3 py-3 text-right text-sm text-green-600 font-medium">
                                            {item.remaining_space_formatted}
                                        </td>
                                        <td className="px-3 py-3">
                                            {item.website && (
                                                <a 
                                                    href={item.website} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline text-sm flex items-center justify-center gap-1"
                                                >
                                                    <FaGlobe size={12} /> {item.website.replace(/^https?:\/\//, '')}
                                                </a>
                                            )}
                                            <div className="text-center text-xs text-gray-400 mt-1">
                                                總點閱：<span className="text-red-600 font-medium">{item.total_views.toLocaleString()}</span>
                                            </div>
                                        </td>
                                        <td className="px-3 py-3 text-center">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                                                item.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                                            }`}>
                                                {getLanguageLabel(item.language)}
                                            </span>
                                            <div className="mt-1">
                                                <Link
                                                    href={`/admin/organization/${item.id}/edit`}
                                                    className="text-blue-600 hover:text-blue-800 text-xs flex items-center justify-center gap-1"
                                                >
                                                    <FaEdit size={12} /> 修改資料
                                                </Link>
                                            </div>
                                        </td>
                                        <td className="px-3 py-3 text-center">
                                            <button
                                                onClick={() => handleChangePassword(item.id)}
                                                className="text-orange-600 hover:text-orange-800 text-sm flex items-center justify-center gap-1"
                                            >
                                                <FaKey size={14} /> 更改密碼
                                            </button>
                                        </td>
                                        <td className="px-3 py-3">
                                            <div className="flex flex-col items-center gap-1 text-xs">
                                                <button
                                                    onClick={() => handleToggleActive(item.id)}
                                                    className={`${item.is_active ? 'text-green-600' : 'text-gray-400'} hover:${item.is_active ? 'text-green-800' : 'text-gray-600'} flex items-center gap-1`}
                                                >
                                                    {item.is_active ? '啟用' : '停用'}
                                                </button>
                                                <div className="border-t border-dashed border-gray-300 w-full"></div>
                                                <button
                                                    onClick={() => handleDelete(item.id, item.name)}
                                                    className="text-red-600 hover:text-red-800 flex items-center gap-1"
                                                >
                                                    <FaTrash size={12} /> 刪除
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}