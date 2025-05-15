import { createApp } from 'vue'

// element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn' // 国际化
import App from '@/App.vue'
import '@/styles/index.scss' //引入sass
import 'virtual:svg-icons-register' // 加载svg 插件
import pinia from './store'
import axios from 'axios'

import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue' //引入所有的icon
import './permisstion'
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn, // 国际化
})
//注册所有icon为全局图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
console.log('app.use(pinia)')
app.use(pinia)
console.log('app.use(globalComponent)')
import globalComponent from './components/Index'
app.use(globalComponent)
console.log('app.use(router)')
app.use(router)
app.mount('#app')
