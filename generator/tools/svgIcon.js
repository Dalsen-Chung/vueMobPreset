function renderFiles(api) {
  api.render({
    './src/icon/index.js': '../template/src/icon/index.js',
    './src/icon/svg': '../template/src/icon/svg',
    './src/components/SvgIcon/index.vue': '../template/src/components/SvgIcon/index.vue'
  })
}

module.exports = {
  renderFiles
}
