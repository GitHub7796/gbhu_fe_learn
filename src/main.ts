import { createApp } from 'vue'

// element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn' // 国际化
import App from '@/App.vue'
import '@/styles/index.scss' //引入sass
import 'virtual:svg-icons-register' // 加载svg 插件
import axios from 'axios'
import globalComponent from './components/Index'
import router from './router'
import pinia from './store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue' //引入所有的icon


const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn, // 国际化
})
//注册所有icon为全局图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(globalComponent)
app.use(router)
app.use(pinia)
app.mount('#app')
