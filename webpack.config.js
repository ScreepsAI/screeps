const path = require('path');
const ENV = 'dev';
const ROOT = __dirname;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const ScreepsSourceMapToJson = require('./lib/screeps-webpack-sources');

module.exports = {
    devtool: 'source-map',
    target: 'node',
    entry: {
        main: ['./src/main.js'],
    },
    output: {
        devtoolModuleFilenameTemplate: '[resource-path]',
        filename: 'main.js',
        libraryTarget: 'commonjs2',
        path: '/Users/mac/Library/Application Support/Screeps/scripts/127_0_0_1___21025/default/',
        pathinfo: false,
        sourceMapFilename: '[file].map.js',
    },
    externals: {
        'main.js.map': 'main.js.map',
        config: 'config',
    },
    resolve: {
        alias: {
            // 这里需要个app.js里保持一致
            Enums: path.resolve(ROOT, 'enmus'),
        },
        mainFiles: ['index'],
        extensions: ['.webpack.js', '.web.js', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'source-map-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new CleanWebpackPlugin([`dist/${ENV}/*`], {root: ROOT}),
        // new ForkTsCheckerWebpackPlugin(),
        new CopyWebpackPlugin([{from: path.join(ROOT, 'src/config.js')}, {from: path.join(ROOT, 'src/commands.js')}]),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(ENV === 'production'),
            __BUILD_TIME__: JSON.stringify(Date.now()),
        }),
        new ScreepsSourceMapToJson(),
    ],
    watchOptions: {
        ignored: /backup/,
        aggregateTimeout: 300,
    },
}
