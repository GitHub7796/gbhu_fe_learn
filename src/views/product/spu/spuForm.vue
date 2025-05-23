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
      <el-select
        v-model="saleAttrIdAndValueName"
        :placeholder="
          unSelectSaleAttr.length
            ? `还未选择${unSelectSaleAttr.length}个`
            : '无'
        "
      >
        <el-option
          v-for="item in unSelectSaleAttr"
          :key="item.id"
          :label="item.name"
          :value="`${item.id}:${item.name}`"
        ></el-option>
      </el-select>
      <el-button
        type="primary"
        icon="Plus"
        style="margin: 0px 10px"
        @click="addSaleAttr"
      >
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
        <el-table-column prop="spuSaleAttrValueList" label="销售属性值">
          <template #="{ row, $index }">
            <el-tag
              style="margin: 0px 5px"
              @close="row.spuSaleAttrValueList.splice(index, 1)"
              v-for="(item, index) in row.spuSaleAttrValueList"
              :key="row.id"
              class="mx-1"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-input
              @blur="toLook(row)"
              v-model="row.SaleAttrValue"
              placeholder="请输入你的属性值"
              size="small"
              v-if="row.flag == true"
              style="width: 100px"
            ></el-input>
            <el-button
              @click="toEdit(row)"
              v-else
              type="primary"
              icon="Plus"
              size="small"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #="{ row, $index }">
            <el-button
              type="primary"
              icon="Delete"
              size="small"
              @click="saleAttr.splice($index, 1)"
            ></el-button>
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
import { computed, ref } from 'vue'
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
  imgUpResponseData,
} from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'
import { it } from 'element-plus/es/locale'
let $emit = defineEmits(['changeScene'])
let allSaleAttr = ref<HasSaleAttr[]>([]) // 所有销售属性
let allTradeMark = ref<Trademark[]>([]) //已有SPU数据
let imgList = ref<SpuImg[]>([]) //商品图片
let saleAttr = ref<SaleAttr[]>([])
let dialogImageUrl = ref<string>('') //预览图片地址
let dialogVisible = ref<boolean>(false) //对话框显示隐藏
let saleAttrIdAndValueName = ref<string>('') //将来收集还未选择的销售属性的ID与属性值的名字
let spuParams = ref<SpuData>({
  category3Id: '', //收集三级分类的ID
  spuName: '', //SPU的名字
  description: '', //SPU的描述
  tmId: '', //品牌的ID
  spuImageList: [],
  spuSaleAttrList: [],
})
// 计算出当前SPU还未拥有的销售属性
let unSelectSaleAttr = computed(() => {
  let unSelectArr = allSaleAttr.value.filter((item) => {
    return saleAttr.value.every((item1) => {
      return item.name != item1.saleAttrName
    })
  })
  return unSelectArr
})
const cancel = () => {
  $emit('changeScene')
}
const save = async () => {
  // 收集数据
  console.log(imgList)
  spuParams.value.spuImageList = imgList.value.map((item: any) => {
    return {
      imageName: item.name,
      imageUrl: item.url,
    }
  })
  spuParams.value.spuSaleAttrList = saleAttr.value
  let result = await reqAddOrUpdateSpu(spuParams.value)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: spuParams.value.id ? '更新成功' : '添加成功',
    })
    //通知父组件切换场景为0
    $emit('changeScene')
  } else {
    ElMessage({
      type: 'success',
      message: spuParams.value.id ? '更新成功' : '添加成功',
    })
  }
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
const initAddSpu = async (c3Id: string | number) => {
  Object.assign(spuParams.value, {
    category3Id: '', //收集三级分类的ID
    spuName: '', //SPU的名字
    description: '', //SPU的描述
    tmId: '', //品牌的ID
    spuImageList: [],
    spuSaleAttrList: [],
  })
  imgList.value = []
  saleAttr.value = []
  saleAttrIdAndValueName.value = ''
  spuParams.value.category3Id = c3Id
  let result: AllTradeMark = await reqAllTradeMark()
  let result1: HasSaleAttrResponseData = await reqAllSaleAttr()
  allTradeMark.value = result.data
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
const toLook = (row: SaleAttr) => {
  //整理收集的属性的ID与属性值的名字
  // TODO ：
  const { baseSaleAttrId, SaleAttrValue } = row
  //整理成服务器需要的属性值形式
  // TODO ：
  let newSaleAttrValue: SaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: SaleAttrValue as string,
  }
  row.spuSaleAttrValueList.push(newSaleAttrValue)
  console.log(row)

  row.flag = false
}
const toEdit = (row: SaleAttr) => {
  row.flag = true
}
const addSaleAttr = () => {
  const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':')
  let newSaleAttr: SaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  }
  saleAttr.value.push(newSaleAttr)
  saleAttrIdAndValueName.value = ''
}

//对外暴露
defineExpose({ initAddSpu, initHasSpuData })
</script>
<style lang=""></style>
