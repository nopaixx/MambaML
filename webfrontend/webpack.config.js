var HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

var path = require('path');
module.exports = {
	entry: './src/index.jsx',

	output: {
		filename: 'bundle.js',
		publicPath: '',
	},

	mode: 'development',
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env'],
				},
			},
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader',
			},
			{
				enforce: 'pre',
				test: /\.js$/,
				loader: 'source-map-loader',
				exclude: [
					// instead of /\/node_modules\//
					path.join(process.cwd(), 'node_modules'),
				],
			},
			{
				test: /\.(png|jpe?g|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {},
					},
				],
			},
		],
	},
	// output: {
	// 	path: __dirname + '/dist',
	// 	publicPath: '',
	// 	filename: 'bundle.js',
	// },
	devServer: {
		//contentBase: './dist',
		historyApiFallback: true,
		//hot: true,
	},
	plugins: [
		//new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: './index.html',
		}),
	],
};
