const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: isProd ? false : 'source-map',
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    filename: isProd ? 'scripts.[contenthash].js' : 'scripts.js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
      favicon: './public/favicon.ico',
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: isProd ? 'styles.[contenthash].css' : 'styles.css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './src/assets/img'),
          to: path.resolve(__dirname, './dist/assets/img'),
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    hot: true,
    open: true,
    port: 8080,
  },
};
