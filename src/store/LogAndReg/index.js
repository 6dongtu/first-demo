import {reqGetCode,reqUserRegister,reqUserLogin,reqGetUserInfo,reqLogout} from '@/api'
const state= {
    code:'',
    token:localStorage.getItem('TOKEN'),
    userInfo:{}
}
const mutations= {
    GETCODE(state,code){
        state.code=code
    },
    USERLOGIN(state,token){
        state.token=token
    },
    USERINFO(state,userInfo){
        state.userInfo=userInfo
    },
    USERLOGOUT(state){
        // 清除vuex中的用户信息
        state.token=''
        state.userInfo={}
        // 清除本地存储中的用户信息
        localStorage.removeItem('TOKEN')
    }
}
const actions= {
    // 获取验证码
    async GetCode({commit},phone){
       let result =  await reqGetCode(phone)
       if(result.code==200){
           commit('GETCODE',result.data)
       }else{
           //返回错误信息
           return Promise.reject(new Error('faile'))
       }
    },
    // 用户注册
    async UserRegister({commit},user){
        let result =  await reqUserRegister(user)
        if(result.code==200){
            return 'ok'
        }else{
            //返回错误信息
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户登录
    async UserLogin({commit},user){
        let result = await reqUserLogin(user)
        // 在本地存储token------持久化
        localStorage.setItem('TOKEN',result.data.token)
        if(result.code==200){
            commit('USERLOGIN',result.data.token)
            return 'ok'
        }else{
            //返回错误信息
            return Promise.reject(new Error('faile'))
        }
    },
    // 获取用户信息
    async GetUserInfo({commit}){
        let result = await reqGetUserInfo()
        if(result.code==200){
            commit('USERINFO',result.data)
            return 'ok'
        }else{
            //返回错误信息
            return Promise.reject(new Error('faile'))
        }
    },
    // 退出登录
    // 1.删除本地存储中的token
    // 2.删除vuex中的token
    async UserLogout({commit}){
        let result = await reqLogout()
        if(result.code==200){
            commit('USERLOGOUT')
            return 'ok'
        }
    }
}
const getters= {}

export default {
    state,
    mutations,
    actions,
    getters
}