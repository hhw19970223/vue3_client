
import vue from '@vitejs/plugin-vue'

export default {
    plugins: [vue()],

    port: 3003,
    // proxy: {
    //     '/hhw': {
    //         target: 'http://127.0.0.1:7001', // 后端服务实际地址
    //         changeOrigin: true,
    //         rewrite: path => path.replace(/^\/hhw/, 'hhw')
    //     },
    // },

    assetsDir: './assets',
    outDir: './hhw',

    optimizeDeps: {
        include: ["element-plus/lib/locale/lang/zh-cn"],
    }
}
