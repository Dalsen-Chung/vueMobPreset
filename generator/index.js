module.exports = (api, options) => {
  const axios = require('./tools/axios')
  const main = require('./tools/main')
  const utils = require('./tools/utils')
  const env = require('./tools/env')

  // 安装基础公共库
  api.extendPackage({
    dependencies: {
      axios: '^0.19.0',
      moment: '^2.24.0',
      'normalize.css': '^8.0.1',
      'amfe-flexible': '^2.2.1',
      'postcss-pxtorem': '^4.0.1'
    },
    devDependencies: {
      'babel-plugin-import': '^1.12.2',
      'css-loader': '^3.2.0',
      'style-loader': '^1.0.0',
      'node-sass': '^4.12.0',
      'sass-loader': '^8.0.0',
    }
  })

  // 渲染基础公共文件
  axios.renderFiles(api)
  main.renderFiles(api)
  utils.renderFiles(api)
  env.renderFiles(api)
  //  渲染vue.config.js
  api.render({
    './vue.config.js': './template/vue.config.js'
  })

  // 安装 vuex
  if (options.vuex) {
    api.extendPackage({
      dependencies: {
        vuex: '^3.1.2'
      }
    })
    let vuex = require('./tools/vuex')
    vuex.renderFiles(api)
  }

  // 安装 Vant
  if (options.vant) {
    api.extendPackage({
      dependencies: {
        vant: '^2.5.3'
      }
    })
    let vant = require('./tools/vant')
    vant.renderFiles(api)
  }

  // 安装 crypto-js
  if (options.cryptoJs) {
    api.extendPackage({
      devDependencies: {
        'crypto-js': '^4.0.0',
      }
    })
  }

  // 预置 svgIcon 组件
  if (options.svgIcon) {
    api.extendPackage({
      devDependencies: {
        'svg-sprite-loader': '^4.2.1',
      }
    })
    let svgIcon = require('./tools/svgIcon')
    svgIcon.renderFiles(api)
  }
}
