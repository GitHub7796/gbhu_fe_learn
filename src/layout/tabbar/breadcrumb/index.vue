<template>
  <div>
    <el-icon @click="changeIcon">
      <component
        :is="layOutSettingStore.$state.fold ? 'Fold' : 'Expand'"
      ></component>
    </el-icon>
    <el-breadcrumb :separator-icon="ArrowRight">
      <!-- 动态展示面包屑 -->
      <el-breadcrumb-item
        v-for="(item, index) in $route.matched"
        :key="index"
        :to="item.path"
      >
        <el-icon style="margin-left: 10px">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script setup lang="ts">
import { ArrowRight, Expand } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import useLayOutSettingStore from '@/store/modules/setting'
let layOutSettingStore = useLayOutSettingStore()
let $route = useRoute()
const changeIcon = () => {
  layOutSettingStore.fold = !layOutSettingStore.fold
}
</script>
<style lang="scss"></style>
