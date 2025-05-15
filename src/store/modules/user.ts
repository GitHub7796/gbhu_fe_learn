//用户相关小仓库
import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo } from '@/api/user'
import type {
  loginFrom,
  loginResponseData,
  userInfoReponseData,
} from '@/api/user/type'
import type { UserState } from './types/type'
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import { constantRoute } from '@/router/routes'
const userUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
    }
  },
  //异步|逻辑的地方
  actions: {
    async userLogin(data: loginFrom) {
      const result: loginResponseData = await reqLogin(data).then()
      if (result.code === 200) {
        this.token = result.data
        SET_TOKEN(result.data)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.messages))
      }
    },
    async userInfo() {
      const result: userInfoReponseData = await reqUserInfo()
      if (result.code == 200) {
        this.username = result.data.username
        this.avatar = result.data.avatar
      } else {
        return Promise.reject(new Error(result.messages))
      }
    },
    async userLogout() {
      // 没有后端接口
      this.token = ''
      this.username = ''
      this.avatar = ''
      REMOVE_TOKEN()
      return 'ok'
    },
  },
  getters: {},
})
export default userUserStore
