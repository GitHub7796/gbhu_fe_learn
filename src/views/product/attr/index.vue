<template>
  <div>
    <Category />
    <el-card style="margin: 10px 0px">
      <div v-show="scene == 0">
        <el-button type="primary" icon="Plus" @click="addAttr">
          添加平台属性
        </el-button>
        <el-table :data="attrArr" border style="margin: 10px">
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="80px"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="attrName"
            label="属性名称"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row, $index }">
              <el-tag
                style="margin: 5px"
                v-for="(item, index) in row.attrValueList"
                :key="item.id"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="prop"
            label="操作"
            width="120px"
          >
            <template #="{ row, $index }">
              <el-button type="primary" icon="Edit" size="small"></el-button>
              <el-button type="primary" icon="Delete" size="small"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene == 1">
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input
              v-model="attrParams.attrName"
              placeholder="请输入属性名称"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="Plus"
          :disabled="attrParams.attrName ? false : true"
          @click="addAttrValue"
        >
          添加属性值
        </el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
        <el-table :data="attrParams.attrValueList" style="width: 100%">
          <el-table-column label="序号" type="index" width=""></el-table-column>
          <el-table-column label="属性值">
            <template #="{ row, $index }">
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值名称"
              ></el-input>
              <div></div>
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="" width=""></el-table-column>
        </el-table>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import useCategoryStore from '@/store/modules/category'
import { reqAttr } from '@/api/product/attr'
import { watch, ref, reactive } from 'vue'
import type { AttrResponseData, Attr, AttrValue } from '@/api/product/attr/type'
let categoryStore = useCategoryStore()
//存储已有的属性与属性值
let attrArr = ref<Attr[]>([])
let attrParams = reactive<Attr>({
  attrName: '',
  attrValueList: [],
  categoryId: '', //三级分类的ID
  categoryLevel: 3, //代表是三级分类
})
// card 内容切换变量
let scene = ref<number>(0)
watch(
  () => categoryStore.c3Id,
  () => {
    getAttr()
  },
)
const addAttr = () => {
  // 清空数据
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    categoryId: categoryStore.c3Id, //三级分类的ID
    categoryLevel: 3, //代表是三级分类
  })
  scene.value = 1
}
const save = () => {
  scene.value = 0
}
const cancel = () => {
  scene.value = 0
}
const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: '',
    flag: true, //控制编辑模式切换
  })
}
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  const result = await reqAttr(c1Id, c2Id, c3Id)
  if (result.code == 200) {
    attrArr.value = result.data
  }
}
</script>
<style lang="scss"></style>
