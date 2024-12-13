import axios from 'axios'
import { ElMessage } from 'element-plus'//消息提示组件
let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})
request.interceptors.request.use((config) => {
  // config 配置对象，里边有请求的信息，可以用来处理请求头，添加公共参数
  return config
})
// 相应拦截器，有2回调：成功、失败
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => { //处理不同错误，显示不同组件
    let msg = ''
    let status = error.response.status
    switch (status) {
      case 401:
        msg = 'token过期'
        break
      case 403:
        msg = '无权访问'
        break
      case 404:
        msg = '请求地址错误'
        break
      case 500:
        msg = '服务器出现问题'
        break
      default:
        msg = '无网络'
    }
    ElMessage({
      type: 'error',
      message: msg,
    })
    return Promise.reject(error)
  },
)

export default request;