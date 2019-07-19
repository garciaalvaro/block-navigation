const pkg = require("../package.json");

const _rootdir = __dirname + "/..";
const { version } = pkg;

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
		entry: _rootdir + `/.webpack/release-replace.index.js`,
		output: {
			path: `${_rootdir}/_extras/release`,
			filename: `_replace.js`
		},
		module: {
			rules: [
				{
					test: /block-navigation\.php$/,
					use: [
						{
							loader: "file-loader",
							options: {
								name: "[name].[ext]"
							}
						},
						getReplace(/^( \* Version: )\d+\.\d+\.\d+/.source, "$1" + version),
						getReplace(/\n\/\/\sDEV_start(.|\n)*?\/\/\sDEV_end/.source, ""),
						getReplace(/\n\/\/\sPRO_start(.|\n)*?\/\/\sPRO_end\n/.source, "")
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
						getReplace(/^(Stable tag: )\d+\.\d+\.\d+/.source, "$1" + version)
					]
				}
			]
		}
	}
];
