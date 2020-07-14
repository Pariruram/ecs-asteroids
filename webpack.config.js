const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      controllers: path.resolve(__dirname, 'src/controllers'),
      entities: path.resolve(__dirname, 'src/entities'),
      helpers: path.resolve(__dirname, 'src/helpers'),
      ui: path.resolve(__dirname, 'src/ui'),
      '@Root': path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [['@babel/plugin-proposal-class-properties']],
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Development',
      template: './public/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'docs'),
  },
  devServer: {
    contentBase: '/dist',
    watchContentBase: true,
    publicPath: '/',
    hot: true,
    port: 3010,
    quiet: true,
    inline: true,
    compress: true,
    historyApiFallback: {
      index: 'index.html',
    },
    clientLogLevel: 'none',
    overlay: false,
    stats: { colors: true },
  },
}
