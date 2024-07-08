const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  productionSourceMap: false,
  // 配置代理跨域(浏览器与服务器连接时，需要在中间加入代理服务器，解决跨域问题)
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
      }
    },
    client: {
      overlay: false
    }
  }
})
