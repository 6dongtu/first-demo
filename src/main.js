import Vue from 'vue'
import App from './App.vue'
// 引入全局样式---三级联动组件
import TypeNav from '@/components/TypeNav'
// 引入全局组件---轮播图组件
import Carousel from '@/components/Carousel'
// 引入全局组件---分页器
import Pagination from '@/components/Pagination'

// 引入element-ui
import { Button, Select,MessageBox } from 'element-ui';
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);


// 第一个参数是组件的名字，第二个参数是组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
// import { reqCategoryList } from '@/api'
// reqCategoryList()
// import {reqGetSearchInfo} from '@/api'
// reqGetSearchInfo({})
// 引入swiper样式
import 'swiper/css/swiper.min.css'
// 引入mockServe.js----mock数据
import '@/mock/mockServe'
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'


// 引入懒加载插件
import VueLazyload from 'vue-lazyload'
import lazyImg from '@/assets/700.gif'
Vue.use(VueLazyload,{
  loading: lazyImg,
})

// 引入表单校验插件
import '@/plugins/validate'
// 统一引入api文件夹中的全部请求函数
import * as API from '@/api'
Vue.config.productionTip = false
const a = 1
new Vue({
  render: h => h(App),

  // 全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  // 注册路由
  router,
  // 注册仓库
  store
}).$mount('#app')
