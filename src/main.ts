import { createApp } from 'vue'

// element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn' // 国际化

import App from '@/App.vue'
import '@/styles/index.scss' //引入sass

const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn, // 国际化
})
console.log(import.meta.env)
// 加载svg 插件
import 'virtual:svg-icons-register'
import axios from 'axios'
axios({
  url:'/api/user/login',
  method:'post',
  data:{
    username:"admin",
    password:"112211",
  }
})
import  globalComponent  from './components/Index'
app.use(globalComponent)
import router from './router'
app.use(router)
app.mount('#app')
