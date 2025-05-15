/**
 * 获取已有品牌 get /product/baseTrademark/1（分页）/3（数量大小）
 */
import request from '@/utils/request'
import type { TradeMarkResponseData, TradeMark } from './type'
enum API {
  TRADEMARK_URL = '/product/baseTrademark',
  // 添加品牌
  ADDTRADEMARK_URL = '/product/baseTrademark/add',
  // 修改品牌
  UPDATETRADEMARK_URL = '/product/baseTrademark/update',
  // 删除品牌
  DELETE_URL = '/product/baseTrademark/remove/',
}
/**
 * 获取已有品牌接口
 */
export const reqHasTrademark = (page: number, limit: number) => {
  return request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `/${page}/${limit}`,
  )
}
/**
 * 新增|修改品牌接口
 * 根据id传没传入判断，有id则表示修改，无id表示新增
 */
/**
 * Add or update a trademark based on the provided data
 * @param data - The trademark data object
 * @returns Promise - Returns a POST request promise
 * - If data.id exists, updates existing trademark
 * - If data.id is absent, adds new trademark
 */
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
  if (data.id) {
    // 修改品牌
    return request.post<any, any>(API.UPDATETRADEMARK_URL, data)
  } else {
    // 增加品牌
    return request.post<any, any>(API.ADDTRADEMARK_URL, data)
  }
}
/**
 * 删除品牌
 */
export const reqDeleteTrademark = (id: number) => {
  return request.delete<any, any>(API.DELETE_URL + id)
}
