<template>
  <el-card style="width: 100%">
    <el-button type="primary" icon="Plus" @click="addTrademark">
      添加品牌
    </el-button>
    <el-table style="margin: 10px 0px; width: 100%" border :data="trademarkArr">
      <el-table-column label="序号" width="80px" align="center" type="index" />
      <el-table-column label="品牌名称" prop="tmName" />
      <el-table-column label="品牌logo">
        <template #="{ row, $index }">
          <img alt="图片不存在" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #="{ row, $index }">
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updateTrademark(row)"
          ></el-button>
          <el-popconfirm
            title="确认删除?"
            width="250px"
            icon="Delete"
            @confirm="removeTrademark(row.id)"
          >
            <template #reference>
              <el-button type="primary" size="small" icon="Delete" />
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器组件
            pagination
                v-model:current-page:设置分页器当前页码
                v-model:page-size:设置每一个展示数据条数
                note：v-model:current-page、v-model:page-size 不能简写为 current-page、page-size
                page-sizes:用于设置下拉菜单数据
                background:设置分页器按钮的背景颜色
                layout:可以设置分页器六个子组件布局调整
                size:设置分页器按钮的尺寸
                disabled:设置分页器按钮是否禁用
                total:设置分页器展示数据总条数
    -->
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
    <el-dialog
      v-model="dialogFormVisible"
      :title="trademarkParams.id ? '修改品牌' : '新增品牌'"
    >
      <el-form
        ref="fromRef"
        :rules="rules"
        :model="trademarkParams"
        style="width: 80%"
      >
        <el-form-item label="品牌名称" prop="tmName" label-width="100px">
          <el-input
            placeholder="请输入品牌名称"
            v-model="trademarkParams.tmName"
          />
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl" label-width="100px">
          <!--
          action  图片上传的url
          on-success 上传图片成功的回调
          before-upload 上传前回调，常用于判断文件类型、大小
          show-file-list 显示上传文件列表
           -->
          <el-upload
            class="avatar-uploader"
            action="/api/product/baseTrademark/uploadPicture"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" size="default" @click="cancel">
          取消
        </el-button>
        <el-button type="primary" size="default" @click="confirm">
          确认
        </el-button>
      </template>
    </el-dialog>
  </el-card>
</template>
<script setup lang="ts">
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
} from '@/api/product/trademark/index'
import {
  Records,
  TradeMarkResponseData,
  TradeMark,
} from '@/api/product/trademark/type'
import { ref, onMounted, reactive, nextTick } from 'vue'
import { ElMessage, type UploadProps } from 'element-plus'
import { id } from 'element-plus/es/locales.mjs'
// 当前页码
let pageNo = ref<number>(1)
// 每页展示条数s
let limit = ref<number>(5)
// 存储已有品牌总数
let total = ref<number>(0)
//存储已有品牌数据
let trademarkArr = ref<Records>([])
// 对话框是否显示
let dialogFormVisible = ref<boolean>(false)
// TODO reactive?
let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})
let fromRef = ref()
// 封装获取品牌
const getHasTrademark = async (page = 1) => {
  pageNo.value = page
  let result: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  )
  if (result.code == 200) {
    total.value = result.data.total
    trademarkArr.value = result.data.records
  }
}
onMounted(() => {
  getHasTrademark()
})
const currentChange = (obj: any) => {
  // 传入的为 number
  console.log(obj)
  getHasTrademark(obj)
}
const sizeChange = (obj: any) => {
  // 传入的为 number
  console.log(obj)
  getHasTrademark()
}
// 上传图片成功后
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
) => {
  // 收集图片在服务器上的地址
  trademarkParams.logoUrl = 'http://localhost:9000' + response.data.logoUrl
  // 保证重复点击时，之前的验证信息清除
  fromRef.value.clearValidate('logoUrl')
}
// 上传图片前
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      // 小于4mb
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件需小于4MB',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件格式务必PNG|JPG|GIF',
    })
    return false
  }
}
const cancel = () => {
  dialogFormVisible.value = false
}
const confirm = async () => {
  // 检验表单
  // await 表示 此代码执行成功后 才会继续执行，否则不继续执行
  await fromRef.value.validate()
  // 提交
  let result: any = await reqAddOrUpdateTrademark(trademarkParams)
  if ((result.code = 200)) {
    dialogFormVisible.value = false
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功',
    })
    getHasTrademark(trademarkParams.id ? trademarkParams.id : 1)
  } else {
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败',
    })
    dialogFormVisible.value = false
  }
}
const addTrademark = () => {
  trademarkParams.id = 0
  trademarkParams.logoUrl = ''
  trademarkParams.tmName = ''
  dialogFormVisible.value = true
  fromRef.value?.clearValidate('tmName')
  fromRef.value?.clearValidate('logoUrl')
  // 另一种写法
  // nextTick(()=>{
  //   fromRef.value?.clearValidate('tmName');
  //   fromRef.value?.clearValidate('logoUrl');
  // })
}
const validateTmName = (rule: any, value: any, callback: any) => {
  if (value.trim().length <= 2) {
    callback(new Error('品牌名称位数大于等于两位'))
  } else {
    callback()
  }
}
const validateLogoUrl = (rule: any, value: any, callback: any) => {
  if (value) {
    callback()
  } else {
    callback(new Error('LOGO图片务必上传'))
  }
}
const rules = {
  tmName: [{ require: 'true', trigger: 'blur', validator: validateTmName }],
  logoUrl: [{ require: 'true', validator: validateLogoUrl }],
}

const updateTrademark = (row: TradeMark) => {
  // 清空检验信息
  fromRef.value?.clearValidate('tmName')
  fromRef.value?.clearValidate('logoUrl')
  // 对话框显示
  dialogFormVisible.value = true
  // ES6 合并对象
  Object.assign(trademarkParams, row)
}
const removeTrademark = async (id: number) => {
  console.log(id)
  let result = await reqDeleteTrademark(id)
  if (result.code == 200) {
    //删除成功提示信息
    ElMessage({
      type: 'success',
      message: '删除品牌成功',
    })
    //再次获取已有的品牌数据
    getHasTrademark(
      trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1,
    )
  } else {
    ElMessage({
      type: 'error',
      message: '删除品牌失败',
    })
  }
}
</script>
<style lang="scss">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
