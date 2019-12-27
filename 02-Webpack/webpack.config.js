const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
    visitor: "./admin-and-visitor/visitor.js",
    admin: "./admin-and-visitor/admin.js"
  },
  devtool: "inline-source-map",
  output: {
    filename: "utils/[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 0,
      maxSize: 0,
      minChunks: 2,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: "~",
      automaticNameMaxLength: 30
    }
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
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
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images",
              limit: 1000
            }
          }
        ]
      }
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
      filename: "index_tasks_1-4.html",
      chunks: ["index"],
      minify
    }),
    new HtmlWebpackPlugin({
      inject: true,
      hash: true,
      template: "./admin-and-visitor/admin.html",
      filename: "admin_task_5.html",
      chunks: ["admin", "admin~visitor"],
      minify
    }),
    new HtmlWebpackPlugin({
      inject: true,
      hash: true,
      template: "./admin-and-visitor/visitor.html",
      filename: "visitor_task_5.html",
      chunks: ["visitor", "admin~visitor"],
      minify
    }),
    new MiniCssExtractPlugin({
      filename: "styles/styles.css"
    })
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
