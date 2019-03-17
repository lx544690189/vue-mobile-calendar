function getPublicPath() {
  if (process.env.NODE_ENV === 'production') {
    return 'https://lx544690189.github.io/vue-mobile-calendar/';
  } else {
    return '/';
  }
}

module.exports = {
  lintOnSave: true,
  css: {
    extract: false,
  },
  publicPath: getPublicPath(),
};
