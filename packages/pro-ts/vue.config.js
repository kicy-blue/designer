const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const tsImportPluginFactory = require('ts-import-plugin')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const AntDesignThemePlugin = require('antd-theme-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const antdOptions = {
  antdDir: path.join(__dirname, './node_modules/ant-design-vue'),//antd包位置
  stylesDir: path.join(__dirname, './src/styles/theme'),//主题文件夹位置
  varFile: path.join(__dirname, './src/styles/theme/variables.less'),//自定默认主题
  mainLessFile: path.join(__dirname, './src/styles/theme/index.less'),//项目中其他自定义的样式（若无需动态修改，该文件可以为空）
  outputFilePath: path.join(__dirname, './public/color.less'),//提取less文件输出到什么地方
  themeVariables: ['@primary-color', '@sucess-color', '@warning-color', '@error-color', 'disabled-color', '@border-radius-base', '@border-color-base'],//要改变的主题变量
  indexFileName: './public/index.html',//index.html所在位置
  generateOnce: false //是否只生成一次
}

const env = require('./env')
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  pages: {
    proIndex: {
      // page 的入口
      entry: "src/main.ts",
      publicPath: "./dist",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "神奇魔盒",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "proIndex"],
    }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 'primary-color': '#89ac12'//全局主题色
        },
        javascriptEnabled: true
      }
    },
    sourceMap: false,//开启CSS scouce maps
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.join(__dirname, 'src')).set('@images', path.join(__dirname, 'static/images'))
    config.module.rule('ts').use('ts-loader').tap(options => Object.assign(options, {
      getCustomTransformers: () => ({
        before: [tsImportPluginFactory({
          libraryName: 'antd-vue',
          libraryDirectory: 'es',
          style: true
        })]
      }),
    }))
    config.plugins.delete('prefetch-index')
  },
  configureWebpack: (config) => {
    let multiEnv = ['production', 'test']
    if (multiEnv.includes(process.env.NODE_ENV)) {
      const productionGzipExtensions = ['html', 'js', 'css']
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp(
            '\\.(' + productionGzipExtensions.join('|') + ')$'
          ),
          threshold: 10240,//只有大于该值的资源会被处理
          minRatio: 0.8,//只有压缩率小于这个值的资源才会被处理
          deleteOriginaAssets: false//删除原文件
        })
      )
    }
    // config.externals = {
    //   'vue': 'Vue',
    //   'vue-router': 'VueRouter'
    // }
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"' + process.env.NODE_ROUT + '"'
        }
      }),
      new CopyWebpackPlugin([{
        from: path.join(__dirname, 'static'),
        to: '.',
        ignore: ['.*']
      }]),
      new MonacoWebpackPlugin({
        languages: ['typescript', 'json', 'markdown'],
        output: './static/plugin/monaco-editor'
      }),
      new AntDesignThemePlugin(antdOptions),
    )
    if (process.env.NODE_ENV === 'development') {

    }

  },
  devServer: {
    port: env.port,
    open: true,
    //openPage:'designer/',
    https: false,
    hotOnly: false,
    disableHostCheck: false,
    proxy: env.proxy
  }
}