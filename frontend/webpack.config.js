const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const webpack = require('webpack');


module.exports = {
	entry: './src/index.js',
	output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'react-app-bundle.bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	},
	plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
}