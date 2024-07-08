import {reqGetUserAddress,reqGetOrderInfo} from "@/api"
const state = {
    tradeData:[],
    orderInfo:{}
}
const mutations = {
    GETTRADEDATAS(state,tradeData){
        state.tradeData = tradeData
    },
    GETORDERINFO(state,orderInfo){
        state.orderInfo = orderInfo
    }
}
const actions = {
    // 获取交易地址数据
    async getTradeData({ commit }) {  
        const result = await reqGetUserAddress()
        if (result.code == 200) {
            commit("GETTRADEDATAS", result.data)
        }
    },
    // 获取交易订单数据
    async getOrderInfo({commit}){
        const result = await reqGetOrderInfo()
        if (result.code == 200) {
            commit("GETORDERINFO", result.data)
        }
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}