// 定义小仓库 state类型
import type { RouteRecordRaw } from 'vue-router'
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  avatar: string
  username: string
}

import { CategoryObj} from "@/api/product/attr/type";
export interface CategoryState {
  c1Arr:CategoryObj[],
  c1Id:string|number,
  c2Arr:CategoryObj[],
  c2Id:string|number,
  c3Arr:CategoryObj[],
  c3Id:string|number
}