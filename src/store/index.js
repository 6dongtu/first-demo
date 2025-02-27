import Vue from 'vue'
import Vuex from 'vuex'
// 使用插件Vuex需要先调用一次
Vue.use(Vuex)

// 引入小仓库
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import LogAndReg from './LogAndReg'
import trade from './trade'
// 对外暴露一个store实例
export default new Vuex.Store({
    // 实现vuex仓库模块式开发存储数据
    modules: {
        home,
        search,
        detail,
        shopcart,
        LogAndReg,
        trade
    }
})
