const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const MiniCssPlugin = require("mini-css-extract-plugin")
const CssMinimizer = require("css-minimizer-webpack-plugin")
const TerserWebpackPlugin = require("terser-webpack-plugin")

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`

const optimization = () => {
  const config = {}

  if (isProd) {
    config.minimizer = [
      new CssMinimizer(),
      new TerserWebpackPlugin(),

    ]
  }

  return config
}

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: {
    main: "./index.js"
  },
  output: {
    filename: filename("js"),
    path: path.resolve(__dirname, "dist"),
    clean: true,
    assetModuleFilename: "assets/[hash][ext][query]"
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./index.html"
    }),
    new MiniCssPlugin({
      filename: filename("css")
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext]"
        }
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  optimization: optimization(),
  devServer: {
    port: 3000,
    open: true,
    static: {
      directory: path.join(__dirname, "src")
    }
  }
}
