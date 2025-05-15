import request from '@/utils/request'
import type { CategoryResponseData, AttrResponseData, Attr } from './type'
enum API {
  // GET /product/getCategory1 获取1级菜单
  C1_URL = '/product/getCategory1',
  // GET /product/getCategory2/2（1级别菜单id）  获取2级菜单
  C2_URL = '/product/getCategory2/',
  // GET /product/getCategory3/13（2级别菜单id）  获取3级菜单
  C3_URL = '/product/getCategory3/',
  // GET /product/attrInfoList/1(1级菜单id)/2(2级菜单id)/3(3级菜单id) 获取属性列表
  ATTR_URL = '/product/attrInfoList/',
  // POST /product/saveAttrInfo 新增属性 | 修改属性，后端服务 根据id 区别
  // 新增属性 {"categoryId":1,"attrName":"123","categoryLevel":3,"attrValueList":[{"valueName":"123","editFlag":false},{"valueName":"34","editFlag":false}]}
  // 修改属性 {"categoryId":1,"attrName":"345","categoryLevel":3,"attrValueList":[{"id":144859577958141950,"attrId":144859577958141950,"valueName":"344","createTime":"2025-05-07T04:52:33.619+00:00","updateTime":"2025-05-07T04:52:33.619+00:00","editFlag":false}],"id":144859577958141950,"createTime":"2025-05-07T04:52:33.618+00:00","updateTime":"2025-05-07T04:52:33.618+00:00"}
  ADDORUPDATEATTR_URL = '/product/saveAttrInfo',
  // DELETE /product/deleteAttr/142383850079784960 删除属性
  DELETEATTR_URL = '/product/deleteAttr/',
}
export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)
export const reqC2 = (category1Id: number | string) =>
  request.get<any, CategoryResponseData>(API.C2_URL + category1Id)
export const reqC3 = (category2Id: number | string) =>
  request.get<any, CategoryResponseData>(API.C2_URL + category2Id)
export const reqAttr = (
  category1Id: number | string,
  category2Id: number | string,
  category3Id: number | string,
) =>
  request.get<any, AttrResponseData>(
    `${API.ATTR_URL}/${category1Id}/${category2Id}/${category3Id}`,
  )
export const reqAddOrUpdateAtt = (attr: Attr) => {
  request.post(API.ADDORUPDATEATTR_URL, attr)
}
export const reqRemoveAttr = (attrId: number) => {
  request.delete(API.DELETEATTR_URL + attrId)
}
