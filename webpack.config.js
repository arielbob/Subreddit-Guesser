const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV.trim() !== 'production'

module.exports = {
	mode: isDev ? 'development' : 'production',
	entry: './src/index.js',
	output: {
		filename: 'js/bundle.[hash].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/'
	},
	optimization: {
		minimizer: [
			!isDev && new TerserWebpackPlugin()
		]
	},
	devtool: isDev && 'cheap-module-source-map',
	module: {
		rules: [
			{
				test: /\.(sc|sa|c)ss$/,
				use: [
					isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
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
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			template: 'index.html',
			inject: true
		}),
		new MiniCssExtractPlugin({
      filename: 'css/' + (isDev ? '[name].css' : '[name].[hash].css')
    }),
		new CopyWebpackPlugin([{ from: 'static' }])
	]
}
