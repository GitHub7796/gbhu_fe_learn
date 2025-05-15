<template lang="">
  <div class="layout_contanier">
    <div class="layout_slider" :class="{ fold: layOutSettingStore.fold }">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <el-menu
          :default-active="$route.path"
          background-color="#001529"
          text-color="white"
          active-text-color="yellowgreen"
          :collapse="layOutSettingStore.fold"
          collapse-transition="false"
        >
          <!-- 根据路由动态生产菜单 -->
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout_tabber" :class="{ fold: layOutSettingStore.fold }">
      <Tabbar />
    </div>
    <div class="layout_main" :class="{ fold: layOutSettingStore.fold }">
      <Main></Main>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
import userUserStore from '@/store/modules/user'
import useLayOutSettingStore from '@/store/modules/setting'
let layOutSettingStore = useLayOutSettingStore()
let $route = useRoute()
let userStore = userUserStore()
</script>
<style lang="scss">
.layout_contanier {
  width: 100%;
  height: 100vh;

  // background-color:$base-menu-backgroumd;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    // TODO transition
    transition: all 0.3s;
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
    }

    &.fold {
      width: $base-menu-min-width;
    }
  }

  .layout_tabber {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    background-color: yellowgreen;
    top: 0;
    left: $base-menu-width;
    transition: all 0.3s;
    &.fold {
      width: calc(100% - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100% - $base-tabbar-height);
    background-color: rosybrown;
    top: $base-tabbar-height;
    left: $base-menu-width;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;
    &.fold {
      width: calc(100% - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>
