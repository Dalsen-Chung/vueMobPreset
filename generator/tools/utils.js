function renderFiles(api) {
  api.render({
    './src/utils/dgtBridge.js': '../template/src/utils/dgtBridge.js',
    './src/utils/paramEndorse.js': '../template/src/utils/paramEndorse.js',
    './src/utils/uuidGenerator.js': '../template/src/utils/uuidGenerator.js',
    './src/utils/verifyPlate.js': '../template/src/utils/verifyPlate.js',
    './src/utils/idCardValidate.js': '../template/src/utils/idCardValidate.js'
  })
}

module.exports = {
  renderFiles
}
