import AdminLayout from './Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AdminLayout title="Dashboard">
            <Head title="Admin Dashboard" />
            
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-800">Welcome to Admin Panel!</h2>
                <p className="text-gray-600 mt-2">You are logged in as Super Admin.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-blue-800">Users</h3>
                        <p className="text-3xl font-bold text-blue-600 mt-2">1,234</p>
                    </div>
                    <div className="bg-green-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-green-800">Posts</h3>
                        <p className="text-3xl font-bold text-green-600 mt-2">567</p>
                    </div>
                    <div className="bg-purple-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-purple-800">Views</h3>
                        <p className="text-3xl font-bold text-purple-600 mt-2">45.2K</p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}