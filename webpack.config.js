var HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  entry: {
    'vendor': ['react','react-dom','react-router-dom'],
    'app': path.resolve(__dirname,'src/index.js')
  },
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: 'scripts/[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/'
            }
          },
          "css-loader"
        ]
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader"
        }
      },
      {
        test: /\.(eot|woff|ttf|svg)$/,
        loaders: ["file?name=[path][name].[ext]?[hash]"]
      },
      {
        test: /\.woff2(\?\S*)?$/,
        loaders: ["file?name=[path][name].[ext]?[hash]"]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    publicPath: '/'
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "index.css",
      chunkFilename: "[id].css"
    })
  ],
};