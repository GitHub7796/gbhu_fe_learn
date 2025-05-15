<template>
  <el-card>
    <!--  inline 表示都在一行-->
    <el-form ref="form" :inline="true">
        <el-form-item label="一级分类" style="width: 240px">
            <el-select v-model="categoryStore.c1Id" @change="handler" >
              <el-option v-for="item in categoryStore.c1Arr" :key="item.id" :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="二级分类" style="width: 240px">
          <el-select v-model="categoryStore.c2Id" @change="handler1">
              <el-option v-for="item in categoryStore.c2Arr" :key="item.id" :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="三级分类" style="width: 240px">
          <el-select v-model="categoryStore.c3Id" >
              <el-option v-for="item in categoryStore.c3Arr" :key="item.id" :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
        </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang='ts'>
import { onMounted } from 'vue';
import useCategoryStore from '@/store/modules/category';
let categoryStore = useCategoryStore();

onMounted(()=>{
 getC1()
})
const handler=()=>{
  getC2()
}
const handler1=()=>{
  getC3()
}
const getC1 = ()=>{
  categoryStore.getC1()
}
const getC2 = ()=>{
  categoryStore.getC2()
}
const getC3 = ()=>{
  categoryStore.getC3()
}
</script>
<style scoped></style>
    