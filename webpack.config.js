const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const options = {
	entry: {
		'main': './src/app.js'
	},
	module: {
		rules: [
	      {
	        test: /\.(sa|sc|c)ss$/,
	        use: ExtractTextPlugin.extract({
	          fallback: "style-loader",
	          use: [
	            "css-loader",
	            {
	              loader: "postcss-loader",
	              options: {
	                plugins: [
	                  require("autoprefixer")({ browsers: ["ie >= 9", "> 2%", "last 1 version"] })
	                ]
	              }
	            },
	            "sass-loader"
	          ]
	        })
	      }, {
	        test: /\.js$/,
	        exclude: /(node_modules|bower_components)/,
	        loader: "babel-loader",
	        options: {
	          presets: ["es2015"]
	        }
	      }, {
				test: /\.(png|jpg|gif|svg|jpeg|woff|eot|ttf)$/,
				use: ['file-loader?name=assets/[name].[ext]&']
			}
		]
	},
	resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.scss']
    },
	output: {
		path: path.resolve(__dirname, './build'),
		filename: '[name].[chunkhash:8].js',
        library: '[name]',
/*        libraryTarget: 'umd',
        umdNamedDefine: true,*/
		publicPath: './'
	},
	plugins: [
		new ExtractTextPlugin("[name].[contenthash:8].css")
	]
};

module.exports = function (env) {
  return require('./.webpack/' + (env === 'prod' ? 'prod' : 'dev') + '.js')(options);
};