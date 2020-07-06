const { name, version } = require("./package.json");
const replace = require("replace-in-file");

// Replace the version number
replace({
	files: `${name}.php`,
	from: [
		/( \* Version: )\d+\.\d+\.\d+(-(beta|rc)(\d+)?)?/,
		/(define.*?PLUGIN_VERSION.*?)\d+\.\d+\.\d+(-(beta|rc)(\d+)?)?/
	],
	to: `$1${version}`
});

replace({
	files: "README.txt",
	from: /(Stable tag: )\d+\.\d+\.\d+(-(beta|rc)(\d+)?)?/,
	to: `$1${version}`
});
