const pkg = require("../package.json");
const webpack = require("webpack");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BannerPlugin = webpack.BannerPlugin;
const nib = require("nib");
const DefinePlugin = webpack.DefinePlugin;

const { name: pkg_name, version, plugin_name, plugin_uri } = pkg;

export default {
	entry: ["./src/index.ts", "./src/index.styl"],
	output: {
		path: __dirname + "/../build",
		filename: `${pkg_name}.js`
	},
	resolve: {
		alias: {
			Components: __dirname + "/../src/js/Components",
			utils: __dirname + "/../src/js/utils",
			store: __dirname + "/../src/js/store"
		}
	},
	externals: {
		lodash: "lodash",
		react: "React",
		"react-dom": "ReactDOM"
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				resolve: {
					extensions: [".tsx", ".ts", ".js", ".jsx"]
				}
			},
			{
				test: /\.(css|styl)$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "stylus-loader",
						options: {
							use: [nib()],
							import: ["~nib/index.styl"]
						}
					}
				]
			}
		]
	},
	plugins: [
		new DefinePlugin({
			l: (...args) => console.log(...args)
		}),
		new MiniCssExtractPlugin({
			filename: `${pkg_name}.css`
		}),
		new BannerPlugin({
			banner: [
				`/*! ${plugin_name} | ${version} | ${plugin_uri} */`,
				`/*! react-tiny-popover | https://github.com/alexkatz/react-tiny-popover | Alex Katz | MIT License */`,
				`/*! copy-text-to-clipboard | https://github.com/sindresorhus/copy-text-to-clipboard | Sindre Sorhus | MIT License */`
			].join(""),
			raw: true,
			include: new RegExp(/.*?\.js/)
		}),
		new BannerPlugin({
			banner: `${plugin_name} | ${version} | ${plugin_uri}`,
			include: new RegExp(/.*?\.css/)
		})
	],
	optimization: {
		minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
	}
};
