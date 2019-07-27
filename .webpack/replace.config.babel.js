const pkg = require("../package.json");
const { version, name } = pkg;
const getReplace = (search, replace) => ({
	loader: "string-replace-loader",
	options: {
		search: search,
		replace: replace,
		flags: "gm"
	}
});

module.exports = [
	{
		entry: __dirname + "/replace.entry.js",
		output: {
			path: __dirname + "/../_extras/release",
			filename: "_temp.js"
		},
		module: {
			rules: [
				{
					test: new RegExp(`${name}\.php$`),
					use: [
						{
							loader: "file-loader",
							options: {
								name: "[name].[ext]"
							}
						},
						getReplace(/^( \* Version: )\d+\.\d+\.\d+/.source, `$1${version}`)
					]
				},
				{
					test: /README\.txt$/,
					use: [
						{
							loader: "file-loader",
							options: {
								name: "[name].[ext]"
							}
						},
						getReplace(/^(Stable tag: )\d+\.\d+\.\d+/.source, `$1${version}`)
					]
				}
			]
		}
	}
];
