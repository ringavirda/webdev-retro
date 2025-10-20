/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("path");
const nodeExternals = require("webpack-node-externals");

const entryPath = path.resolve(__dirname, "..", "src/server.ts");
const outputPath = path.resolve(__dirname, "../..", "dist");

module.exports = {
  mode: "production",
  entry: entryPath,
  target: "node",
  externalsPresets: { node: true },
  externals: [nodeExternals({ allowlist: ["express"] })],
  output: {
    path: outputPath,
    filename: "[name].bundle.js",
    globalObject: "this",
  },
  devtool: "source-map",
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.[t|j]s$/,
        exclude: /node_modules/,
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
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
};
