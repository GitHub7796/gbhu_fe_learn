import request from '@/utils/request'
import type {
  SkuInfoData,
  SkuData,
  SpuData,
  HasSpuResponseData,
  AllTradeMark,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
} from './type'
enum API {
  //  GET /product/1(page)/3(limit)?category3Id=1 获取SPU内容
  HASSPU_URL = ' /product/',
  // GET /product/baseTrademark/getTrademarkList 获取全部品牌的数据
  ALLTRADEMARK_URL = '/product/baseTrademark/getTrademarkList/',
  // GET /product/spuImageList/14849408842400154 获取某个SPU下的全部的售卖商品的图片数据
  IMAGE_URL = '/product/spuImageList/',
  // GET /product/spuSaleAttrList/148494088424001540 获取某一个SPU下全部的已有的销售属性接口地址
  SPUHASSALEATTR_URL = '/product/spuSaleAttrList/',
  // GET /product/baseSaleAttrList 获取整个项目全部的销售属性[颜色、版本、尺码]
  ALLSALEATTR_URL = '/product/baseSaleAttrList',
  // POST /image/uploadImage 上传图片接口

  // POST /product/updateSpuInfo 修改SPU接口
  UPDATESPU_URL = '/product/updateSpuInfo',
  // POST /product/saveSpuInfo 新增SPU接口
  ADDSPU_URL = '/product/saveSpuInfo',
  // DELETE /product/deleteSpu/148502877067939840 删除SPU
  REMOVESPU_URL = '/product/deleteSpu/',
}
export const reqHasSpu = (
  page: number,
  limit: number,
  category3Id: number | string,
) =>
  request.get<any, HasSpuResponseData>(
    API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`,
  )

export const reqAllTradeMark = () =>
  request.get<any, AllTradeMark>(API.ALLTRADEMARK_URL)

export const reqSpuImageList = (spuId: number) =>
  request.get<any, SpuHasImg>(API.IMAGE_URL + spuId)

export const reqSpuHasSaleAttr = (spuId: number) =>
  request.get<any, SaleAttrResponseData>(API.SPUHASSALEATTR_URL + spuId)

export const reqAllSaleAttr = () =>
  request.get<any, HasSaleAttrResponseData>(API.SPUHASSALEATTR_URL)

export const reqAddOrUpdateSpu = (data: SpuData) => {
  if (data.id) {
    // 有id，更新spu
    return request.post(API.UPDATESPU_URL, data)
  } else {
    return request.post(API.ADDSPU_URL, data)
  }
}
export const reqRemoveSpu = (spuId: number | string) =>
  request.delete(API.REMOVESPU_URL + spuId)
