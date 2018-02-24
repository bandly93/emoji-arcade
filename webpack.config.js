const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/public/app.js',
	output : {
		filename:'bundle.js',
		path:path.resolve(__dirname,'dist')
	},
	module:{
		rules:[ 
			{ 
				test : /\.jsx?$/,
				exclude:/node_modules/,
				loader:'babel-loader',
				options:{
					presets:['react','env','stage-3'],
					plugins:['transform-class-properties']

				}
			},
			{
				test : /\.css$/,use:[{loader:'style-loader'},{loader:'css-loader'}]
			}
		]
	},
	plugins:[
		new webpack.optimize.UglifyJsPlugin(),
		new HtmlWebpackPlugin({template:'./index.html'})
	]
};

