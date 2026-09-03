import { useEffect } from 'react';
import { getStoredAppearance, isDarkMode } from '@/hooks/use-appearance';

let salonPageCount = 0;

function applySalonLightMode(): void {
    const html = document.documentElement;
    const body = document.body;

    html.classList.add('salon-page');
    html.dataset.salonPage = 'true';
    html.classList.remove('dark');
    html.style.colorScheme = 'light';
    html.style.backgroundColor = 'transparent';
    body.style.backgroundColor = '#fff';
}

function restoreThemeAfterSalon(): void {
    const html = document.documentElement;
    const body = document.body;

    html.classList.remove('salon-page');
    delete html.dataset.salonPage;
    html.style.backgroundColor = '';
    body.style.backgroundColor = '';

    const appearance = getStoredAppearance();
    const isDark = isDarkMode(appearance);
    html.classList.toggle('dark', isDark);
    html.style.colorScheme = isDark ? 'dark' : 'light';
}

/**
 * Force light mode on pages that use legacy salon CSS (asd_files)
 * which doesn't support dark mode. Tailwind's dark class would turn
 * sections black, breaking the layout.
 */
export function useForceLightMode(dependencies: unknown[] = []) {
    useEffect(() => {
        salonPageCount += 1;
        applySalonLightMode();

        return () => {
            salonPageCount -= 1;

            if (salonPageCount <= 0) {
                salonPageCount = 0;
                restoreThemeAfterSalon();
            }
        };
    }, dependencies);
}

export function isSalonLightModeActive(): boolean {
    return salonPageCount > 0 || document.documentElement.classList.contains('salon-page');
}
