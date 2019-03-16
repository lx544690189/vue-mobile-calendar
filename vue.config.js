
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('vue-mobile-calendar', resolve('./lib/index.js'));
  },
  css: {
    extract: false,
  },
};
