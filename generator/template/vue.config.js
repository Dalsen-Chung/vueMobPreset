'use strict'
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  //  部署应用包时的基本 URL
  publicPath: './',
  //  webpack配置
  productionSourceMap: false,
  configureWebpack: {
  },
  // devServer: {
  //   proxy: {
  //     [process.env.VUE_APP_HOST]: {
  //       target: '',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         ['^' + process.env.VUE_APP_HOST]: ''
  //       }
  //     }
  //   }
  // },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icon'))
      .end()
    config.module
      .rule('icon')
      .test(/\.svg$/)
      .include.add(resolve('src/icon'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}