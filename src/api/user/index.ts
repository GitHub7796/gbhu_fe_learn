import request from '@/utils/request'
import { loginFrom, loginResponseData, userInfoReponseData } from './type'
// 统一管理接口
enum API {
  LOGIN_URL = '/acl/user/login',
  USERINFO_URL = '/acl/user/info',
}
// 暴露请求函数
// 登录
export const reqLogin = (data: loginFrom) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)
// 获取用户信息
export const reqUserInfo = () =>
  request.get<any, userInfoReponseData>(API.USERINFO_URL)
// 退出登录，没有后端接口
export const reqLogout = () => request.post<any, any>(API.LOGIN_URL)
