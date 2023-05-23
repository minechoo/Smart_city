const { defineConfig } = require('@vue/cli-service')
const path = require('path');
module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: true,
  publicPath: '/sample/',
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src/')
      }
    }
  }
  // , outputDir: path.join(__dirname, '../../../static/')
})
