function renderFiles(api) {
  api.render({
    './src/store/index.js': '../template/src/store/index.js',
    './src/store/getter.js': '../template/src/store/getter.js',
    './src/store/modules/base.js': '../template/src/store/modules/base.js'
  })
}

module.exports = {
  renderFiles
}
