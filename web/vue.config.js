/*
 * @Author: qbenben 
 * @Date: 2019-07-14 00:43:09 
 * @Last Modified by: qbenben
 * @Last Modified time: 2019-08-13 01:41:54
 * 打包后生成的静态文件目标路径文件夹和路径
 */
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  //outputDir: __dirname + '/../server/web',
  outputDir: __dirname + '/public/web',
  //publicPath: process.env.NODE_ENV === 'production' ? '/' : '/'

  configureWebpack: config => {
    if (isProduction) {
      //Gzip 压缩
      config.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }));
      //CDN加速
      config.externals = {
        "vue": "Vue",
        "vue-router": "VueRouter",
        "axios": "axios",
        "element-ui": "ELEMENT"
      }
    }
  },
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },
}