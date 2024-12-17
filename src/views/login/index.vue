<template>
  <div class="login_containre">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
          <h1>Hello</h1>
          <p>欢迎来到硅谷甄选</p>
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" :prefix-icon="User"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" :prefix-icon="Lock" type="password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login_btn" @click="login">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import userUserStore from '@/store/modules/user'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time'
let $router = useRouter()
let useStore = userUserStore()

let loginForm = reactive({
  username: '',
  password: '',
})
let loginForms = ref()
const validateUsername=(rule: any, value: any, callback: any) => {
  //rule 检验规则对象
  //value 当前检验的值
  // callback 回调函数，校验通过不传参，校验不通过传参
  if (value.length < 3) {
    callback(new Error('用户名需要大于3位'))
  } else if(value.length > 10) {
    callback(new Error('用户名需要小于10位'))
  }else {
    callback()
  }
}
// 规则对象属性
// required 必输
// message 错误的提示信息
// min 最小长度
// max 最大长度
// trigger 触发表单的时机，change 文本发生变化触发 blur 失去焦点触发
const rules = {
  username: [
    // { required: true, message: '请输入用户名', trigger: 'blur' },
    {required :true, trigger: 'blur',validator:validateUsername},
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 12, message: '密码长度在6-12之间', trigger: 'blur' }
  ]
}
const login = async () => {
  // 保证输入符合规范，才发送请求
  await loginForms.value.validate()
  try {
    // 可以用.then
    await useStore.userLogin(loginForm)
    $router.push('/')
    ElNotification({
      type: 'success',
      message: '登录成功',
      title: `HI,${getTime()}好`
    })
  } catch (error) {
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}
</script>
<style scoped lang="scss">
.login_containre {
  widows: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    p {
      font-size: 20px;
      color: white;
      margin: 20px 0px;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
