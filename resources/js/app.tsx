import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import SettingsLayout from '@/layouts/settings/layout';
import AdminLayout from '@/pages/Admin/Layouts/AdminLayout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Simple check if we're in SSR
const isSSR = typeof window === 'undefined';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        switch (true) {
            case name === 'welcome':
            case name === 'about':
            case name === 'timeline':
            case name === 'people':
            case name === 'life':
            case name === 'contact':
            case name === 'uninews':
            case name === 'job':
            case name === 'link':
            case name === 'qa':
            case name === 'product':
            case name === 'article':
            case name === 'download':
            case name === 'works':
            case name === 'member':
            case name === 'news':
            case name === 'announcement':
            case name === 'albums':
            case name === 'Admin/Login':
                return null;
            case name.startsWith('Admin/'):
                return AdminLayout;
            case name.startsWith('auth/'):
                return AuthLayout;
            case name.startsWith('settings/'):
                return [AppLayout, SettingsLayout];
            default:
                return AppLayout;
        }
    },
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')) as any,
    setup({ el, App, props }) {
        // Only create root if we're not in SSR
        if (!isSSR && el) {
            const root = createRoot(el);
            
            root.render(
                <TooltipProvider delayDuration={0}>
                    <App {...props} />
                    <Toaster />
                </TooltipProvider>
            );
        }
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();