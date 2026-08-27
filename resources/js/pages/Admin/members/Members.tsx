import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { 
    FaSearch, FaPlus, FaEdit, FaTrash, FaUsers, 
    FaSort, FaChevronLeft, FaChevronRight, 
    FaPhone, FaMobile, FaEnvelope, FaUser, FaUserTie,
    FaBuilding, FaGraduationCap, FaTag, FaFileAlt,
    FaIdCard, FaQrcode, FaBarcode, FaCalendar,
    FaDollarSign, FaUserCog
} from 'react-icons/fa';

interface Member {
    id: number;
    member_no: string;
    name: string;
    gender: string;
    phone: string;
    mobile: string;
    email: string;
    username: string;
    company: string;
    position: string;
    school: string;
    department: string;
    category: string;
    category2: string;
    member_type: string;
    position_in_association: string;
    affiliated_unit: string;
    period_start: string;
    period_end: string;
    fee: number;
    note: string;
    sort_order: number;
    status: boolean;
    created_at: string;
    updated_at: string;
}

interface Props {
    members: Member[];
    title?: string;
}

export default function Members({ members = [], title = '會員資訊' }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('name');
    const [currentPage, setCurrentPage] = useState(1);

    // Filter members based on search
    const filteredItems = members.filter(item => {
        const search = searchTerm.toLowerCase();
        if (searchField === 'name') {
            return item.name.toLowerCase().includes(search);
        } else if (searchField === 'member_no') {
            return item.member_no?.toLowerCase().includes(search) || '';
        } else if (searchField === 'company') {
            return item.company?.toLowerCase().includes(search) || '';
        } else if (searchField === 'phone') {
            return item.phone?.toLowerCase().includes(search) || 
                   item.mobile?.toLowerCase().includes(search) || '';
        }
        return true;
    });

    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Handlers
    const handleDelete = (id: number, name: string) => {
        if (confirm(`確定要刪除會員: ${name} 嗎？`)) {
            router.delete(`/admin/members/${id}`);
        }
    };

    const handleSortUpdate = (id: number, sortOrder: number) => {
        router.put(`/admin/members/${id}/sort`, { sort_order: sortOrder });
    };

    const handleCopy = (id: number, name: string) => {
        if (confirm(`確定要複製: ${name} 嗎？`)) {
            router.get(`/admin/members/${id}/copy`);
        }
    };

    return (
        <>
            <Head title={title} />
            
            <div className="bg-white rounded-xl shadow-sm p-6 text-gray-900">
                {/* Header */}
                <div className="border-b border-gray-200 pb-4 mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <FaUsers className="text-blue-500" /> {title}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">管理所有會員資料</p>
                        </div>
                        <div className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-lg">
                            總會員：<span className="font-bold text-blue-600">{members.length}</span> 人
                        </div>
                    </div>
                </div>

                {/* Excel Import/Export Tools */}
                <div className="flex flex-wrap items-center gap-4 mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2">
                        <Link
                            href="/admin/members/export-format"
                            className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                        >
                            <FaFileAlt size={14} /> 匯入格式
                        </Link>
                        <span className="text-gray-300">|</span>
                        <div className="flex items-center gap-2">
                            <img 
                                src="https://sys.posu.tw/web/sys/images/excel.jpg" 
                                alt="Excel" 
                                className="w-7 h-7 object-cover rounded"
                            />
                            <span className="text-sm text-gray-600">匯入</span>
                            <input type="file" className="text-sm text-gray-500" />
                            <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                                送出
                            </button>
                        </div>
                    </div>
                    <div className="border-l border-gray-300 pl-4">
                        <Link
                            href="/admin/members/export"
                            target="_blank"
                            className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                        >
                            <FaFileAlt size={14} /> 匯出基本資料
                        </Link>
                        <span className="text-xs text-gray-400 ml-1">(OpenOffice Calc 格式)</span>
                    </div>
                </div>

                {/* Tools Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Search Field Dropdown */}
                        <select
                            value={searchField}
                            onChange={(e) => setSearchField(e.target.value)}
                            className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="name">姓名</option>
                            <option value="member_no">會員編號</option>
                            <option value="company">公司</option>
                            <option value="phone">電話</option>
                        </select>

                        {/* Search Input */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="搜尋..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border rounded-lg px-3 py-2 pl-9 text-sm w-48 focus:ring-2 focus:ring-blue-500"
                            />
                            <FaSearch className="absolute left-3 top-3 text-gray-400" size={14} />
                        </div>
                        <button 
                            onClick={() => setSearchTerm('')}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                        >
                            查詢
                        </button>

                        {/* Quick Filter Buttons */}
                        <button className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm">
                            全
                        </button>
                        <button className="bg-purple-100 hover:bg-purple-200 px-3 py-1 rounded text-sm text-purple-700">
                            理監事
                        </button>
                        <button className="bg-red-100 hover:bg-red-200 px-3 py-1 rounded text-sm text-red-700">
                            未繳費
                        </button>
                    </div>

                    {/* Add New Button */}
                    <Link
                        href="/admin/members/create"
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm"
                    >
                        <FaPlus /> 新增
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-8">No</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-28">排序</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-20">分類</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-24">會員編號</th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-24">姓名</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-28">電話</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-24">學校/系所</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-24">公司</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-20">本屆職稱</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-24">所屬單位</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-28">期間</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-20">費用</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-28">其他紀錄</th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-20">編輯</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentItems.length === 0 ? (
                                <tr>
                                    <td colSpan={14} className="px-3 py-8 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <FaUsers size={32} className="text-gray-300" />
                                            <p>暫無會員資料</p>
                                            <Link
                                                href="/admin/members/create"
                                                className="text-blue-600 hover:underline text-sm"
                                            >
                                                點此新增
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                currentItems.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        {/* No */}
                                        <td className="px-2 py-2 text-center text-sm">
                                            {(currentPage - 1) * itemsPerPage + index + 1}.
                                        </td>

                                        {/* Sort Order */}
                                        <td className="px-2 py-2">
                                            <div className="text-center text-xs text-gray-500">
                                                SN：<span className="text-red-500 font-medium">{item.id}</span>
                                            </div>
                                            <div className="border-t border-dashed border-gray-300 my-1"></div>
                                            <div className="flex items-center justify-center gap-1">
                                                <input
                                                    type="number"
                                                    defaultValue={item.sort_order || 99}
                                                    className="w-10 border rounded px-1 py-0.5 text-xs text-center"
                                                    id={`sort_${item.id}`}
                                                />
                                                <button 
                                                    onClick={() => {
                                                        const input = document.getElementById(`sort_${item.id}`) as HTMLInputElement;
                                                        handleSortUpdate(item.id, parseInt(input.value) || 99);
                                                    }}
                                                    className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs hover:bg-blue-600"
                                                >
                                                    改
                                                </button>
                                            </div>
                                        </td>

                                        {/* Category */}
                                        <td className="px-2 py-2 text-center text-sm">
                                            <select 
                                                className="text-xs border rounded px-1 py-0.5"
                                                defaultValue={item.category || ''}
                                            >
                                                <option value="">選取</option>
                                                <option value="資訊科技">資訊科技</option>
                                                <option value="房屋交易">房屋交易</option>
                                                <option value="水電工程">水電工程</option>
                                            </select>
                                            <div className="mt-1">
                                                <Link
                                                    href={`/admin/members/${item.id}/category2`}
                                                    className="text-xs text-blue-500 hover:underline"
                                                >
                                                    <FaTag size={10} /> 分類2選擇
                                                </Link>
                                            </div>
                                        </td>

                                        {/* Member No */}
                                        <td className="px-2 py-2 text-center text-sm">
                                            {item.member_no || '-'}
                                        </td>

                                        {/* Name */}
                                        <td className="px-2 py-2">
                                            <Link
                                                href={`/admin/members/${item.id}/edit`}
                                                className="text-blue-600 hover:underline text-sm"
                                            >
                                                <span className="font-medium text-base">{item.name}</span>
                                                {item.gender && (
                                                    <span className="text-gray-500 text-xs ml-1">{item.gender}</span>
                                                )}
                                            </Link>
                                        </td>

                                        {/* Phone */}
                                        <td className="px-2 py-2 text-center text-sm">
                                            {item.phone && <div>{item.phone}</div>}
                                            {item.mobile && <div className="text-xs text-gray-500">{item.mobile}</div>}
                                        </td>

                                        {/* School/Department */}
                                        <td className="px-2 py-2 text-center text-sm">
                                            {item.school || '-'}
                                            {item.department && <div className="text-xs text-gray-500">{item.department}</div>}
                                        </td>

                                        {/* Company/Position */}
                                        <td className="px-2 py-2 text-center text-sm">
                                            {item.company || '-'}
                                            {item.position && <div className="text-xs text-gray-500">{item.position}</div>}
                                        </td>

                                        {/* Position in Association */}
                                        <td className="px-2 py-2 text-center text-sm">
                                            {item.position_in_association || '-'}
                                        </td>

                                        {/* Affiliated Unit */}
                                        <td className="px-2 py-2 text-center text-sm">
                                            {item.affiliated_unit || '-'}
                                        </td>

                                        {/* Period */}
                                        <td className="px-2 py-2 text-center text-sm">
                                            {item.period_start || '0000-00-00'}
                                            <div className="border-t border-dashed border-gray-300 my-1"></div>
                                            {item.period_end || '0000-00-00'}
                                        </td>

                                        {/* Fee */}
                                        <td className="px-2 py-2 text-center text-sm">
                                            {item.fee ? `NT$ ${item.fee}` : '-'}
                                        </td>

                                        {/* Other Records */}
                                        <td className="px-2 py-2 text-center">
                                            <Link
                                                href={`/admin/members/${item.id}/records`}
                                                className="text-blue-600 hover:underline text-xs block"
                                            >
                                                活動紀錄
                                            </Link>
                                            <div className="border-t border-dashed border-gray-300 my-1"></div>
                                            <Link
                                                href={`/admin/members/${item.id}/notices`}
                                                className="text-blue-600 hover:underline text-xs block"
                                            >
                                                通知紀錄
                                            </Link>
                                            <div className="border-t border-dashed border-gray-300 my-1"></div>
                                            <Link
                                                href={`/admin/members/${item.id}/points`}
                                                className="text-blue-600 hover:underline text-xs block"
                                            >
                                                點數管理
                                            </Link>
                                        </td>

                                        {/* Edit Actions */}
                                        <td className="px-2 py-2">
                                            <div className="flex flex-col items-center gap-0.5 text-xs">
                                                <Link
                                                    href={`/admin/members/${item.id}/edit`}
                                                    className="text-blue-600 hover:text-blue-800 flex items-center gap-0.5"
                                                >
                                                    <FaEdit size={12} /> 編輯
                                                </Link>
                                                <div className="border-t border-dashed border-gray-300 w-full"></div>
                                                <button
                                                    onClick={() => handleDelete(item.id, item.name)}
                                                    className="text-red-600 hover:text-red-800 flex items-center gap-0.5"
                                                >
                                                    <FaTrash size={12} /> 刪除
                                                </button>
                                                <div className="border-t border-dashed border-gray-300 w-full"></div>
                                                <Link
                                                    href={`/admin/members/${item.id}/qrcode`}
                                                    target="_blank"
                                                    className="text-green-600 hover:text-green-800 flex items-center gap-0.5 text-xs"
                                                >
                                                    <FaQrcode size={10} /> QRCode
                                                </Link>
                                                <div className="border-t border-dashed border-gray-300 w-full"></div>
                                                <Link
                                                    href={`/admin/members/${item.id}/barcode/1`}
                                                    target="_blank"
                                                    className="text-purple-600 hover:text-purple-800 flex items-center gap-0.5 text-xs"
                                                >
                                                    <FaBarcode size={10} /> 編號
                                                </Link>
                                                <div className="border-t border-dashed border-gray-300 w-full"></div>
                                                <Link
                                                    href={`/admin/members/${item.id}/barcode/2`}
                                                    target="_blank"
                                                    className="text-purple-600 hover:text-purple-800 flex items-center gap-0.5 text-xs"
                                                >
                                                    <FaBarcode size={10} /> 電話
                                                </Link>
                                                <div className="border-t border-dashed border-gray-300 w-full"></div>
                                                <Link
                                                    href={`/admin/members/${item.id}/barcode/3`}
                                                    target="_blank"
                                                    className="text-purple-600 hover:text-purple-800 flex items-center gap-0.5 text-xs"
                                                >
                                                    <FaBarcode size={10} /> 身份證
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                        <tfoot className="bg-gray-50">
                            <tr>
                                <td colSpan={14} className="px-3 py-2 text-center text-xs text-gray-500">
                                    {filteredItems.length > 0 ? (
                                        `共 ${filteredItems.length} 筆 - 在 ${currentPage} 頁 - 共 ${totalPages} 頁`
                                    ) : (
                                        '沒有資料'
                                    )}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-gray-600">
                            共 {filteredItems.length} 筆 - 在 {currentPage} 頁 - 共 {totalPages} 頁
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage(1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1 border rounded text-sm hover:bg-gray-50 disabled:opacity-50"
                            >
                                首頁
                            </button>
                            <button
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1 border rounded text-sm hover:bg-gray-50 disabled:opacity-50"
                            >
                                <FaChevronLeft size={12} />
                            </button>
                            <span className="px-3 py-1 border rounded text-sm bg-blue-600 text-white">
                                {currentPage}
                            </span>
                            <button
                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 border rounded text-sm hover:bg-gray-50 disabled:opacity-50"
                            >
                                <FaChevronRight size={12} />
                            </button>
                            <button
                                onClick={() => setCurrentPage(totalPages)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 border rounded text-sm hover:bg-gray-50 disabled:opacity-50"
                            >
                                末頁
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}