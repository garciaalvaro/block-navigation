const { name, description, version, homepage } = require("./package.json");
const { BannerPlugin } = require("webpack");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const nib = require("nib");
const path = require("path");

module.exports = (env, { mode }) => {
	const is_production = mode === "production";

	const config = {
		watch: !is_production,

		entry: path.resolve(__dirname, "src/entry.ts"),

		output: {
			path: path.resolve(__dirname, "build"),
			filename: `${name}.js`,
		},

		resolve: {
			alias: {
				components: path.resolve(__dirname, "src/components"),
				utils: path.resolve(__dirname, "src/utils"),
				store: path.resolve(__dirname, "src/store"),
			},
		},

		externals: {
			lodash: "lodash",
			react: "React",
			"react-dom": "ReactDOM",
			"@wordpress/components": "wp.components",
			"@wordpress/compose": "wp.compose",
			"@wordpress/data": "wp.data",
			"@wordpress/edit-post": "wp.editPost",
			"@wordpress/element": "wp.element",
			"@wordpress/hooks": "wp.hooks",
			"@wordpress/i18n": "wp.i18n",
			"@wordpress/plugins": "wp.plugins",
			"@wordpress/rich-text": "wp.richText",
		},

		module: { rules: [] },

		plugins: [],
	};

	config.module.rules.push({
		test: /\.tsx?$/,
		exclude: /node_modules/,
		loader: "babel-loader",
		resolve: {
			extensions: [".ts", ".tsx", ".js", ".jsx"],
		},
	});

	config.module.rules.push({
		test: /\.(css|styl)$/,
		use: [
			MiniCssExtractPlugin.loader,

			"css-loader",

			{
				loader: "stylus-loader",
				options: {
					use: [nib()],
					import: [
						"~nib/index.styl",
						path.resolve(
							__dirname,
							"src/utils/data/stylus_variables.styl"
						),
					],
				},
			},
		],
	});

	config.plugins.push(
		new MiniCssExtractPlugin({
			filename: `${name}.css`,
		})
	);

	if (is_production) {
		config.plugins.push(
			new BannerPlugin({
				banner: `${description} | ${version} | ${homepage}`,
				include: new RegExp(/.*?\.css/),
			})
		);

		config.plugins.push(
			new BannerPlugin({
				banner: [
					`/*! ${description} | ${version} | ${homepage} */`,
					`/*! react-tiny-popover | https://github.com/alexkatz/react-tiny-popover | Alex Katz | MIT License */`,
					`/*! copy-text-to-clipboard | https://github.com/sindresorhus/copy-text-to-clipboard | Sindre Sorhus | MIT License */`,
				].join(""),
				raw: true,
				include: new RegExp(/.*?\.js/),
			})
		);

		config.optimization = {
			minimizer: [new OptimizeCSSAssetsPlugin()],
		};
	}

	return config;
};
