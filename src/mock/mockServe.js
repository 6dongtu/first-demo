import Mock from 'mockjs'

// 把json数据进入
// webpack默认对外暴露图片, 文件, json数据
import banner from './banner.json'
import floor from './floor.json'

// mock数据:第一个参数code:请求地址, 第二个参数data:请求数据
Mock.mock('/mock/banner', {code: 200, data: banner})
Mock.mock('/mock/floor', {code: 200, data: floor})