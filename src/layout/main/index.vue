<template>
  <div>
    <router-view v-if="flag"></router-view>
  </div>
</template>
<script setup lang="ts">
//TODO watch, ref, nextTick
import { watch, ref, nextTick } from 'vue'
import useLayOutSettingStore from '@/store/modules/setting'
let layOutSettingStore = useLayOutSettingStore()
let flag = ref(true)
watch(
  () => layOutSettingStore.refresh,
  () => {
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>
<style lang="scss"></style>
