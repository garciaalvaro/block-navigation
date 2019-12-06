import { name, version } from "../package.json";

const getReplace = (search, replace) => ({
	loader: "string-replace-loader",
	options: {
		search,
		replace,
		flags: "gm"
	}
});

export default {
	entry: __dirname + "/version.entry.js",
	output: {
		path: __dirname + "/..",
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
					getReplace(/^( \* Version: )\d+\.\d+\.\d+/.source, `$1${version}`),
					getReplace(
						/(define.*?PLUGIN_VERSION.*?)\d+\.\d+\.\d+/.source,
						`$1${version}`
					)
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
};
