const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')

const PATHS = {
  source: path.join(__dirname, 'src'),
  output: path.join(__dirname, 'dist'),
}

const baseConfig = {
  entry: {
    app: PATHS.source,
  },
  output: {
    path: PATHS.output,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
    new webpack.DefinePlugin({
      API_HOST: JSON.stringify(process.env.API_HOST),
    }),
  ],
}

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    baseConfig.devtool = 'source-map'
    baseConfig.devServer = {
      host: '0.0.0.0',
      port: 8080,
      compress: true,
      contentBase: PATHS.output,
      historyApiFallback: true,
      publicPath: '/',
    }
    baseConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
    baseConfig.output.filename = '[name].bundle.js'
  }
  if (argv.mode === 'production') {
    baseConfig.output.filename = '[name].[contenthash].bundle.js'
  }
  return baseConfig
}
