const pkg = require("../package.json");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BannerPlugin = require("webpack").BannerPlugin;
const nib = require("nib");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const DefinePlugin = require("webpack").DefinePlugin;

const _rootdir = `${__dirname}/..`;
const { name, version, plugin_name, plugin_uri } = pkg;

module.exports = [
	{
		entry: ["./src/index.js", "./src/index.styl"],
		output: {
			path: `${_rootdir}/build`,
			filename: `${name}.js`
		},
		resolve: {
			alias: {
				utils: `${_rootdir}/src/js/utils`,
				store: `${_rootdir}/src/js/store`,
				Components: `${_rootdir}/src/js/Components`
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
				filename: `${name}.css`
			}),
			new BannerPlugin({
				banner: () => {
					const banner = [`/*! ${plugin_name} | ${version} | ${plugin_uri} */`];
					return banner.join("");
				},
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
	}
];
