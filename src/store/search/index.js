// search模块的小仓库
import {reqGetSearchInfo} from '@/api'

// state: 仓库存储数据的地方
const state = {
    ReqGetSearchList:{},

}
// mutations: 修改state的唯一手段
const mutations = {
    REQGETSEARCHLIST(state,ReqGetSearchList){
        state.ReqGetSearchList = ReqGetSearchList
    }
}
// actions: 处理action，可以书写自己的业务逻辑，也可以处理异步
// ReqGetSearchList函数在服务器获取数据时至少传递一个参数params对象,默认空对象,因此在组件中调用时可以不传递参数
const actions = {
    async ReqGetSearchList({commit},params={}){
        let result = await reqGetSearchInfo(params)
        if(result.code === 200){
            commit('REQGETSEARCHLIST',result.data)
        }
    },
}
// getters: 理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
    attrsList(state){
        return state.ReqGetSearchList.attrsList || []
    },
    goodsList(state){
        return state.ReqGetSearchList.goodsList || []
    },
    trademarkList(state){
        return state.ReqGetSearchList.trademarkList || []
    },
    total(state){
        return state.ReqGetSearchList.total || 0
    }
}

// 对外暴露
export default{
    state,
    mutations,
    actions,
    getters
}