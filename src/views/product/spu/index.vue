<template>
  <div>
    <Category></Category>
    <el-card style="margin: 10px 0px">
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="Plus"
          @click="addSpu"
          :disabled="categoryStore.c3Id ? false : true"
        >
          添加SPU
        </el-button>
        <el-table :data="records" style="width: 100%; margin: 10px 0px" border>
          <el-table-column
            label="序号"
            width="80px"
            type="index"
          ></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column label="SPU描述" prop="description"></el-table-column>
          <el-table-column label="SPU操作">
            <template #="{ row, $index }">
              <el-button type="primary" size="small" icon="Plus"></el-button>
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                @click="updateSpu(row)"
              ></el-button>
              <el-button type="primary" size="small" icon="View"></el-button>
              <el-button type="primary" size="small" icon="Delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[3, 5, 7, 9]"
          :background="true"
          layout=" prev, pager, next, jumper,->,total, sizes"
          :total="total"
          @size-change="currentChange"
          @current-change="getHasSpu"
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
import { reqHasSpu } from '@/api/product/spu'
import { ref, watch, onBeforeUnmount } from 'vue'
import useCategoryStore from '@/store/modules/category'
import { Reocrds, HasSpuResponseData, SpuData } from '@/api/product/spu/type'
let categoryStore = useCategoryStore()
let scene = ref<number>(0)
let pageNo = ref<number>(1)
let pageSize = ref<number>(3)
let total = ref<number>(0)
let records = ref<Reocrds>([])
let spu = ref<any>()
watch(
  () => categoryStore.c3Id,
  () => {
    records.value = []
    getHasSpu()
  },
)
const currentChange = () => {
  pageNo.value = 1
  getHasSpu()
}
const getHasSpu = async () => {
  const result = await reqHasSpu(
    pageNo.value,
    pageSize.value,
    categoryStore.c3Id,
  )
  if (result.code == 200) {
    records.value = result.data.records
    total.value = result.data.total
  }
}
const addSpu = () => {
  //切换为场景1:添加与修改已有SPU结构->SpuForm
  spu.value.initAddSpu(categoryStore.c3Id)
  scene.value = 1
}
const changeScene = () => {
  scene.value = 0
}
const updateSpu = (row: SpuData) => {
  scene.value = 1
  spu.value.initHasSpuData(row)
}
</script>
<style></style>
