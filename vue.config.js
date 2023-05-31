const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: true,
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8180/", // 개발서버
      },

    },
  },

  configureWebpack: {
    resolve: {
      alias: {
        "@": path.join(__dirname, "src/"),
      },
    },
  },
  // , outputDir: path.join(__dirname, '../../../static/')
});
