import {reqCartList,reDeleteCartId,reqUpdateChecked} from "@/api"
const state = {
    cartList:[] //购物车数据
}
const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList
    },
    // UPDATE_CARTLIST(state,cartList){
    //     state.cartList = cartList
    // }
}
const actions = {
    // 获取商品数据
    async getCartList({commit}){
        let result = await reqCartList()
        if(result.code == 200){
            commit("GETCARTLIST",result.data)
        }
    },
    // 删除商品
    async deleteCartList({commit},skuId){
        let result = await reDeleteCartId(skuId)
        if(result.code == 200){
            return "ok"
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 修改商品的选中状态
    async updateChecked({commit},{skuId,isChecked}){
        let result = await reqUpdateChecked(skuId,isChecked)
        if(result.code == 200){
            return "ok"
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 删除全部选中的商品
    async deleteAllChecked({state,dispatch}){
        // context:小仓库，commit【提交mutations】  getters【计算属性】  dispatch【派发action】  state【当前仓库中的数据】
        let PromiseAll = []
        state.cartList[0].cartInfoList.forEach(item=>{
            if(item.isChecked == 1){
                let promise = dispatch('deleteCartList',item.skuId)
                PromiseAll.push(promise)
            }
        })
        return Promise.all(PromiseAll)
    },
    // 修改全部商品的选中状态
    async updateAllChecked({state,dispatch},isChecked){
        let PromiseAll = []
        state.cartList[0].cartInfoList.forEach(item=>{
            let promise = dispatch('updateChecked',{skuId:item.skuId,isChecked})
            PromiseAll.push(promise)
            
        })
        return Promise.all(PromiseAll)
    }
}
const getters = {
    cartList(state){
        return state.cartList[0] || {}
    },
    cartInfoList(state){
        return state.cartList[0].cartInfoList ||  []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}