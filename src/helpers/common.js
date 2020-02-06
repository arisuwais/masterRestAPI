/* eslint-disable prettier/prettier */
const path = require('path');
const fs = require('fs');

exports.loadFile = (dirname, basename) => {
  const load = {};

  fs.readdirSync(dirname)
    .filter(
      file => file.indexOf('.') !== 0
        && file !== basename
        && file.slice(-3) === '.js',
    )
    .forEach((file) => {
      const pathFile = path.join(dirname, file);
      const filename = path.basename(file, '.js');

      // eslint-disable-next-line global-require
      load[filename] = require(pathFile);
    });
  return load;
};

module.exports = exports;
