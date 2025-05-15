import { ResponseData } from '@/api/type'

/**
 *  1级分类
{
    "data": [
        {
            "id": 1,
            "name": "图书/音像/电子书刊",
            "createTime": "2021-12-09T17:31:41.000+00:00",
            "updateTime": "2022-05-07T03:42:44.000+00:00",
            "category1Id": 1,  2级别分类才有
            "category2Id": 1,  3级别分类才有
        }
 
    ],
    "code": 200,
    "message": "成功",
    "success": true
}

 */
export interface CategoryObj {
  // 因为初始化为空，而不是0，所以需要联合类型
  id: number | string
  name: string
  createTime: string
  updateTime: string
  category1Id?: number | string
  category2Id?: number | string
}
export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[]
}

/** 
 *  获取3级分类下属性信息
 {
    "data": [
        {
            "id": 142383850536964096,
            "categoryId": 1,
            "categoryLevel": null,
            "attrName": "name2",
            "createTime": "2025-04-30T08:54:54.204+00:00",
            "updateTime": "2025-04-30T08:54:54.204+00:00",
            "attrValueList": [
                {
                    "id": 142383850536964097,
                    "attrId": 142383850536964096,
                    "valueName": "value1",
                    "createTime": "2025-04-30T08:54:54.206+00:00",
                    "updateTime": "2025-04-30T08:54:54.206+00:00"
                }
            ]
        },
    ],
    "code": 200,
    "message": "成功",
    "success": true
}
 */
export interface AttrValue {
  id: number
  attrId: number
  valueName: number
  createTime: string
  updateTime: string
}
export interface Attr {
  id: number
  categoryId: number
  categoryLevel: number
  attrName: string
  createTime: string
  updateTime: string
  attrValueList: AttrValue[]
}

//存储每一个属性对象的数组ts类型
export type AttrList = Attr[]

export interface AttrResponseData extends ResponseData {
  data: Attr[]
}
