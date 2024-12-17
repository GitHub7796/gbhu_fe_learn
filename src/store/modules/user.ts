//用户相关小仓库
import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'
import type { loginFrom,loginResponseData } from '@/api/user/type'
import type { UserState } from './types/type'
import { GET_TOKEN, SET_TOKEN} from '@/utils/token'
import {constantRoute} from '@/router/routes'
let userUserStore = defineStore('User', {
  state: ():UserState => { 
    return {
      token: GET_TOKEN(),
      menuRoutes:constantRoute,
    }
  },
  //异步|逻辑的地方
  actions: {
    async userLogin(data: loginFrom) {
      let result:loginResponseData = await reqLogin(data).then()
      if (result.code === 200) {
        this.token = (result.data.token as string) // as 语法 确定 返回值类型为string
        SET_TOKEN(result.data.token as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
  },
  getters: {},
})
export default userUserStore
