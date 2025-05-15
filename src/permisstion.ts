import router from './router'
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
// 取消转圈圈
// nprogress.configure({ showSpinner: false })
//权限检验
//全部路由组件:登录|404|任意路由|首页|数据大屏|权限管理(三个子路由)|商品管理(四个子路由)
//用户未登录:可以访问login,其余六个路由不能访问(指向login)
//用户登录成功:不可以访问login[指向首页],其余的路由可以访问
import pinia from './store'
import userUserStore from './store/modules/user'
const userStore = userUserStore(pinia)
router.beforeEach(async (to: any, from: any, next: any) => {
  nprogress.start()
  const token = userStore.token
  const username = userStore.username
  if (token) {
    //登录成功
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      // 登录其他的路由
      // 有用户信息才放行
      if (username) {
        next()
      } else {
        // 没有用户信息，请求发送用户信息 再放行
        try {
          await userStore.userInfo()
          //TODO why ...
          next({ ...to })
        } catch (error) {
          //token过期:获取不到用户信息了
          //用户手动修改本地存储token
          //退出登录->用户相关的数据清空
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    //用户未登录
    if ((to.path = '/login')) {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
  next()
})
// afterEach 没有第三个参数
router.afterEach((to: any, from: any) => {
  nprogress.done()
})
