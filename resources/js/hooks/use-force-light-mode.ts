import { useEffect } from 'react';

/**
 * Force light mode on pages that use legacy salon CSS (asd_files)
 * which doesn't support dark mode. Tailwind's dark class would turn
 * sections black, breaking the layout.
 *
 * Usage: Call this hook at the top of any salon page component.
 * Monitors dependency array to re-apply on page/tab changes.
 */
export function useForceLightMode(dependencies: unknown[] = []) {
    useEffect(() => {
        const html = document.documentElement;
        const hadDark = html.classList.contains('dark');
        const prevBg = html.style.backgroundColor;

        // Force light mode
        html.classList.remove('dark');
        html.style.colorScheme = 'light';
        html.style.backgroundColor = 'transparent';

        // Cleanup: restore previous state when leaving the page
        return () => {
            if (hadDark) {
                html.classList.add('dark');
                html.style.colorScheme = 'dark';
            }
            html.style.backgroundColor = prevBg;
        };
    }, dependencies);
}
