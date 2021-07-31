/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
	parser: "@typescript-eslint/parser",

	ignorePatterns: ["_extras", "_release", "dist", "node_modules"],

	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"airbnb",
		"airbnb/hooks",
		"plugin:prettier/recommended",
	],

	env: {
		es2020: true,
		browser: true,
		node: true,
	},

	rules: {
		camelcase: "off",

		"no-use-before-define": "off",

		"react/jsx-filename-extension": [1, { extensions: [".tsx"] }],

		"@typescript-eslint/no-use-before-define": ["error"],

		"import/no-extraneous-dependencies": "off",

		"import/prefer-default-export": "off",

		"import/extensions": [
			"error",
			"ignorePackages",
			{ ts: "never", tsx: "never" },
		],
	},

	overrides: [
		{
			files: ["**/*.d.ts", "**/types.ts"],
			rules: { "no-unused-vars": "off" },
		},
		{
			files: ["**/*.tsx"],
			rules: { "react/prop-types": "off" },
		},
	],

	settings: {
		"import/resolver": {
			webpack: {
				config: {
					resolve: {
						alias: {
							"@/types": path.resolve(__dirname, "types"),
							"@": path.resolve(__dirname, "src"),
						},
						extensions: [".ts", ".tsx"],
					},
				},
			},
		},

		react: {
			version: "16.13.1", // Version used in WP 5.8
		},
	},
};
