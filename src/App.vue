<template>
  <div>
    <router-view></router-view>
  </div>
  <h1>hello world</h1>
  <div>
    <el-button>Default</el-button>
    <el-button type="primary" :icon="Edit" circle />
  </div>
  <!-- svg 外层容器节点，内部需要与use标签结合使用 -->
   <!-- style 设置图谱的大小 -->
  <svg style="width:150px;height:500px;">
    <!-- 最新版本 xlink:href ，xlink-href 被废弃了 -->
     <!-- filled 填充颜色，有的SVG图标不能被填充 -->
    <use xlink:href="#icon-test" filled="yellow"></use>
  </svg>
  <!-- 使用封装的SVG -->
  <!-- 使用sass中定义的变量 -->
  <svg-icon name="test" color="red" width="50px" height="50px"></svg-icon>
</template>
<script setup lang="ts">
import { Edit } from '@element-plus/icons-vue';
import SvgIcon from '@/components/SvgIcon/Index.vue'
import request  from '@/utils/request';
import { onMounted } from 'vue';
import {reqLogin} from './api/user'
onMounted(()=>{
  request({
    url:'/api/user/login',
    method:'post',
    data:{
      username:"Admin",
      password:"11111",
    }
  }).then(res=>{
    console.log(res)
  }),
  reqLogin({username:"admin",password:"111111"})
})
</script>
<style scoped lang="scss">
h1{
  color:$color_red;
}
</style>

