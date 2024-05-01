import {defineConfig} from 'vite'

export default defineConfig({
    base: '',
    build:{
        rollupOptions:{
            input:['./index.html','./scriptsmth.ts'],
            output:{
                chunkFileNames: `assets/[name].js`,
                entryFileNames: `assets/[name].js`,
                assetFileNames: `assets/[name].[ext]`
            }
        }
    }
});