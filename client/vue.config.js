// vue.config.js
module.exports = {
  devServer: {
    disableHostCheck: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
};
