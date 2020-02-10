const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");

module.exports = merge(common, {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  module: {
    rules: []
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 80,
    historyApiFallback: {
      index: 'index.html'
    }
  }
})
