import { ResponseData } from '@/api/type'

/**
 *  查看品牌结果
 * {
    "data": {
        "records": [
            {
                "id": 14,
                "tmName": "Xiaomi SU 7",
                "logoUrl": "http://139.198.127.41:9000/sph/20240331/img_pic_831703750738.jpg",
                "createTime": "2025-04-19 18:30:57",
                "updateTime": null
            },
        ],
        "pages": 5,
        "total": 14
    },
    "code": 200,
    "message": "成功",
    "success": true
}
 */
export interface TradeMark {
  id?: number
  tmName: string
  logoUrl: string
}
export type Records = TradeMark[]
export interface TradeMarkResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    pages: number
  }
}

/**
 * 新增品牌接口
 * /product/baseTrademark/add
 * request 内容
 * "tmName": "123",
	"logoUrl": "/product/baseTrademark/getTrademarkImage/142316318266363904/142316318266363905/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20250307201132.jpg",
	"id": 142316318266363900

  响应

  {"data":{},"code":200,"message":"新增成功","success":true}
 */

/**
   * 修改品牌接口
   * post /product/baseTrademark/update
   * 新增品牌基础上增加了id
   * {
      "tmName": "1234",
      "logoUrl": "/product/baseTrademark/getTrademarkImage/142316318266363904/142316318266363905/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20250307201132.jpg",
      "id": 142316318266363900
    }

    响应

    {"data":{},"code":200,"message":"更新成功","success":true}
   */

/**
 * 删除品牌
 * delet /product/baseTrademark/remove/142316318266363900
 *
 * 响应
 * {"data":{},"code":200,"message":"删除成功","success":true}
 */
