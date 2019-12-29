import { name, description, version, homepage } from "../package.json";
import { BannerPlugin, DefinePlugin } from "webpack";
import TerserJSPlugin from "terser-webpack-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import nib from "nib";
import path from "path";

export default {
	entry: path.join(__dirname, "../src/index.ts"),
	output: {
		path: path.join(__dirname, "../build"),
		filename: `${name}-v1.js`
	},
	resolve: {
		alias: {
			Components: path.join(__dirname, "../src/Components"),
			utils: path.join(__dirname, "../src/utils"),
			store: path.join(__dirname, "../src/store")
		}
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
		"@wordpress/rich-text": "wp.richText"
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
							import: [
								"~nib/index.styl",
								path.join(__dirname, "../src/utils/data/stylus_variables.styl")
							]
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
			filename: `${name}-v1.css`
		}),
		new BannerPlugin({
			banner: [
				`/*! ${description} | ${version} | ${homepage} */`,
				`/*! react-tiny-popover | https://github.com/alexkatz/react-tiny-popover | Alex Katz | MIT License */`,
				`/*! copy-text-to-clipboard | https://github.com/sindresorhus/copy-text-to-clipboard | Sindre Sorhus | MIT License */`
			].join(""),
			raw: true,
			include: new RegExp(/.*?\.js/)
		}),
		new BannerPlugin({
			banner: `${description} | ${version} | ${homepage}`,
			include: new RegExp(/.*?\.css/)
		})
	],
	optimization: {
		minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
	}
};
