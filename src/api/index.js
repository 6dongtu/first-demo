// 当前这个模板：APi进行统一管理
import requests from './request'
import mockrequest from './mockRequest'
// 三级联动接口
// /api/product/getBaseCategoryList

// 对外暴露请求函数
// export const reqCategoryList = () => {
//     return requests({ url: '/product/getBaseCategoryList', method: 'get' })
// }
// 简写
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })

// 获取Banner（Home首页轮播图接口）
export const reqGetBannerList = () => mockrequest.get('/banner')

// 获取Floor数据
export const reqGetFloorList = () => mockrequest.get('/floor')

// 获取Search模块的数据
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params })

// 获取产品详情信息的接口
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${ skuId }`, method: 'get' })

// 添加到购物车（或者修改某一个产品的个数）
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${ skuId }/${ skuNum }`, method: 'post' })

// 获取购物车列表数据接口
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' })

// 删除购物车商品数据
export const reDeleteCartId = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})

// 切换商品状态
export const reqUpdateChecked = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

// 获取验证码
export const reqGetCode = (phone) =>requests({url:`/user/passport/sendCode/${phone}`,method:'get',})

// 注册
export const reqUserRegister = (data)=>requests({url:'/user/passport/register',data,method:'post'})

// 登录
export const reqUserLogin = (data)=>requests({url:'/user/passport/login',data,method:'post'})

// 获取用户信息
export const reqGetUserInfo = ()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'})

// 退出登录
export const reqLogout = ()=>requests({url:'/user/passport/logout',method:'get'})

// 获取用户地址信息
export const reqGetUserAddress = ()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

// 获取交易订单数据
export const reqGetOrderInfo = ()=>requests({url:'/order/auth/trade',method:'get'})

// 提交订单,支付请求
export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

// 获取支付信息
export const reqGetPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

// 查询支付订单状态
export const reqGetPayStatus = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

// 获取个人中心的数据
export const reqMyOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})