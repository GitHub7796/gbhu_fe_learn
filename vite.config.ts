import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' //npm path模块,用于配置文件别名
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons' //svg 插件
import { viteMockServe } from 'vite-plugin-mock' //mock 插件
// https://vite.dev/config/
export default defineConfig((command) => {
  //command 为 mock 配置
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        mockPath: 'mock',
        // enable: command === 'serve', //vite-plugin-mock 3.x用这个
        // localEnabled: command === 'dev', //vite-plugin-mock 2.x用这个
        localEnabled: true, //vite-plugin-mock 2.x用这个
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
      },
    },
    // sass 全局变量配置
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/variable.scss";',
        },
      },
    },
  }
})
