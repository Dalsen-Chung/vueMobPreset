function renderFiles(api) {
  api.render({
    './src/plugins/vant.js': '../template/src/plugins/vant.js',
    './babel.config.js': '../template/babel.config.js'
  })
}

module.exports = {
  renderFiles
}
