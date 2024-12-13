import { createApp } from 'vue'

// element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn' // 国际化
import App from '@/App.vue'
import '@/styles/index.scss' //引入sass
// 加载svg 插件
import 'virtual:svg-icons-register'
import axios from 'axios'
import  globalComponent  from './components/Index'
import router from './router'
import pinia from './store'

const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn, // 国际化
})
app.use(globalComponent)
app.use(router)
app.use(pinia)
app.mount('#app')
