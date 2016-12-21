module.exports = {
	devtool: 'inline-sourcemap',
	entry: './index.js',
	output: {
		filename: 'bundle.js'
	},

	module: {
		// transpile jsx
		// transpile es2015 to js
		loaders: [
			{
				test: /\.js$/ , 
				exclude: /node_modules/,
				loaders: ['react-hot', 'babel']
			},
			{
				loaders: ["style", "css", "sass"],
				test: /\.scss$/
			}
		]
		// live reloading
	}
};