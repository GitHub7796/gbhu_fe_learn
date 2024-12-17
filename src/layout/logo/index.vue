<template lang="">
    <div class="logo">
        <img :src="setting.logo" alt=""/>
        <p>{{setting.title}}</p>
    </div>
</template>
<script setup lang="ts">
import { setting } from '@/setting';
</script>
<style lang="scss">
.logo {
    width: 100%;
    height: $base-menu-logo-height;
    color: white;
    display: flex; //TODO  后续学习 display: flex ；align-items
    align-items: center;
    padding: 10px;

    img {
        width: 40px;
        height: 40px;
    }

    p {
        font-size: $base-logo-title-fontSize;
        margin-left: 10px;
    }
}
</style>