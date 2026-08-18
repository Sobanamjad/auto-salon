import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    HomeIcon, 
    UsersIcon, 
    SettingsIcon, 
    LogOutIcon,
    MenuIcon,
    XIcon,
    FileTextIcon,
    CalendarIcon
} from 'lucide-react';

interface AdminLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function AdminLayout({ children, title = 'Dashboard' }: AdminLayoutProps) {
    const { url } = usePage();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const menuItems = [
        { text: 'Dashboard', icon: HomeIcon, href: '/admin' },
        { text: 'Users', icon: UsersIcon, href: '/admin/users' },
        { text: 'News', icon: FileTextIcon, href: '/admin/news' },
        { text: 'Events', icon: CalendarIcon, href: '/admin/events' },
        { text: 'Settings', icon: SettingsIcon, href: '/admin/settings' },
    ];

    const isActive = (href: string) => {
        if (href === '/admin') return url === href;
        return url.startsWith(href);
    };

    const handleLogout = () => {
        if (confirm('Are you sure you want to logout?')) {
            window.location.href = '/admin/logout';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } w-64 bg-white border-r border-gray-200 shadow-lg`}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <Link href="/admin" className="flex items-center space-x-2">
                        <img src="/asd_files/202607211337474254.png" alt="Logo" className="w-8 h-8 object-contain" />
                        <span className="text-xl font-bold text-gray-800">管理系統</span>
                    </Link>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 rounded hover:bg-gray-100">
                        <XIcon className="w-5 h-5" />
                    </button>
                </div>

                <nav className="p-4 space-y-1">
                    {menuItems.map((item, index) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);
                        return (
                            <Link key={index} href={item.href} className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                                active ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                            }`}>
                                <Icon className={`w-5 h-5 ${active ? 'text-blue-600' : 'text-gray-500'}`} />
                                <span className="font-medium">{item.text}</span>
                                {active && <span className="ml-auto w-1.5 h-8 bg-blue-600 rounded-full"></span>}
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
                    <button onClick={handleLogout} className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition">
                        <LogOutIcon className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
                <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center space-x-4">
                            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-gray-100 transition">
                                <MenuIcon className="w-5 h-5 text-gray-600" />
                            </button>
                            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">Welcome, Admin</span>
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">A</div>
                        </div>
                    </div>
                </header>

                <main className="p-6">{children}</main>
            </div>

            {sidebarOpen && <div className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />}
        </div>
    );
}