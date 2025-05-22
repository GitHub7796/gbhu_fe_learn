import { ResponseData } from '@/api/type'
/**
 * 获取 SPU 内容
 *{
    "data": {
        "current": 1,
        "pages": 4,
        "total": 10,
        "size": 3,
        "records": [
            {
                "id": 148494088424001538,
                "category3Id": 1,
                "tmId": 1,
                "description": "description10",
                "spuName": "spu10",
                "createTime": "2025-05-17T05:34:48.438+00:00",
                "updateTime": null,
                "spuImageList": null,
                "spuPosterList": null,
                "spuSaleAttrList": null
            }
        ]
    },
    "code": 200,
    "message": "成功",
    "success": true
}
 *
 */
export interface SpuData {
  id?: number
  category3Id: number | string
  tmId: number | string
  description: string
  spuName: string
  createTime?: string | null
  updateTime?: string | null
  spuImageList: SpuImg[] | null
  spuSaleAttrList: SaleAttr[] | null
}
export type Reocrds = SpuData[]
export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Reocrds
    current: number
    pages: number
    total: number
    size: number
  }
}
/**
 * 获取全部品牌的数据
 * {
    "data": [
        {
            "id": 14,
            "tmName": "Xiaomi SU 7",
            "logoUrl": "http://139.198.127.41:9000/sph/20240331/img_pic_831703750738.jpg",
            "createTime": "2025-05-17T05:34:47.794+00:00",
            "updateTime": null
        }
    ],
    "code": 200,
    "message": "成功",
    "success": true
}
 */
export interface Trademark {
  id: number
  tmName: string
  logoUrl: string
  createTime: string | null
  updateTime: string | null
}
export interface AllTradeMark extends ResponseData {
  data: Trademark[]
}
/**
 * 获取某个SPU下的全部的售卖商品的图片数据
 * {
    "data": [
        {
            "id": 148499444382437380,
            "spuId": 148494088424001540,
            "imageName": "329a7c4b-c33c-4943-9f7c-4c587cb418cc.png",
            "imageUrl": "/image/getImage/148499418209980416/329a7c4b-c33c-4943-9f7c-4c587cb418cc.png",
            "createTime": "2025-05-17T05:56:18.833+00:00",
            "updateTime": null
        }
    ],
    "code": 200,
    "message": "成功",
    "success": true
}
 */
export interface SpuImg {
  id?: number
  spuId?: number
  imageName?: string
  imageUrl?: string
  createTime?: string | null
  updateTime?: string | null
  name?: string
  url?: string
}
export interface SpuHasImg extends ResponseData {
  data: SpuImg[]
}
/**
 * 获取某一个SPU下全部的已有的销售属性接口地址
 * {
    "data": [
        {
            "id": 148499444382437380,
            "spuId": 148494088424001540,
            "baseSaleAttrId": 1,
            "saleAttrName": "颜色",
            "createTime": null,
            "updateTime": null,
            "spuSaleAttrValueList": [
                {
                    "id": 148499444382437380,
                    "spuId": 148494088424001540,
                    "spuSaleNameId": 148499444382437380,
                    "baseSaleAttrId": 1,
                    "saleAttrName": "颜色",
                    "saleAttrValueName": "123",
                    "isChecked": null,
                    "createTime": "2025-05-17T05:56:18.835+00:00",
                    "updateTime": null
                }
            ]
        }
    ],
    "code": 200,
    "message": "成功",
    "success": true
}
 */
export interface SaleAttrValue {
  id: number
  spuId: number
  spuSaleNameId: number
  baseSaleAttrId: number
  saleAttrName: string
  saleAttrValueName: string
  isChecked: null | boolean
  createTime: string | null
  updateTime: string | null
}
export type SpuSaleAttrValueList = SaleAttrValue[]
export interface SaleAttr {
  id: number
  spuId: number
  baseSaleAttrId: number
  saleAttrName: string | number
  createTime: string | null
  updateTime: string | null
  spuSaleAttrValueList: SpuSaleAttrValueList
  flag?: boolean
}
export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[]
}
/**
 * 获取整个项目全部的销售属性[颜色、版本、尺码]
 * {
    "data": [
        {
            "id": 1,
            "name": "颜色",
            "createTime": "2025-05-17T05:34:47.806+00:00",
            "updateTime": null
        },
  
    ],
    "code": 200,
    "message": "成功",
    "success": true
}
 */
export interface HasSaleAttr {
  id: number
  name: string
  createTime: string | null
  updateTime: string | null
}
export interface HasSaleAttrResponseData extends Response {
  data: HasSaleAttr[]
}
/**
 *  SPU接口 POST对象
 * {
	"id": 148494088424001540,
	"category3Id": 1,
	"tmId": 1,
	"spuName": "spu9",
	"description": "description9",
	"spuImageList": [
		{
			"id": 148499444382437380,
			"spuId": 148494088424001540,
			"imageName": "329a7c4b-c33c-4943-9f7c-4c587cb418cc.png",
			"imageUrl": "/image/getImage/148499418209980416/329a7c4b-c33c-4943-9f7c-4c587cb418cc.png",
			"createTime": "2025-05-17T05:56:18.833+00:00",
			"updateTime": null
		},
		{
			"imageName": "7a9426ff-3597-4c2f-9fb8-7de3516f1a01.png",
			"imageUrl": "/image/getImage/148500844764073984/7a9426ff-3597-4c2f-9fb8-7de3516f1a01.png"
		}
	],
	"spuSaleAttrList": [
		{
			"id": 148499444382437380,
			"spuId": 148494088424001540,
			"baseSaleAttrId": 1,
			"saleAttrName": "颜色",
			"createTime": null,
			"updateTime": null,
			"spuSaleAttrValueList": [
				{
					"id": 148499444382437380,
					"spuId": 148494088424001540,
					"spuSaleNameId": 148499444382437380,
					"baseSaleAttrId": 1,
					"saleAttrName": "颜色",
					"saleAttrValueName": "123",
					"isChecked": null,
					"createTime": "2025-05-17T05:56:18.835+00:00",
					"updateTime": null
				}
			]
		},
		{
			"id": 148499500720328700,
			"spuId": 148494088424001540,
			"baseSaleAttrId": 3,
			"saleAttrName": "尺码",
			"createTime": null,
			"updateTime": null,
			"spuSaleAttrValueList": [
				{
					"id": 148499500720328700,
					"spuId": 148494088424001540,
					"spuSaleNameId": 148499500720328700,
					"baseSaleAttrId": 3,
					"saleAttrName": "尺码",
					"saleAttrValueName": "123",
					"isChecked": null,
					"createTime": "2025-05-17T05:56:18.835+00:00",
					"updateTime": null
				}
			]
		}
	],
	"createTime": "2025-05-17T05:34:48.438+00:00",
	"updateTime": null,
	"spuPosterList": null
}
 */
