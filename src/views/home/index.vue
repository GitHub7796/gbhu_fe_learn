<template>
  <div>
    <p>home路由</p>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import userUserStore from '@/store/modules/user'
let userStore = userUserStore()
onMounted(() => {
  userStore.userInfo()
})
</script>
<style></style>
