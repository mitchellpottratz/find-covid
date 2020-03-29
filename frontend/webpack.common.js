const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const webpack = require('webpack');


module.exports = {
	entry: './src/index.js',
	module: {
		rules: [
		  {
				exclude: /node_modules/,
				test: /\.(js|jsx)$/,
				use: {
			  	loader: "babel-loader"
				}
			},
			{
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
			},
			{
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
		]
	},
	// plugins: [
	// 	new HtmlWebpackPlugin({template: './src/index.html'}),
	// ],
	output: {
		filename: 'react-app-bundle.bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
}

