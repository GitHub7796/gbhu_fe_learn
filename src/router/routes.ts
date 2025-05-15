//对外暴露配置路由(常量路由):全部用户都可以访问到的路由
export const constantRoute = [
]

//异步路由
export const asnycRoute = [
]

//任意路由
export const anyRoute = {
  //任意路由
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  name: 'Any',
  meta: {
    title: '任意路由',
    hidden: true,
    icon: 'DataLine',
  },
}
