const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const srcPath = path.join(__dirname, "src");
const publicPath = path.join(__dirname, "public");
const distPath = path.join(__dirname, "dist");

module.exports = {
	entry: path.join(srcPath, "index.ts"),
	output: {
		filename: "main.js",
		path: distPath
	},

	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
			},
			{
				test: /\.m?js/,
				resolve: {
					fullySpecified: false
				}
			}
		],
	},

	resolve: {
		extensions: [
			'.ts', '.js',
		]
	},

	plugins: [
		new webpack.ProvidePlugin({
			process: 'process/browser'
		}),
		new CopyPlugin({
			patterns: [{ from: publicPath, to: distPath }],
		}),
	],

	devServer: {
		static: {
			directory: distPath
		}
	},

	watchOptions: {
		ignored: /node_modules/,
		poll: 5000
	},
};
