import CopyPlugin from "copy-webpack-plugin";
import path from "path";

export default {
	entry: path.join(__dirname, "copy.entry.js"),
	output: {
		path: path.join(__dirname, "../_release"),
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
					"tsconfig.json",
					"webpack/**"
				]
			}
		])
	]
};
