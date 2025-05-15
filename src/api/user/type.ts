export interface loginFrom {
  username: string
  password: string
}
// 返回类型抽象父类
export interface responseData {
  code: number
  messages: string
  succes: boolean
}
// 定义登录返回类型
/**
 * {"data":"Admin Token","code":200,"message":"登录成功","success":true}
 */
export interface loginResponseData extends responseData {
  data: string
}
// 定义用户信息返回类型
/**
 * "id": 1,
"name": "admin",
"username": "admin",
"password": null,
"phone": null,
"avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
"desc": null,
"token": null,
"roleName": null,
"roles": [...],
"buttons": [...],
"routes": [...],
"createTime": null,
"updateTime": null
 */
export interface userInfoReponseData extends responseData {
  data: {
    id: string
    name: string
    username: string
    password: string
    phone: string
    avatar: string
    roleName: string
    roles: string[]
    buttons: string[]
    routes: string[]
    createTime: string
    updateTime: string
  }
}
