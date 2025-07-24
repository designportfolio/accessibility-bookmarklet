import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        modulePreload: {
            polyfill: false,
        },
        rollupOptions: {
            output: {
                assetFileNames: `[name].[ext]`,
                chunkFileNames: `[name].js`,
                entryFileNames: `[name].js`,
            },
        },
    },
});
