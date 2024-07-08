// 对于axios进行二次封装
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// 引入detail仓库用于获取userTempId
import detail from '@/store/detail'
import LogAndReg from '@/store/LogAndReg'
//1. 利用axios对象的方法create，去创建一个axios实例
const requests = axios.create({
    // 配置对象
    // 基础路径，发请求的时候，路径中会出现api
    baseURL:"/api",
    // 请求超时的时间5s
    timeout:5000
})

// 请求拦截器
requests.interceptors.request.use((config)=>{
    // 为请求头添加userTempId字段,userTempId字段不能随意写
    if(detail.state.uuid_token){
        config.headers.userTempId = detail.state.uuid_token
    }
    // 为请求添加token
    if(LogAndReg.state.token){
        config.headers.token = LogAndReg.state.token
    }
    // 进度条开始
    nprogress.start()
    // config:配置对象，对象里面有一个属性很重要，headers请求头
    return config
})

// 响应拦截器
requests.interceptors.response.use((res)=>{
    // 进度条结束
    nprogress.done()
    // 成功的回调函数，服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
    return res.data
},(error)=>{
    // 失败的回调函数
    return Promise.reject(new Error('faile'))
})

export default requests;