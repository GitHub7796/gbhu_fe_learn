<template>
  <div class="tabbar">
    <Breadcrumb class="tabber_left" />
    <Setting class="tabber_right" />
  </div>
</template>
<script setup lang="ts">
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
</script>
<style lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  // TODO flex、justify-content 笔记完成
  display: flex;
  justify-content: space-between;
  .tabber_left {
    display: flex;
    // TODO  align-items
    align-items: center;
    margin-left: 20px;
  }
  .tabber_right {
    display: flex;
    align-items: center;
  }
}
</style>
