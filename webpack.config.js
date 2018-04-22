const path = require("path");
const copyPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: "development",
	entry: {
		app: "./src/ts/app.ts"
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist"),
		publicPath: "/"
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx", ".styl"]
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 3000
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "awesome-typescript-loader"
			},
			{
				test: /.styl$/,
				use: [
					"style-loader",
					"css-loader",
					"stylus-loader"
				]
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				loader: "file-loader"
			}
		]
	},
	plugins: [
		new copyPlugin([
			{
				from: "./src/index.html"
			}
		])
	]
};