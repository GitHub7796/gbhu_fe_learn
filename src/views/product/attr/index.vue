<template>
  <div>
    <Category/>
    <el-card style="margin:10px 0px" >
      <el-button type="primary" icon="Plus">添加平台属性</el-button>
      <el-table :data="attrArr">
        <el-table-column type="index"  align="center" label="序号" width="80px">
        </el-table-column>
        <el-table-column align="center" prop="attrName" label="属性名称">
        </el-table-column>
        <!-- <el-table-column label="属性值名称">
          <template #="{row,index}">
            <el-tag style="margin:5px" v-for="(item,index) in row.attrValueList" :key="item.id">
              {{ item.valueName}}
            </el-tag>
          </template>
        </el-table-column> -->
        <el-table-column  align="center" prop="prop" label="操作" width="120px">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup type="ts">
import useCategoryStore from '@/store/modules/category';
import { reqAttr } from '@/api/product/attr';
import { watch,ref} from 'vue';
// import { AttrResponseData ,Attr} from '@/api/product/attr/type';
import { AttrResponseData } from '@/api/product/attr/type';
import { Ref } from 'vue';
let categoryStore = useCategoryStore()
// 存储已有属性、属性值
let attrArr = ref([]);
// watch(()=>categoryStore.c3Id,()=>{
//   getAttr()
// }
// )
// const getAttr= async ()=>{
//   const {c1Id,c2Id,c3Id} = categoryStore;
//   const result = await reqAttr(c1Id,c2Id,c3Id)
//   if (result.code == 200) {
//     attrArr.value=result.value
//   }
// }

</script>
<style lang="scss"></style>
