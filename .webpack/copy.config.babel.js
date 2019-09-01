const CopyPlugin = require("copy-webpack-plugin");

module.exports = [
	{
		entry: __dirname + "/copy.entry.js",
		output: {
			path: __dirname + "/../_release",
			filename: "_temp.js"
		},
		plugins: [
			new CopyPlugin([
				{
					from: "**/*",
					ignore: [
						".*",
						".*/**",
						"_extras/**",
						"assets-repo/**",
						"types/**",
						"_release",
						"_temp.js",
						"inc/dev/**",
						"node_modules/**",
						"package.json",
						"package-lock.json",
						"README.md",
						"src/**",
						"tsconfig.json"
					]
				}
			])
		]
	}
];
