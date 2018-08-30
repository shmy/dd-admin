const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

// 拼接路径
function resolve (dir) {
  return path.join(__dirname, dir)
}

// 基础路径 注意发布之前要先修改这里
const baseUrl = '/static/web_admin/'

module.exports = {
  baseUrl: baseUrl, // 根据你的实际情况更改这里
  outputDir: '/Users/shmy/go/src/github.com/shmy/dd-server/public/web_admin',
  lintOnSave: true,
  devServer: {
    proxy: {
      // proxy all requests starting with /api
      '/api': {
        target: 'http://localhost:1994/api/server',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    port: 8081,
    open: true,
    publicPath: baseUrl // 和 baseUrl 保持一致
  },
  productionSourceMap: false,
  configureWebpack: {
    output: {
      jsonpFunction: 'j'
    },
    plugins: [
      // 预渲染
      // new PrerenderSpaPlugin({
      //   // Absolute path to compiled SPA
      //   staticDir: path.join(__dirname, 'dist'),
      //   // List of routes to prerender
      //   routes: preRoutes
      // }
      // ),
      new CompressionWebpackPlugin({ // GZIP
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      })
    ]
  },
  // webpack 设置
  // 默认设置: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-service/lib/config/base.js
  chainWebpack: config => {
    // markdown
    // config.module
    //   .rule('md')
    //   .test(/\.md$/)
    //   .use('text-loader')
    //   .loader('text-loader')
    //   .end()
    // svg
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .include
      .add(resolve('src/assets/svg-icons/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'd2-[name]'
      })
      .end()
    // image exclude
    const imagesRule = config.module.rule('images')
    imagesRule
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .exclude
      .add(resolve('src/assets/svg-icons/icons'))
      .end()
    // 重新设置 alias
    config.resolve.alias
      .set('@', resolve('src'))
    // babel-polyfill 加入 entry
    // const entry = config.entry('app')
    // entry
    //   .add('babel-polyfill')
    //   .end()
  }
}
