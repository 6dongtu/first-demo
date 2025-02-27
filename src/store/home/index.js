// home模块的小仓库

import { reqCategoryList } from '@/api'
import {reqGetBannerList} from '@/api'
import {reqGetFloorList} from '@/api'
// state: 仓库存储数据的地方
const state = {
    // home仓库存储三级列表的数据
    categoryList:[],
    // home仓库存储轮播图的数据
    bannerList:[],
    // home仓库存储floor数据
    floorList:[],
}
// mutations: 修改state的唯一手段
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    BANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    FLOORLIST(state,floorList){
        state.floorList = floorList
    }
}
// actions: 处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    // 通过API里面的接口函数调用,向服务器发请求,获取数据
     async categoryList({commit}){
        let result = await reqCategoryList()
        if(result.code === 200){
            commit('CATEGORYLIST',result.data)
        }
    },
    async getBannerList({commit}){
        let result = await reqGetBannerList()
        if(result.code === 200){
            commit('BANNERLIST',result.data)
        }
    },
    async getFloorList({commit}){
        let result = await reqGetFloorList()
        if(result.code === 200){
            commit('FLOORLIST',result.data)
        }
    }
}
// getters: 理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {}

// 对外暴露
export default {
    state,
    mutations,
    actions,
    getters
}