<template>
    <div class="login_containre">
      <el-row>
        <el-col :span="12" :xs="0"></el-col>
        <el-col :span="12" :xs="24">
          <el-form class="login_form">
            <h1>Hello</h1>
            <p>欢迎来到硅谷甄选</p>
            <el-form-item>
              <el-input v-model="loginForm.username" :prefix-icon="User" ></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="loginForm.password" :prefix-icon="Lock" type="password" show-password></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="login_btn" @click="login">登录</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>  
  </template>
  <script setup lang="ts">
  import { User, Lock } from '@element-plus/icons-vue';
  import { reactive } from 'vue';
  import userUserStore from '@/store/modules/user';
  import { useRouter } from 'vue-router';
  import { ElNotification } from 'element-plus';
  let $router=useRouter()
  let useStore=userUserStore()
  
  let loginForm=reactive({
    username:'',
    password:''
  })
  
  const login= async ()=>{
    try{
      // 可以用.then
      await useStore.userLogin(loginForm);
      $router.push('/');
      ElNotification({
        type:'success',
        message:'登录成功'
      })
    }
    catch (error){
      ElNotification({
        type:'error',
        message:(error as Error).message
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
  