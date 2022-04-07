const path = require("path");
let currentTask = process.env.npm_lifecycle_event;
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fse = require("fs-extra");

class RunAfterComplie {
  apply(compiler) {
    compiler.hooks.done.tap("Copy images", function () {
      fse.copySync("./app/assets/images", "./dist/assets/images");
    });
  }
}

const CSSConfig = {
  test: /\.css/i,
  use: ["css-loader", "sass-loader"],
};

let config = {
  entry: "./app/assets/scripts/App",
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./app/index.html",
    }),
  ],
  module: {
    rules: [CSSConfig],
  },
};

if (currentTask === "dev") {
  CSSConfig.use.unshift("style-loader");
  config.output = {
    filename: "bundled.js",
    path: path.resolve(__dirname, "app"),
  };

  config.devServer = {
    watchFiles: ["./app/**/*.html"],
    static: path.resolve(__dirname, "app"),
    hot: true,
    port: 7000,
    host: "0.0.0.0",
  };

  config.mode = "development";
}

if (currentTask === "build") {
  CSSConfig.use.unshift(MiniCssExtractPlugin.loader);
  config.output = {
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "dist"),
  };

  config.mode = "production";
  config.plugins.push(
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: "style.[chunkhash].css" }),
    new RunAfterComplie()
  );
  config.optimization = {
    splitChunks: {
      chunks: "all",
    },
  };
}

module.exports = config;
