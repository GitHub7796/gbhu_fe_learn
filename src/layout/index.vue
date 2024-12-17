<template lang="">
    <div class ="layout_contanier">
        <div class="layout_slider">
            <Logo></Logo>
            <el-scrollbar class="scrollbar">
                <el-menu :default-active="$route.path" background-color="#001529" text-color="white" active-text-color="yellowgreen">
                    <!-- 根据路由动态生产菜单 -->
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <div class="layout_tabber">
        </div>
        <div class="layout_main">
            <Main></Main>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import userUserStore from '@/store/modules/user';
let $route=useRoute()
let userStore=userUserStore()
</script>
<style lang="scss">
    .layout_contanier{
        width: 100%;
        height: 100vh;
        // background-color:$base-menu-backgroumd;
        .layout_slider{
            width: $base-menu-width;
            height: 100vh;
            background-color: $base-menu-background;
            .scrollbar{
                width: 100%;
                height: calc(100vh - $base-menu-logo-height);
            }
        }
        .layout_tabber{
            position:fixed;
            width: calc(100% - $base-menu-width);
            height: $base-tabbar-height;
            background-color: yellowgreen;
            top:0;
            left:$base-menu-width;
        }
        .layout_main{
            position: absolute;
            width:  calc(100% - $base-menu-width);
            height: calc(100% - $base-tabbar-height);
            background-color: rosybrown;
            top:$base-tabbar-height;
            left:$base-menu-width;
            padding: 20px;
            overflow: auto;
        }
    }
</style>