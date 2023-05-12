import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    open: true,
    host: 'localhost', //默认主机
    port: 5173, //默认端口号
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        math: 'always', // 在编译的时候就处理数学表达式
        // globalVar: { // 设置全局变量
        //   colorGreen: '#bfa'
        // }
      }
    }
  },
  
})
