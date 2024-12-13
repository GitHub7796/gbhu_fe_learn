import request from '@/utils/request'
import {loginFrom,loginResponseData,userResponseData} from './type'
// 统一管理接口
enum API{
    LOGIN_URL="/user/login",
    USERINFO_URL="/user/info",
}
// 暴露请求函数
export const reqLogin=(data:loginFrom)=> request.post<any,loginResponseData>(API.LOGIN_URL,data)
export const reqUserInfo=()=>request.get<any,userResponseData>(API.USERINFO_URL)