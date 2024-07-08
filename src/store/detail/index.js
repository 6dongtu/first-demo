import {reqGoodsInfo,reqAddOrUpdateShopCart} from '@/api'
import {getUUID} from '@/utils/uuid_token'
const state = {
    goodsInfo:{},
    // 游客临时身份
    uuid_token:getUUID()
}
const mutations = {
    GETGOODSINFO(state,goodsInfo){
        state.goodsInfo = goodsInfo
    }
}
const actions = {
    // 获取产品信息
    async getGoodsInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId)
        if(result.code === 200){
            commit('GETGOODSINFO',result.data)
        }
    },
    // 加入购物车,修改产品信息
    // 因为服务器没有返回数据,所以不需要mutations,state,actions三连环操作
    // async函数一定会返回一个promise对象
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)
        if(result.code === 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
}
const getters = {
    categoryView(state){
        return state.goodsInfo.categoryView || {}
    },
    skuInfo(state){
        return state.goodsInfo.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.goodsInfo.spuSaleAttrList || []
    }

}
export default {
    state,
    mutations,
    actions,
    getters
}