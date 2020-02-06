/* eslint-disable prettier/prettier */
const fs = require('fs');
const path = require('path');
const currentWorkDir = process.cwd();

module.exports = (app) => {
  fs.readdirSync(`${currentWorkDir}/src/routes/`).forEach((file) => {
    const extname = path.extname(file);
    const basename = path.basename(file, extname);
    // eslint-disable-next-line no-bitwise
    if (~file.indexOf('.js') && basename !== 'index') {
      app.use(
        `/api/gapensi/${basename}`,
        // eslint-disable-next-line global-require
        require(`${currentWorkDir}/src/routes/${file}`),
      );
    }
  });
};