const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const minify = {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true
};

module.exports = {
  entry: {
    index: "./src/index.ts",
  },
  devtool: "inline-source-map",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader", "eslint-loader"],
        exclude: /node_modules/
      },
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"]
        }
      },
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      hash: true,
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["index"],
      minify
    }),
  ],
  devServer: {
    publicPath: "/",
    historyApiFallback: true,
    noInfo: false,
    quiet: false,
    stats: "errors-only",
    clientLogLevel: "warning",
    compress: true,
    port: 9000
  }
};
