const fs = require('fs')
const path = require('path')
const currentWorkDir = process.cwd()

const parseName = require('../helpers/parse-basename')
const controllers = {}

fs.readdirSync(currentWorkDir + '/src/controllers/').forEach(file => {
  const extname = path.extname(file)
  const basename = path.basename(file, extname)
  if (~file.indexOf('.js') && basename !== 'index') {
    controllers[parseName(basename)] = require(currentWorkDir +
      '/src/controllers/' +
      basename)
  } else {
    if (basename !== 'index') {
      fs.readdirSync(currentWorkDir + '/src/controllers/' + basename).forEach(
        fl => {
          const ext = path.extname(fl)
          const base = path.basename(fl, ext)
          controllers[parseName(base)] = require(currentWorkDir +
            '/src/controllers/' +
            basename +
            '/' +
            base)
        }
      )
    }
  }
})

module.exports = {
  ...controllers
}
