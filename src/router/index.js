// 配置路由的地方
// 导入相关的插件
import Vue from 'vue'
import VueRouter from 'vue-router'
import routers from './routers'
// 导入store仓库
import store from '@/store'
// 使用插件
Vue.use(VueRouter)

// 重写push和replace
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}

// 配置路由
let router =  new VueRouter({
    routes:routers,
    scrollBehavior (to, from, savedPosition) {
        return { y: 0 }
      }
})

// 导航守卫
// 全局前置守卫(在路由跳转之前判断)
// to:将要访问的路径
// from:代表从哪个路径跳转而来
// next:是一个函数，表示放行
router.beforeEach(async (to,from,next)=>{
    let token = store.state.LogAndReg.token
    let userInfo = store.state.LogAndReg.userInfo
    // 用户已经登录成功了
    if(token){
        // 不允许跳转登录界面
        if(to.path == '/login'){
            next('/home')
        }
        else{
            // 跳转其他界面重新判断store仓库中的userInfo中是否包含name
            if(userInfo.name){
                next()
            }else{
                // 不包含userInfo中的name,重新派发action请求,成功则允许通过,失败则跳转到登录界面
                try {
                    await store.dispatch("GetUserInfo");
                    next()
                } catch (error) {  // token失效了,需退出登录,清除token,获取不到用户信息
                    await store.dispatch("UserLogout");
                    next('/login')
                }
            }
        }
    }else{
        // 未登录状态下,进入trade,pay,center时跳转到登录界面,并在路由中添加query参数,query参数用于判断点击登录是否
        // 跳转到当前页面还是首页
        let path = to.path
        if(path.indexOf('/trade')!=-1 || path.indexOf('/pay')!=-1 || path.indexOf('/center')!=-1){
            console.log(path);
            next('/login?redirect='+path)
        }
        else{
            next()
        }
    }
    
})



export default router
