const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const entryPath = path.join(__dirname, "src", "app.js");
const outputPath = path.join(__dirname, "dist");

module.exports = {
  mode: "development",
  entry: entryPath,
  target: "web",
  output: {
    path: outputPath,
    filename: "[name].bundle.js",
    clean: true,
  },
  devServer: {
    static: {
      directory: outputPath,
    },
    compress: true,
    port: 5000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".json"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].bundle.css",
    }),
  ],
};
