const { name, description, version, homepage } = require("./package.json");
const { BannerPlugin } = require("webpack");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

module.exports = (env, { mode }) => {
	const is_production = mode === "production";

	const config = {
		watch: !is_production,

		entry: path.resolve(__dirname, "src/entry.ts"),

		output: {
			path: path.resolve(__dirname, "dist"),
			filename: `${name}.js`,
		},

		resolve: {
			alias: {
				"@": path.resolve(__dirname, "src"),
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

			{
				loader: "css-loader",
				options: {
					modules: {
						localIdentName: is_production
							? "[hash:base64:5]"
							: "[name]-[local]-[hash:base64:2]",
					},
				},
			},

			{
				loader: "stylus-loader",
				options: {
					stylusOptions: {
						use: "nib",
						import: [
							path.resolve(
								__dirname,
								"src/utils/css/variables.styl"
							),
						],
					},
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
				banner: `${description} v${version} | ${homepage}`,
				include: /\.css/,
			})
		);

		config.plugins.push(
			new BannerPlugin({
				banner: [
					`${description} v${version} | ${homepage}`,
					`react-tiny-popover | https://github.com/alexkatz/react-tiny-popover | Alex Katz | MIT License`,
					`copy-text-to-clipboard | https://github.com/sindresorhus/copy-text-to-clipboard | Sindre Sorhus | MIT License`,
				].join("\n"),
				include: /\.js/,
			})
		);

		config.optimization = {
			minimize: true,
			minimizer: [
				new OptimizeCSSAssetsPlugin(),

				// As we are using a custom optimization, making use of
				// OptimizeCSSAssetsPlugin, we also need to specify TerserPlugin
				new TerserPlugin({ extractComments: false }),
			],
		};
	}

	return config;
};
