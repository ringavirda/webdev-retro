/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const entryPathJS = path.resolve(__dirname, "..", "index.ts");
const outputPath = path.resolve(__dirname, "..", "dist");

module.exports = {
  mode: "development",
  entry: entryPathJS,
  target: "web",
  output: {
    path: outputPath,
    filename: "[name].bundle.js",
    clean: true,
  },
  devtool: "source-map",
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              configFile: path.resolve(__dirname, "babel.config.json"),
            },
          },
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, "tsconfig.json"),
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
    alias: {
      react: path.resolve(__dirname, "..", "./node_modules/react"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
};
