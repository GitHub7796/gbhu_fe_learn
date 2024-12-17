// 定义小仓库 state类型
import type { RouteRecordRaw } from 'vue-router'
export interface UserState{
    token:string|null;
    menuRoutes:RouteRecordRaw[];
}
