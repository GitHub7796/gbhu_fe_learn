<template>
  <div>
    <el-button
      type="primary"
      size="small"
      icon="Refresh"
      circle
      @click="updateRefsh"
    ></el-button>
    <el-button
      type="primary"
      size="small"
      icon="FullScreen"
      circle
      @click="fullScreen"
    ></el-button>
    <el-button type="primary" size="small" icon="Setting" circle></el-button>
    <img
      :src="userStore.avatar"
      style="width: 24px; height: 24px; margin: 0px 10px; border-radius: 50%"
    />
    <!-- 下拉菜单 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userStore.username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting'
import userUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'
// 路由器对象
let $router = useRouter()
// 路由对象
let $route = useRoute()
let userStore = userUserStore()
let layOutSettingStore = useLayOutSettingStore()
const updateRefsh = () => {
  layOutSettingStore.refresh = !layOutSettingStore.refresh
}
const fullScreen = () => {
  // 判断是否为全屏
  let full = document.fullscreenElement
  if (!full) {
    // 全屏模式
    document.documentElement.requestFullscreen()
  } else {
    // 推出全屏
    document.exitFullscreen()
  }
}
const logout = async () => {
  //第一件事情:需要向服务器发请求[退出登录接口]******
  //第二件事情:仓库当中关于用于相关的数据清空[token|username|avatar]
  await userStore.userLogout()
  //第三件事情:跳转到登录页面
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>
<style lang="scss"></style>
