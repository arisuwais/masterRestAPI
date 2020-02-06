const fs = require('fs')
const path = require('path')
const currentWorkDir = process.cwd()

const models = {}

fs.readdirSync(currentWorkDir + '/src/helpers/').forEach(file => {
  const extname = path.extname(file)
  const basename = path.basename(file, extname)
  if (~file.indexOf('.js') && basename !== 'index') {
    models[basename] = require(currentWorkDir + '/src/helpers/' + basename)
  }
})

module.exports = models
