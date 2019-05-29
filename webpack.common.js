import { resolve as _resolve, join } from 'path';

import merge from 'webpack-merge';
import MiniCssExtractPlugin, { loader as _loader } from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackBar from 'webpackbar';

/**
 * Renderer process bundle
 */
const uiConfig = {
  entry: {
    main: ['./src/ui/main.tsx'],
  },
  output: {
    path: `${__dirname}/dist/ui`,
    filename: 'bundle.js',
    publicPath: './',
  },
  target: 'electron-renderer',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      title: 'Museeks',
      template: 'src/app.html',
    }),
    new WebpackBar({
      name: 'UI  ',
      basic: true
    })
  ]
}

/**
 * Main process bundle
 */
const mainConfig = {
  entry: {
    main: ['./src/main/main.ts'],
  },
  resolve: {
    alias: {
      jsbi: _resolve(__dirname, 'node_modules', 'jsbi', 'dist', 'jsbi-cjs.js')
    }
  },
  output: {
    path: `${__dirname}/dist/main`,
    filename: 'bundle.js',
    publicPath: './',
  },
  target: 'electron-main',
  node: {
    __dirname: false,
    __filename: false,
  },
  plugins: [
    new WebpackBar({
      name: 'Main',
      color: 'yellow',
      basic: true
    })
  ]
}

/**
 * Shared config
 */
const sharedConfig = {
  resolve: {
    // mainFields: ['browser', 'main', 'module'],
    extensions: ['.mjs', '.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)([?]?.*)$/,
        loader: ['ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          _loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]___[hash:base64:5]',
              camelCase: 'dashesOnly',
              sourceMap: true,
            }
          },
          'postcss-loader'
        ],
        exclude: join(__dirname, 'node_modules')
      },
      {
        test: /\.css$/,
        use: [
          _loader,
          'css-loader',
        ],
        include: join(__dirname, 'node_modules')
      },
      {
        test: /\.(eot|woff|woff2|ttf)([?]?.*)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '/fonts/[name].[ext]',
            useRelativePath: true
          }
        }],
      },
      {
        test: /\.(png|jpg|ico)([?]?.*)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]',
          },
        }],
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: ['svg-inline-loader'],
        include: _resolve(__dirname, 'src'),
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            mimetype: 'image/svg+xml',
          },
        }],
        include: /node_modules/,
      },
      {
        test: /\.node$/,
        use: 'node-loader'
      },
      { // Hotfix for iconv-lite https://github.com/ashtuchkin/iconv-lite/issues/204
        test: /node_modules[\/\\](iconv-lite)[\/\\].+/,
        resolve: { aliasFields: ['main'] }
      }
    ],
  },
  stats: {
    children: false,
    chunks: false,
    chunkModules: false,
    modules: false,
    reasons: false,
  },
};

export const ui = merge(uiConfig, sharedConfig);
export const main = merge(mainConfig, sharedConfig);
