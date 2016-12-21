module.exports = {
	entry: './app.js',

	output: {
		// path: 'build',
		filename: 'bundle.js'
	},

	module: {
		// transpile jsx
		// transpile es2015 to js
		loaders: [
			{
				test: /\.js$/ , 
				exclude: /node_modules/,
				loaders: ['react-hot', 'babel-loader']
			},
			{
				loaders: ["style", "css", "sass"],
				test: /\.scss$/
			}
		]
		// live reloading
	}
};