const path = require('path');
const { ConcatSource } = require('webpack-sources');

// Tiny tiny helper plugin that prepends "module.exports = " to all `.map` assets
module.exports =  class ScreepsWebpackSources {
  apply(compiler) {
    compiler.plugin('emit', (compilation, cb) => {
      for (const filename in compilation.assets) {
        // matches any files ending in ".map" or ".map.js"
        if (path.basename(filename, '.js').match(/\.map/)) {
          compilation.assets[filename] = new ConcatSource(
            'module.exports = ',
            compilation.assets[filename]
          );
        }
      }
      cb();
    });
  }
}
