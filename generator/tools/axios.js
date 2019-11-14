function renderFiles (api) {
  api.render({
    './src/utils/http.js': '../template/src/utils/http.js'
  })
}

module.exports = {
  renderFiles
}
