const path = require('path');

module.exports = {
  webpack: {
    configure(webpackConfig, { env, paths }) {
      webpackConfig.output = {
        ...webpackConfig.output,
        // path: path.resolve(__dirname, 'docs'), // 修改输出文件目录
        publicPath: '/react-app/'
      }
      return webpackConfig
    }
  }
}