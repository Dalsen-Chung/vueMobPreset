module.exports = (api, options) => {
  const axios = require('./tools/axios')
  const main = require('./tools/main')
  // 安装一些基础公共库
  api.extendPackage({
    dependencies: {
      vant: '^2.2.10',
      axios: '^0.19.0',
      moment: '^2.24.0',
      'normalize.css': '^8.0.1',
      'js-cookie': '^2.2.1',
      'amfe-flexible': '^2.2.1',
      'postcss-pxtorem': '^4.0.1'
    },
    devDependencies: {
      'babel-plugin-import': '^1.12.2',
      'css-loader': '^3.2.0',
      'style-loader': '^1.0.0'
    }
  })

  // 渲染axios相关文件
  axios.renderFiles(api)
  // 渲染main.js相关文件
  main.renderFiles(api)
}
