<template>
  <el-form ref="form" label-width="80px">
    <el-form-item label="SPU名称">
      <el-input
        placeholder="请输入SPU名称"
        v-model="spuParams.spuName"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select v-model="spuParams.tmId" placeholder="">
        <el-option
          v-for="(item, index) in allTradeMark"
          :key="item.id"
          :label="item.tmName"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        type="textarea"
        placeholder="请输入SPU描述"
        v-model="spuParams.description"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU图标">
      <!-- v-model:file-list 展示图片列表,对对象有要求 须有url name 字段
      action 上传图片地址
      list-type 文件列表类型
      -->
      <el-upload
        v-model:file-list="imgList"
        action="http://localhost:9000/image/uploadImage"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :before-upload="handlerUpload"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img
          w-full
          :src="dialogImageUrl"
          alt="Preview Image"
          style="width: 100%; height: 100%"
        />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select v-model="model" placeholder="">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button type="primary" icon="Plus" style="margin: 0px 10px">
        添加属性
      </el-button>
      <el-table :data="saleAttr" style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="80px"
        ></el-table-column>
        <el-table-column
          prop="saleAttrName"
          label="销售属性名称"
        ></el-table-column>
        <el-table-column prop="prop" label="销售属性值">
          <template #="{ row, $index }">
            <el-tag
              style="margin: 0px 5px"
              v-for="(item, index) in row.spuSaleAttrList"
              :key="row.id"
            >
              {{ item.valueName }}
            </el-tag>
            <el-button type="primary" icon="Plus" size="small"></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #="{ row, $index }">
            <el-button type="primary" icon="Delete" size="small"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button type="primary" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { SpuData } from '@/api/product/spu/type'
import { ref } from 'vue'
import {
  reqAllTradeMark,
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAllSaleAttr,
  reqAddOrUpdateSpu,
} from '@/api/product/spu'
import type {
  SaleAttrValue,
  HasSaleAttr,
  SaleAttr,
  SpuImg,
  Trademark,
  AllTradeMark,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
} from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'
let $emit = defineEmits(['changeScene'])
let allSaleAttr = ref<HasSaleAttr[]>([]) // 所有销售属性
let allTradeMark = ref<Trademark[]>([]) //已有SPU数据
let imgList = ref<SpuImg[]>([]) //商品图片
let saleAttr = ref<SaleAttr[]>([])
let dialogImageUrl = ref<string>('') //预览图片地址
let dialogVisible = ref<boolean>(false) //对话框显示隐藏
let spuParams = ref<SpuData>({
  category3Id: '', //收集三级分类的ID
  spuName: '', //SPU的名字
  description: '', //SPU的描述
  tmId: '', //品牌的ID
  spuImageList: [],
  spuSaleAttrList: [],
})
const cancel = () => {
  $emit('changeScene')
}
const save = () => {
  $emit('changeScene')
}
const initHasSpuData = async (spu: SpuData) => {
  spuParams.value = spu
  //获取全部品牌的数据
  let result: AllTradeMark = await reqAllTradeMark()
  //获取某一个品牌旗下全部售卖商品的图片
  let result1: SpuHasImg = await reqSpuImageList(spu.id as number)
  //获取已有的SPU销售属性的数据
  let result2: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id as number)
  //获取整个项目全部SPU的销售属性
  let result3: HasSaleAttrResponseData = await reqAllSaleAttr()
  allTradeMark.value = result.data
  imgList.value = result1.data.map((item) => {
    return {
      name: item.imageName,
      url: 'http://localhost:9000' + item.imageUrl,
    }
  })
  saleAttr.value = result2.data
  allSaleAttr.value = result3.data
}
const initAddSpu = async (spu: SpuData) => {
  let result: AllTradeMark = await reqAllTradeMark()
  let result1: HasSaleAttrResponseData = await reqAllSaleAttr()
  allSaleAttr.value = result1.data
}
//照片墙点击预览按钮的时候触发的钩子
const handlePictureCardPreview = (file: any) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}
const handlerUpload = (file: any) => {
  if (
    file.type == 'image/png' ||
    file.type == 'image/jpeg' ||
    file.type == 'image/gif'
  ) {
    if (file.size / 1024 / 1024 < 3) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件务必小于3M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件务必PNG|JPG|GIF',
    })
    return false
  }
}

//对外暴露
defineExpose({ initAddSpu, initHasSpuData })
</script>
<style lang=""></style>
