const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: process.env.NODE_ENV.trim() == 'production' ? 'production' : 'development',
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/'
	},
	devtool: 'cheap-module-source-map',
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /\.js$/,
				use: ['babel-loader'],
				exclude: /node_modules/
			}
		]
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: 'index.html',
			title: 'Subreddit Guesser',
			inject: 'body'
		})
	]
}
