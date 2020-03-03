function renderFiles(api) {
  api.render('../template/src/icon/svg');
  api.render({
    './src/icon/index.js': '../template/src/icon/index.js',
    './src/components/SvgIcon/index.vue': '../template/src/components/SvgIcon/index.vue'
  })
}

module.exports = {
  renderFiles
}
