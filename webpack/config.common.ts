/// <reference path="./index.d.ts" />

import {Configuration, DefinePlugin} from 'webpack';
import {join, resolve} from 'path';
import * as moment from 'moment';

const PackageData = require('../package.json');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ScreepsSourceMapToJson = require('./screeps-webpack-sources').default;

export default (options: EnvOptions): Configuration => {
	const ENV = options.ENV || 'dev';
	const ROOT = options.ROOT || __dirname;
	const PRODUCTION = options.ENV === 'production';
	const DefineConfig = {
		ENV: JSON.stringify(ENV),
		BUILD_TIME: JSON.stringify(moment().format('MMMM Do YYYY, h:mm:ss a')),
		BUILD_VERSION: JSON.stringify(PackageData.version),
	};
	return {
		entry: './src/index.ts',
		output: {
			devtoolModuleFilenameTemplate: '[resource-path]',
			filename: '[name].js',
			libraryTarget: 'commonjs2',
			path: join(ROOT, 'dist'),
			pathinfo: false,
			sourceMapFilename: '[file].map.js',
		},
		externals: {
			'main.js.map': 'main.js.map',
			config: 'config',
			commands: 'commands',
		},
		node: {
			Buffer: false,
			__dirname: false,
			__filename: false,
			console: true,
			global: true,
			process: false,
		},
		resolve: {
			alias: {
				// 这里需要个app.js里保持一致
				Enum: resolve(ROOT, 'enmu'),
			},
			extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
		},
		devtool: PRODUCTION ? false : 'source-map',
		target: 'node',
		module: {
			rules: [
				{
					test: /\.ts$/,
					enforce: 'pre',
					loader: 'source-map-loader',
				},
				{
					test: /\.ts$/,
					loader: 'ts-loader',
					options: {
						transpileOnly: true,
					},
				},
			],
		},
		plugins: [
			new CleanWebpackPlugin([`dist/*`], {root: options.ROOT}),
			new CopyWebpackPlugin([
				{from: join(ROOT, 'config/**/*'), flatten: true},

			]),
			new UglifyJsPlugin({sourceMap: !PRODUCTION}),
			new DefinePlugin(DefineConfig),
			new ScreepsSourceMapToJson(),
		].filter(Boolean),
		watchOptions: {
			ignored: /backup/,
			aggregateTimeout: 300,
		},
	};
};
