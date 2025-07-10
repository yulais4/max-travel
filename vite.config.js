import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                    'resources/css/components/forms/newTag.css',
                    'resources/css/components/forms/searchDesktop.css',
                    'resources/css/components/forms/searchMobile.css',
                    'resources/css/components/menu/filters.css',
                    'resources/css/components/menu/topbar.css',
                    'resources/css/components/bottomPopup.css',
                    'resources/css/components/map.css',
                    'resources/css/components/navbar.css',
                    'resources/css/app.css',
                    'resources/css/map.css',
                    'resources/css/root.css',
                    'resources/css/style.css',
                    'resources/js/components/ui/forms/newTag.js',
                    'resources/js/components/ui/menu/bottomPopup.js',
                    'resources/js/components/ui/menu/topbar.js',
                    'resources/js/components/ui/menu/filters.js',
                    'resources/js/material-import.js',
                    'resources/js/app.js',
                    'resources/js/date-filter.js',
                    'resources/js/likes.js',
                    'resources/js/main.js',
                    'resources/js/components/ui/map.js'
                ],
            refresh: true,
        }),
    ],
});
