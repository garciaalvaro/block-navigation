const path = require("path");
const replace = require("replace-in-file");

const { name, version } = require("../package.json");

// Replace the version number
replace.sync({
	files: path.resolve(__dirname, `../${name}.php`),
	from: [
		/( \* Version: )\d+\.\d+\.\d+(-(beta|rc)(\d+)?)?/,
		/(\$plugin_version = ")\d+\.\d+\.\d+(-(beta|rc)(\d+)?)?/,
	],
	to: `$1${version}`,
});

replace.sync({
	files: path.resolve(__dirname, "../README.txt"),
	from: /(Stable tag: )\d+\.\d+\.\d+(-(beta|rc)(\d+)?)?/,
	to: `$1${version}`,
});
