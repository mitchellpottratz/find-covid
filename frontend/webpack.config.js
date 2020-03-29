const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const webpack = require('webpack');


module.exports = {
	module: {
		rules: [
		  {
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
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
	}
}

