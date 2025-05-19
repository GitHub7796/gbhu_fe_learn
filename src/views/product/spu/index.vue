<template>
  <div>
    <Category></Category>
    <el-card style="margin: 10px 0px">
      <div v-show="scene == 0">
        <el-button type="primary" icon="Plus" @click="addSpu">
          添加SPU
        </el-button>
        <el-table
          :data="tableData"
          style="width: 100%; margin: 10px 0px"
          border
        >
          <el-table-column label="序号" prop="" width=""></el-table-column>
          <el-table-column label="SPU名称" prop="" width=""></el-table-column>
          <el-table-column label="SPU描述" prop="" width=""></el-table-column>
          <el-table-column label="SPU操作" prop="" width=""></el-table-column>
        </el-table>
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="limit"
          :page-sizes="[3, 5, 7, 9]"
          :background="true"
          layout=" prev, pager, next, jumper,->,total, sizes"
          :total="total"
          @size-change="sizeChange"
          @current-change="currentChange"
        />
      </div>
      <SpuForm
        ref="spu"
        v-show="scene == 1"
        @changeScene="changeScene"
      ></SpuForm>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import SpuForm from './spuForm.vue'
import { ref, watch, onBeforeUnmount } from 'vue'
let scene = ref<number>(0)
const addSpu = () => {
  //切换为场景1:添加与修改已有SPU结构->SpuForm
  scene.value = 1
}
const changeScene = () => {
  scene.value = 0
}
</script>
<style></style>
