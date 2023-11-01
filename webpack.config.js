const webpack = require("webpack");

module.exports = {
	mode: 'development',
	entry: './src/index.ts',

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

	watchOptions: {
		ignored: /node_modules/,
		poll: 5000
	},

	plugins: [
		new webpack.ProvidePlugin({
			process: 'process/browser'
		})
	]
};
