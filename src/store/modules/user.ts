//用户相关小仓库
import {defineStore} from 'pinia';
import { reqLogin } from '@/api/user';
import { loginFrom } from '@/api/user/type';
let userUserStore=defineStore('User',{
    state:()=>{
        return{
            token:localStorage.getItem('TOKEN')
        }
    },
    //异步|逻辑的地方
    actions:{
        async userLogin(data:loginFrom){ 
            let result= await reqLogin(data).then()
            if(result.code===200){
                this.token=result.data.token;
                localStorage.setItem('TOKEN',result.data.token)
                return "ok"
            }else{
                return Promise.reject(new Error(result.data.message))
            }
        }
    },
    getters:{

    }
})
export default userUserStore;