const path = require('path')
const ENV = 'dev'
const ROOT = __dirname
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const ScreepsSourceMapToJson = require('./lib/screeps-webpack-sources')

module.exports = {
  devtool: 'source-map',
  target: 'node',
  entry: {
    main: ['./src/main.js']
  },
  output: {
    devtoolModuleFilenameTemplate: '[resource-path]',
    filename: 'main.js',
    libraryTarget: 'commonjs2',
    path: '/Users/mac/Library/Application Support/Screeps/scripts/127_0_0_1___21025/default/',
    pathinfo: false,
    sourceMapFilename: '[file].map.js'
  },
  externals: {
    'main.js.map': 'main.js.map',
    config: 'config'
  },
  resolve: {
    alias: {
      // 这里需要个app.js里保持一致
      Enums: path.resolve(ROOT, 'src', 'enmus'),
      Managers: path.resolve(ROOT, 'src', 'managers'),
      Prototypes: path.resolve(ROOT, 'src', 'prototypes'),
      Clocks: path.resolve(ROOT, 'src', 'clocks'),
      Posts: path.resolve(ROOT, 'src', 'posts')
    },
    mainFiles: ['index'],
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'source-map-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([`dist/${ENV}/*`], {root: ROOT}),
    new CopyWebpackPlugin([{from: path.join(ROOT, 'src/config.js')}]),
    new ScreepsSourceMapToJson()
  ],
  watchOptions: {
    ignored: /docs/,
    aggregateTimeout: 300
  }
}
