"use strict";
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    port: process.env.port || process.env.npm_config_port || 9010, // dev port,
  },
  configureWebpack: {
    name: "vue3-ts",
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
  },
};
